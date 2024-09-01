// import Image from "next/image";

import Navbar from "@/components/Layout/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import PostsClient from "@/components/Posts/PostsClient";
import { createClient } from "@/utils/supabase/server";



export default async function Home() {

  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user

  // const posts = 

  if(!user){
    return <></>
  }

  return (
    <main>
      {/* <User user={user} /> */}
      <h1 className="text-center text-4xl font-bold">All Posts</h1>
      <hr className="mt-5"/>
      <Posts />
      {/* <PostsClient /> */}
    </main>
  );
}
