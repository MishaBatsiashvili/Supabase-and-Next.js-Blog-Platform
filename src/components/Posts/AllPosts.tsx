"use client";

import React from "react";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import Post from "./Post.tsx/Post";
import { User } from "@supabase/supabase-js";
import { NormalizedCacheObject, useQuery } from "@apollo/client";

const AllPosts: React.FC<{
  user: User;
}> = ({ user }) => {
  const { data, error, refetch, loading } = useQuery(GET_POSTS);

  if (loading) {
    return (
      <>
        <div className="text-center mt-4 font-bold">Loading...</div>
      </>
    );
  }

  const posts = data?.posts ?? [];

  if (posts?.length === 0) {
    return <>No Posts</>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold mr-4 mt-[30px]">All blog posts</h3>
      </div>
      <div className="grid gap-6 grid-cols-1">
        {posts.map(post => (
          <div key={post.id} className="col-span-1">
            <Post post={post} user={user} variant="halfShort" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
