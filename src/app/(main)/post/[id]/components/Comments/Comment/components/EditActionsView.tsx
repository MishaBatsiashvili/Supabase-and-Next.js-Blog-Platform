import FieldErrorItem from '@/components/common/form/FieldError/FieldError'
import { UPDATE_COMMENT } from '@/graphql/client/mutations/UPDATE_COMMENT'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { CommentProps } from '../Comment'

const schema = z.object({
  comment: z.string().min(1),
})

export type InputsType = z.infer<typeof schema>

const EditActionsView: React.FC<{
  isEditMode: boolean
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  data: CommentProps['data']
}> = ({ isEditMode, setIsEditMode, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  })

  const [updateComment, { loading: updateCommentIsloading }] = useMutation(
    UPDATE_COMMENT,
    {
      onError: () => toast.error('Error updating comment'),
      onCompleted: () => toast.success('Comment updated'),
    }
  )

  useEffect(() => {
    if (isEditMode) {
      setValue('comment', data.comment || '')
    } else {
      reset()
    }
  }, [isEditMode])

  const submit = async ({ comment }: InputsType) => {
    try {
      await updateComment({
        variables: {
          input: {
            id: data.id,
            comment,
          },
        },
      })
      setIsEditMode(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldErrorItem className="mt-1 text-xs" error={errors['comment']} />
      <input
        {...register('comment')}
        type="text"
        className="mt-1 block w-full rounded border border-slate-400 text-sm disabled:bg-slate-200"
        disabled={updateCommentIsloading}
      />
      <div className="flex">
        <button
          type="submit"
          className="mr-1 mt-3 rounded bg-black px-3 py-1 text-xs text-white"
          disabled={updateCommentIsloading}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 rounded bg-gray-500 px-3 py-1 text-xs text-white"
          onClick={() => setIsEditMode(false)}
          disabled={updateCommentIsloading}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditActionsView
