'use client'

import React from 'react'
import DeleteAction from './DeleteAction'
import { GetPostQuery } from '@/__generated__/graphql'
import EditAction from './EditAction/EditAction'

const PostActions: React.FC<{
  post: Exclude<GetPostQuery['post'], null | undefined>
}> = ({ post }) => {

  return (
    <div className="mt-3 flex justify-center">
      <EditAction post={post} />
      <DeleteAction postId={post.id} />
    </div>
  )
}

export default PostActions
