import { createClient } from '@/utils/supabase/server'
import { ApolloServer } from '@apollo/server'
import { loadFilesSync } from '@graphql-tools/load-files'
import type { Resolvers } from '@/__generated__/resolvers-types'
import axios from 'axios'
import moment from 'moment'
import { createSearchClient } from '@/utils/algolia/createSearchClient'
import { getS3ImageUrl } from '@/utils/helpers/getS3ImageUrl'

const typeDefs = loadFilesSync('src/graphql/schema/**/*.graphql')

const resolvers: Resolvers = {
  Query: {
    comments: async (_, args) => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', args.postId)
        .order('created_at', { ascending: false })
        .order('updated_at', { ascending: false })

      if (error) {
        return []
      }

      return data
    },
    // @ts-ignore
    posts: async (_, args) => {
      const supabase = createClient()

      const MAX_POSTS_PER_PAGE = 2
      const RANGE_START_INDEX = (args.page - 1) * MAX_POSTS_PER_PAGE
      const RANGE_END_INDEX = args.page * MAX_POSTS_PER_PAGE - 1
      const query = supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .order('updated_at', { ascending: false })
        .range(RANGE_START_INDEX, RANGE_END_INDEX)

      if (args.userId) {
        query.eq('user_id', args.userId)
      }

      const { data, error, count } = await query

      let pages = 0
      if (count && count > 0) {
        pages = Math.ceil(count / MAX_POSTS_PER_PAGE)
      }

      return {
        items: error ? [] : data,
        total: count ?? 0,
        pages: pages,
      }
    },
    post: async (_, args) => {
      const supabase = createClient()
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', args.id)
        .single()

      return data
    },
    s3uploadUrl: async (_, args) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()
      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const res = await axios.get<{ url: string }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/s3image-upload-url?objectKey=${args.objectKey}`
      )
      

      return res.data.url
    },
  },
  Mutation: {
    createComment: async (_, { input }) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()
      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const userId = resp.data.user.id
      const { data, error } = await supabase
        .from('comments')
        .insert({
          comment: input.comment,
          user_id: userId,
          post_id: input.postId,
        })
        .select()
        .single()

      if (error) {
        throw new Error('Problem inserting data')
      }

      return data
    },
    updateComment: async (_, { input }) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()
      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const { data, error } = await supabase
        .from('comments')
        .update({
          comment: input.comment,
          updated_at: moment().toISOString(),
        })
        .eq('id', input.id)
        .select()
        .single()

      if (error) {
        throw new Error('Problem inserting data')
      }

      return data
    },
    deleteComment: async (_, args) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()
      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const { data, error, status } = await supabase
        .from('comments')
        .delete()
        .eq('id', args.id)
        .select()

      if (error) {
        throw new Error(error.message)
      }

      return {
        status: status,
        affectedRows: data.length,
      }
    },
    createPost: async (_, { input }) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()

      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const userId = resp.data.user.id

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: input.title,
          content: input.content,
          user_id: userId,
          s3_image_object_key: input.s3_image_object_key,
        })
        .select('*, profiles(*)')
        .single()

      if (error) {
        throw new Error('Problem inserting data')
      }

      const searchClient = createSearchClient()
      const indexName = 'posts_index'
      const record = {
        objectID: data.id,
        id: data.id,
        title: data.title,
        content: data.content,
        author: data.profiles?.email,
        image_url: getS3ImageUrl(data.s3_image_object_key),
      }

      const { taskID } = await searchClient.saveObject({
        indexName,
        body: record,
      })

      await searchClient.waitForTask({
        indexName,
        taskID,
      })

      return data
    },
    updatePost: async (_, { input }) => {
      const supabase = createClient()
      const resp = await supabase.auth.getUser()

      if (!resp.data.user) {
        throw new Error('Not logged in')
      }

      const userId = resp.data.user.id
      const updateObject: {
        title: string
        content: string
        s3_image_object_key?: string
      } = {
        title: input.title,
        content: input.content,
      }

      if (input.s3_image_object_key) {
        updateObject.s3_image_object_key = input.s3_image_object_key
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updateObject)
        .eq('id', input.id)
        .eq('user_id', userId)
        .select('*, profiles(*)')
        .single()

      if (error) {
        throw new Error('Problem updating data')
      }

      const searchClient = createSearchClient()
      const indexName = 'posts_index'
      const record = {
        objectID: data.id,
        id: data.id,
        title: data.title,
        content: data.content,
        author: data.profiles?.email,
        image_url: getS3ImageUrl(data.s3_image_object_key),
      }

      const { taskID } = await searchClient.saveObject({
        indexName,
        body: record,
      })

      await searchClient.waitForTask({
        indexName,
        taskID,
      })

      return data
    },
    deletePost: async (_, args) => {
      const supabase = createClient()
      const { data, error, status } = await supabase
        .from('posts')
        .delete()
        .eq('id', args.id)
        .select()

      if (error) {
        throw new Error(error.message)
      }

      const searchClient = createSearchClient()
      const indexName = 'posts_index'

      await searchClient.deleteObject({ indexName, objectID: args.id })

      return {
        status: status,
        affectedRows: data.length,
      }
    },
  },
}

// server setup
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})
