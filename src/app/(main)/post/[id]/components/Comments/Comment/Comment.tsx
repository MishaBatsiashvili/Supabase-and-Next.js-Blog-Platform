'use client'
import React from 'react'
import moment from 'moment'

const Comment: React.FC<{
  data: any
}> = ({ data }) => {
  return (
    <div className="mt-1 w-full rounded border border-slate-400 p-4 disabled:bg-slate-200">
      <p className="text-sm">{data.comment}</p>
      <hr className="my-2 w-full border-t border-gray-400" />
      <div className="flex gap-4">
        <p className="mt-1 text-xs text-gray-400">
          {moment(data.created_at).format('LL')}
        </p>
        {/* <p className="mt-1 text-xs text-gray-400">By {data.profiles?.email}</p> */}
      </div>
    </div>
  )
}

export default Comment
