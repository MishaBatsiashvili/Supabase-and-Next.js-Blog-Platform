import { Resolvers } from "@/__generated__/resolvers-types"
import { createClient } from "@/utils/supabase/server"
import moment from "moment"

export const updateCommentResolver: NonNullable<Resolvers['Mutation']>['updateComment'] = async (_, { input }) => {
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
}