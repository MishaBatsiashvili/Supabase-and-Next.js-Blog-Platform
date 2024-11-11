import React from 'react'
import moment from 'moment'
import { CommentProps } from '../Comment'
import { useUser } from '@/contexts/UserContext/UserContext'

type DefaultCommentViewProps = {
  data: CommentProps['data']
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  handleDeleteComment: () => Promise<void>
  deleteCommentIsLoading: boolean
  showActionBtns: boolean
}

const DefaultCommentView: React.FC<DefaultCommentViewProps> = ({
  data,
  setIsEditMode,
  handleDeleteComment,
  deleteCommentIsLoading,
  showActionBtns = false,
}) => {
  return (
    <div>
      <p className="text-sm">{data.comment}</p>
      <hr className="my-2 w-full border-t border-gray-400" />
      <div className="flex justify-between">
        <p className="mt-1 text-xs text-gray-400">
          {moment(data?.updated_at ?? data.created_at).format(
            'MMMM Do YYYY, h:mm a'
          )}
        </p>
        {showActionBtns ? (
          <div>
            <button
              className="mr-1 rounded px-1 py-1 text-xs text-gray-600"
              onClick={() => setIsEditMode(true)}
              disabled={deleteCommentIsLoading}
            >
              Edit
            </button>
            <button
              className="rounded px-1 py-1 text-xs text-red-700"
              onClick={handleDeleteComment}
              disabled={deleteCommentIsLoading}
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default DefaultCommentView
