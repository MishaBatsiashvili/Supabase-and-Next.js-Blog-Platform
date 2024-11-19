import { Resolvers } from "@/__generated__/resolvers-types"
import { createSearchClient } from "@/utils/algolia/createSearchClient"
import { getS3ImageUrl } from "@/utils/helpers/getS3ImageUrl"
import { createClient } from "@/utils/supabase/server"
import axios from "axios"

export const createPostResolver: NonNullable<Resolvers['Mutation']>['createPost'] = async (_, { input }) => {
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

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analytics/posts-crud`,
    {
      resource_id: data.id,
      crud_action: 'CREATE',
      data: {
        title: data.title,
        content: data.content
      },
      resource_type: 'POST',
      timestamp: new Date().getTime(),
      user_id: userId
    }
  )

  return data
}