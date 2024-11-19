import { useS3Upload } from '@/utils/hooks/useS3Upload'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputsType, schema } from './utils/validation'
import { useMutation } from '@apollo/client'
import { UPDATE_POST } from '@/graphql/client/mutations/UPDATE_POST'
import { toast } from 'react-toastify'
import * as Portal from '@radix-ui/react-portal'
import FieldErrorItem from '@/components/common/form/FieldError/FieldError'
import { GetPostQuery } from '@/__generated__/graphql'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const EditAction: React.FC<{
  post: Exclude<GetPostQuery['post'], null | undefined>
}> = ({ post }) => {
  const router = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post!.title,
      content: post.content,
    },
  })

  const { handleS3FileUpload, loading: fileIsUploading } = useS3Upload()

  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    onError: () => toast.error('Error updating post'),
    onCompleted: () => {
      toast.success('Post updated')
      setModalIsOpen(false)
      router.refresh()
    },
  })

  useEffect(() => {
    if (modalIsOpen) {
      reset()
    }
  }, [modalIsOpen, reset])

  const submit = async ({ title, content, image }: InputsType) => {
    let objectKey: string | undefined = undefined
    if (image.length > 0) {
      objectKey = await handleS3FileUpload(image[0])
      if (!objectKey) {
        toast.error('Problem uploading image')
        return
      }
    }

    await updatePost({
      variables: {
        input: {
          id: post!.id,
          title,
          content,
          s3_image_object_key: objectKey,
        },
      },
    })
  }

  const isLoading = loading || fileIsUploading

  if (!post) {
    return <></>
  }

  return (
    <>
      <button
        className="px-2 text-sm text-gray-600"
        onClick={() => setModalIsOpen(true)}
      >
        Edit
      </button>
      <Portal.Root>
        <AnimatePresence mode="wait">
          {modalIsOpen && (
            <motion.div
              className="fixed left-0 top-0 z-[999] h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.3 } }}
            >
              <div
                className="fixed block h-full w-full bg-black opacity-60"
                onClick={() => {
                  if (!isLoading) {
                    setModalIsOpen(false)
                  }
                }}
              />
              <div className="fixed left-1/2 top-1/2 block w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] px-3 text-black">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="rounded-md bg-white p-6"
                >
                  <h1 className="text-center text-xl font-bold">
                    Create New Post
                  </h1>
                  <div>
                    <form onSubmit={handleSubmit(submit)}>
                      <div>
                        <label
                          className="block text-sm font-semibold"
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <FieldErrorItem
                          className="mt-1"
                          error={errors['title']}
                        />
                        <input
                          {...register('title')}
                          disabled={isLoading}
                          id="title"
                          className="mt-1 block w-full rounded border border-slate-400 disabled:bg-slate-200"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          className="block text-sm font-semibold"
                          htmlFor="content"
                        >
                          Content
                        </label>
                        <FieldErrorItem
                          className="mt-1"
                          error={errors['content']}
                        />
                        <textarea
                          {...register('content')}
                          disabled={isLoading}
                          id="content"
                          className="mt-1 block w-full rounded border border-slate-400 disabled:bg-slate-200"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          className="block text-sm font-semibold"
                          htmlFor="content"
                        >
                          Image
                        </label>
                        <FieldErrorItem
                          className="mt-1"
                          error={errors['image']}
                        />
                        <input
                          {...register('image')}
                          type="file"
                          disabled={isLoading}
                          className="mt-1 block w-full rounded border border-slate-400 disabled:bg-slate-200"
                        />
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="w-full rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-80"
                        >
                          {loading ? `Creating...` : `Create`}
                        </button>
                        <button
                          disabled={isLoading}
                          type="button"
                          className="w-full rounded-md bg-slate-500 px-4 py-2 text-sm text-white disabled:opacity-80"
                          onClick={() => setModalIsOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal.Root>
    </>
  )
}

export default EditAction
