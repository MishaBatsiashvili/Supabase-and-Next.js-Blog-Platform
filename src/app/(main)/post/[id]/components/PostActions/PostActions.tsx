'use client'

import React from 'react'
import DeleteAction from './DeleteAction'
import { GetPostQuery } from '@/__generated__/graphql'
import EditAction from './EditAction/EditAction'
import { useUser } from '@/contexts/UserContext/UserContext'

const PostActions: React.FC<{
  post: Exclude<GetPostQuery['post'], null | undefined>
}> = ({ post }) => {

  const { user } = useUser()
  if(!user || user?.id !== post.user_id){
    return <></>
  }

  return (
    <div className="mt-3 flex justify-center">
      <EditAction post={post} />
      <DeleteAction postId={post.id} />
    </div>
  )
}

export default PostActions
