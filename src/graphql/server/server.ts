import { createClient } from '@/utils/supabase/server'
import { ApolloServer } from '@apollo/server'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import type { Resolvers } from '@/__generated__/resolvers-types'
import axios from 'axios'
import moment from 'moment'

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
    posts: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .order('updated_at', { ascending: false })

      if (error) {
        return []
      }

      return data
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
        .select()
        .single()

      if (error) {
        throw new Error('Problem inserting data')
      }

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
        .select()
        .single()

      if (error) {
        throw new Error('Problem updating data')
      }

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
