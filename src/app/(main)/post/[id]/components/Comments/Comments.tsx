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
      <h3 className='font-bold'>Comments</h3>
      <div className="pt-2 pb-12">
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
