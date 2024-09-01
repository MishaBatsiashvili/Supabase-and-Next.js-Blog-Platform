import React from "react";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import createApolloClient from "@/graphql/client/createApolloClient";
import Post from "./Post.tsx/Post";

const Posts: React.FC<{}> = async ({}) => {
  const client = createApolloClient();

  const { data, error } = await client.query({ query: GET_POSTS });

  if (error || !data) {
    return <>Error fetching data</>;
  }


  return (
    <>
      {data?.posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
