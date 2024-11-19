import { createClient } from "@/utils/supabase/server"
import type { Resolvers } from '@/__generated__/resolvers-types'

export const postsResolver: NonNullable<Resolvers['Query']>['posts'] = async (_, args) => {
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
}