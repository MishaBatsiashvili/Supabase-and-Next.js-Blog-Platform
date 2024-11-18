import { createClient } from '@/utils/supabase/server'
import Posts from './components/Posts/Posts'
import Link from 'next/link'
import createApolloClient from '@/graphql/client/createApolloClient'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { Pagination } from '@nextui-org/pagination'
import { headers } from 'next/headers'

export default async function Page() {
  return (
    <main>
      <Link href={'/'}>
        <button className="rounded-md bg-black px-4 py-2 text-sm font-bold text-white">
          {'< Go back'}
        </button>
      </Link>
      <h1 className="mt-6 text-xl font-bold">Your Posts</h1>

      <div className="mt-6">
        <Posts />
      </div>
    </main>
  )
}
