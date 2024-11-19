'use client'

import React from 'react'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import Post from './Post.tsx/Post'
import { User } from '@supabase/supabase-js'
import { NormalizedCacheObject, useQuery } from '@apollo/client'

const RecentPosts: React.FC<{
  user: User
}> = ({ user }) => {
  const { data, error, refetch, loading } = useQuery(GET_POSTS)

  if (loading) {
    return (
      <>
        <div className="mt-4 text-center font-bold">Loading...</div>
      </>
    )
  }

  const posts = data?.posts.items ?? []

  if (posts?.length === 0) {
    return <>No Posts</>
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <h3 className="mr-4 mt-[30px] text-xl font-bold">Recent blog posts</h3>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 lg:col-span-2">
          <Post key={posts[0].id} post={posts[0]} variant="half" />
        </div>
        <div className="col-span-4 grid gap-6 lg:col-span-2">
          <Post
            key={posts[1].id}
            post={posts[1]}
            variant="halfShort"
            titleCharSize={20}
          />
          <Post
            key={posts[2].id}
            post={posts[2]}
            variant="halfShort"
            titleCharSize={20}
          />
        </div>
        <div className="col-span-4">
          <Post key={posts[3].id} post={posts[3]} variant="halfShort" />
        </div>
      </div>
    </div>
  )
}

export default RecentPosts
