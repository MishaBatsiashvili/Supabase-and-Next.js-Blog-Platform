import { Resolvers } from "@/__generated__/resolvers-types"
import { createClient } from "@/utils/supabase/server"

export const deleteCommentResolver: NonNullable<Resolvers['Mutation']>['deleteComment'] = async (_, args) => {
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
}