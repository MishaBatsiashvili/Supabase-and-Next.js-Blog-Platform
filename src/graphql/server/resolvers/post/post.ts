import { Resolvers } from "@/__generated__/resolvers-types"
import { createClient } from "@/utils/supabase/server"

export const postResolver: NonNullable<Resolvers['Query']>['post'] = async (_, args) => {
  const supabase = createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('id', args.id)
    .single()

  return data
}