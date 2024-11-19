import { Resolvers } from "@/__generated__/resolvers-types"
import { createSearchClient } from "@/utils/algolia/createSearchClient"
import { createClient } from "@/utils/supabase/server"

export const deletePostResolver: NonNullable<Resolvers['Mutation']>['deletePost'] = async (_, args) => {
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
}