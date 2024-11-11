import createApolloClient from '@/graphql/client/createApolloClient'
import { GET_POST } from '@/graphql/client/queries/GET_POST'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Comments from './components/Comments/Comments'
import AddComment from './components/Comments/AddComment/AddComment'
import PostView from './components/PostView/PostView'
import AnimatePage from '@/components/common/animation/AnimatePage/AnimatePage'

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user

  const client = createApolloClient()
  const { data, error } = await client.query({
    query: GET_POST,
    variables: { id: params.id },
  })
  

  if (!user || !data.post) {
    return <></>
  }

  return (
    <AnimatePage>
      <main className="mx-auto max-w-[600px]">
        <Link href={'/'}>
          <button className="rounded-md bg-gray-600 px-3 py-2 text-sm text-white">
            Go to All Posts
          </button>
        </Link>

        <PostView post={data.post} />

        <div className="mx-auto max-w-[400px]">
          <AddComment postId={data.post.id} />
          <div className="mt-5">
            <Comments postId={data.post.id} />
          </div>
        </div>
      </main>
    </AnimatePage>
  )
}
