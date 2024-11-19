import type { Resolvers } from '@/__generated__/resolvers-types'
import { createClient } from '@/utils/supabase/server'
export const commentsResolver: NonNullable<Resolvers['Query']>['comments'] = async (_, args) => {
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
}