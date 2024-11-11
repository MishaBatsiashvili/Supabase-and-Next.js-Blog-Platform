import React, { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import FieldErrorItem from '../common/form/FieldError/FieldError'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '@/graphql/client/mutations/CREATE_POST'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { toast } from 'react-toastify'
import { useS3Upload } from '@/utils/hooks/useS3Upload'
import { InputsType, schema } from './utils/validation'

const AddNewPostModal: React.FC<{
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ modalIsOpen, setModalIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  })

  const { handleS3FileUpload, fileIsUploading } = useS3Upload()

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onError: () => toast.error('Error creating post'),
    onCompleted: () => {
      toast.success('Post created')
      setModalIsOpen(false)
    },
  })

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

  const isLoading = loading || fileIsUploading

  return (
    <Dialog.Root open={modalIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed block h-full w-full bg-black opacity-60"
          onClick={() => {
            if (!isLoading) {
              setModalIsOpen(false)
            }
          }}
        />
        <Dialog.Content className="fixed left-1/2 top-1/2 m-3 block w-1/2 max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 text-black">
          <Dialog.Title className="text-center text-xl font-bold">
            Create New Post
          </Dialog.Title>
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <label className="block text-sm font-semibold" htmlFor="title">
                  Title
                </label>
                <FieldErrorItem className="mt-1" error={errors['title']} />
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
                <FieldErrorItem className="mt-1" error={errors['content']} />
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
                <FieldErrorItem className="mt-1" error={errors['image']} />
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddNewPostModal
