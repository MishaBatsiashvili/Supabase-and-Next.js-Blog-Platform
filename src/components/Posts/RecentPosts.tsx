"use client";

import React from "react";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import Post from "./Post.tsx/Post";
import { User } from "@supabase/supabase-js";
import { NormalizedCacheObject, useQuery } from "@apollo/client";

const RecentPosts: React.FC<{
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
        <h3 className="text-xl font-bold mr-4 mt-[30px]">Recent blog posts</h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="lg:col-span-2 col-span-4">
          <Post key={posts[0].id} post={posts[0]} user={user} variant="half" />
        </div>
        <div className="lg:col-span-2 col-span-4 gap-6 grid">
          <Post
            key={posts[1].id}
            post={posts[1]}
            user={user}
            variant="halfShort"
            titleCharSize={20}
          />
          <Post
            key={posts[2].id}
            post={posts[2]}
            user={user}
            variant="halfShort"
            titleCharSize={20}
          />
        </div>
        <div className="col-span-4">
          <Post
            key={posts[3].id}
            post={posts[3]}
            user={user}
            variant="halfShort"
          />
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     {data?.posts?.map((post) => (
  //       <Post key={post.id} post={post} user={user} />
  //     ))}
  //   </>
  // );
};

export default RecentPosts;
