import React, { useEffect } from 'react'
import FieldErrorItem from '../common/form/FieldError/FieldError'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useApolloClient, useMutation } from '@apollo/client'
import { CREATE_POST } from '@/graphql/client/mutations/CREATE_POST'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { toast } from 'react-toastify'
import { useS3Upload } from '@/utils/hooks/useS3Upload'
import { InputsType, schema } from './utils/validation'
import { motion, AnimatePresence } from 'framer-motion'
import * as Portal from '@radix-ui/react-portal'
import { useRouter } from 'next/navigation'

const AddNewPostModal: React.FC<{
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ modalIsOpen, setModalIsOpen }) => {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  })

  const { handleS3FileUpload, loading: s3Loading } = useS3Upload()
  const client = useApolloClient()
  const [createPost, { loading, called, reset: resetCreatePostMutation }] = useMutation(CREATE_POST, {
    onError: () => toast.error('Error creating post'),
    onCompleted: () => {
      toast.success('Post created')
      setModalIsOpen(false)
      try {
        client.cache.evict({
          id: 'ROOT_QUERY',
          fieldName: 'posts',
        })
        console.log('GET_POSTS cache cleared successfully.')
      } catch (error) {
        console.error('Error clearing GET_POSTS cache:', error)
      }

      router.push('/?page=1')
      resetCreatePostMutation()
    },
  })

  const isLoading = loading || s3Loading

  useEffect(() => {
    console.log(isLoading, loading, s3Loading)
    if (isLoading && !called) {
      toast.info('Uploading Post')
    }
  }, [isLoading, called])

  useEffect(() => {
    if (modalIsOpen) {
      reset()
    }
  }, [modalIsOpen, reset])

  const submit = async ({ title, content, image }: InputsType) => {
    const objectKey = await handleS3FileUpload(image[0])
    if (!objectKey) {
      toast.error('Problem uploading image')
      return
    }
    await createPost({
      variables: { input: { title, content, s3_image_object_key: objectKey } },
    })
  }

  return (
    <div>
      <Portal.Root>
        <AnimatePresence mode="wait">
          {modalIsOpen && (
            <motion.div
              className="fixed left-0 top-0 z-[999] h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0 }}
            >
              <div
                className="fixed block h-full w-full bg-black opacity-60"
                onClick={() => {
                  if (!isLoading) {
                    setModalIsOpen(false)
                  }
                }}
              />

              <div className="fixed left-1/2 top-1/2 m-3 block w-1/2 max-w-[500px] translate-x-[-50%] translate-y-[-50%] text-black">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
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
                          {isLoading ? `Posting...` : `Post`}
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
    </div>
  )
}

export default AddNewPostModal
