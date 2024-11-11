// import Image from "next/image";

import AddNewPost from "@/components/AddNewPost/AddNewPost";
import AllPosts from "@/components/Posts/AllPosts";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const resp = await supabase.auth.getUser();
  const user = resp.data.user;

  if (!user) {
    return <></>;
  }

  return (
    <main>
      <AddNewPost />
      
      <div className="mt-6">
        <AllPosts
          user={user}
        />
      </div>

    </main>
  );
}
