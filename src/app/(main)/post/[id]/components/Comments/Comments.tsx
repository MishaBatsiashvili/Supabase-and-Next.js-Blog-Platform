'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Comment from './Comment/Comment'
import { useRealtimeComments } from './utils/useRealtimeComments'

const Comments: React.FC<{
  postId: string
}> = ({ postId }) => {

  const {commentsData, commentsError, commentsLoading} = useRealtimeComments(postId)

  if(commentsLoading){
    return <div>Comments is loading...</div>
  }

  if(commentsError || !commentsData){
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <h3>Comments</h3>
      <div className="mt-2">
        {commentsData.comments?.map((el) => {
          if(!el){
            return <></>
          }
          return <Comment key={el.id} data={el} />
        })}
      </div>
    </div>
  )
}

export default Comments
