import { Resolvers } from "@/__generated__/resolvers-types"
import { createClient } from "@/utils/supabase/server"

export const createCommentResolver: NonNullable<Resolvers['Mutation']>['createComment'] = async (_, { input }) => {
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
}