import createApolloClient from '@/graphql/client/createApolloClient'
import { GET_POST } from '@/graphql/client/queries/GET_POST'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Comments from './components/Comments/Comments'
import AddComment from './components/Comments/AddComment/AddComment'
import PostView from './components/PostView/PostView'
import { headers } from 'next/headers'

export default async function Page({ params }: { params: { id: string } }) {
  const client = createApolloClient()
  const { data } = await client.query({
    query: GET_POST,
    variables: { id: params.id },
  })

  if (!data.post) {
    return <></>
  }

  return (
    <main>
      <div className="mx-auto max-w-[600px]">
          <PostView post={data.post} />

          <div className="mx-auto max-w-[400px]">
            <AddComment postId={data.post.id} />
            <div className="mt-5">
              <Comments postId={data.post.id} />
            </div>
          </div>
      </div>
    </main>
  )
}

export const dynamic = "force-dynamic";
