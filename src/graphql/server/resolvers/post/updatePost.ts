import { Resolvers } from "@/__generated__/resolvers-types"
import { createSearchClient } from "@/utils/algolia/createSearchClient"
import { getS3ImageUrl } from "@/utils/helpers/getS3ImageUrl"
import { createClient } from "@/utils/supabase/server"

export const updatePostResolver: NonNullable<Resolvers['Mutation']>['updatePost'] = async (_, { input }) => {
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
}