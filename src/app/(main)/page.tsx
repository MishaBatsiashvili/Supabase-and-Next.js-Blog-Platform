// import Image from "next/image";

import AddNewPost from "@/components/AddNewPost/AddNewPost";
import Posts from "@/components/Posts/Posts";
import { createClient } from "@/utils/supabase/server";



export default async function Page() {

  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user


  if(!user){
    return <></>
  }

  return (
    <main>
      {/* <User user={user} /> */}
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold mr-4 mt-[30px]">Recent blog posts</h3>
        <AddNewPost/>
      </div>
      <Posts
        user={user}
      />
    </main>
  );
}
