import createApolloClient from "@/graphql/client/createApolloClient";
import { GET_POST } from "@/graphql/client/queries/GET_POST";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Comments from "./components/Comments/Comments";
import AddComment from "./components/Comments/AddComment/AddComment";



export default async function Page({ params }: { params: { id: string } }) {

  const supabase = createClient()
  const resp = await supabase.auth.getUser()
  const user = resp.data.user

  const client = createApolloClient()
  const { data, error } = await client.query({
    query: GET_POST,
    variables: { id: params.id }
  })
  console.log(data)

  if(!user || !data.post){
    return <></>
  }

  return (
    <main>
      <Link href={'/'}>Go to All Posts</Link>
      <h1 className="text-4xl font-bold text-center">{data.post?.title}</h1>
      <p className="mt-8">{data.post?.content}</p>
      
      <div className="mx-auto max-w-[400px]">
        <AddComment/>
        <div className="mt-5">
          <Comments postId={data.post?.id} />
        </div>
      </div>
    </main>
  );
}
