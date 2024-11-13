import AddNewPost from '@/components/AddNewPost/AddNewPost'
import AllPosts from '@/components/Posts/AllPosts'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user

  return (
    <main>
      {user ? <AddNewPost /> : <></>}
      <div className="mt-6">
        <AllPosts />
      </div>
    </main>
  )
}
