'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useUser } from '@/contexts/UserContext/UserContext'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FieldErrorItem from '@/components/common/form/FieldError/FieldError'
import { UPDATE_COMMENT } from '@/graphql/client/mutations/UPDATE_COMMENT'
import { DELETE_COMMENT } from '@/graphql/client/mutations/DELETE_COMMENT'
import EditActionsView from './components/EditActionsView'
import DefaultCommentView from './components/DefaultComponentView'
import { useCommentDelete } from './hooks/useCommentDelete'

const schema = z.object({
  comment: z.string().min(1),
})

export type InputsType = z.infer<typeof schema>

export type CommentProps = {
  data: {
    __typename?: 'Comment'
    id: string
    comment?: string | null
    post_id: string
    user_id: string
    created_at?: string | null
    updated_at?: string | null
  }
}

const Comment: React.FC<CommentProps> = ({ data }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const { user } = useUser()
  const { handleDeleteComment, deleteCommentIsLoading } = useCommentDelete(data)

  if (!data.comment) {
    return null
  }

  return (
    <div className="mt-2 w-full rounded border border-slate-400 p-4 disabled:bg-slate-200">
      {isEditMode ? (
        <EditActionsView
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          data={data}
        />
      ) : (
        <DefaultCommentView
          data={data}
          setIsEditMode={setIsEditMode}
          handleDeleteComment={handleDeleteComment}
          deleteCommentIsLoading={deleteCommentIsLoading}
          showActionBtns={!!user}
        />
      )}
    </div>
  )
}

export default Comment
