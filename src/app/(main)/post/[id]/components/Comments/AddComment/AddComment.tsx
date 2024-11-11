'use client'

import FieldErrorItem from '@/components/common/form/FieldError/FieldError'
import { CREATE_COMMENT } from '@/graphql/client/mutations/CREATE_COMMENT'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

const schema = z.object({
  comment: z.string().min(1),
})

type InputsType = z.infer<typeof schema>

const AddComment: React.FC<{
  postId: string
}> = ({ postId }) => {
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    onError: () => toast.error('Error creating post'),
    onCompleted: () => {
      toast.success('Comment created')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
    },
  })

  const submit = async ({ comment }: InputsType) => {
    try {
      await createComment({
        variables: {
          input: {
            comment,
            postId,
          },
        },
      })

      reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldErrorItem className="mt-1 text-xs" error={errors['comment']} />
      <textarea
        {...register('comment')}
        className="mt-1 w-full rounded border border-slate-400 p-4 text-sm disabled:bg-slate-200"
        placeholder="Write comment"
      />
      <button className="w-full rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-80">
        Comment
      </button>
    </form>
  )
}

export default AddComment
