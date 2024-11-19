import AddNewPost from '@/components/AddNewPost/AddNewPost'
import AllPosts from '@/components/Posts/AllPosts'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Page() {
  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user

  return (
    <main>
      <div className="flex gap-1">
        {user ? (
          <>
            <AddNewPost />
            <Link href={'/user/posts'}>
              <button className="rounded-md bg-black px-4 py-2 text-sm font-bold text-white">
                Your Posts
              </button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-6">
        <AllPosts />
      </div>
    </main>
  )
}

export const dynamic = "force-dynamic";
