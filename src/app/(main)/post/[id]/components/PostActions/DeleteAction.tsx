import React, { useState } from 'react'
import * as Portal from '@radix-ui/react-portal'
import { DELETE_POSTS } from '@/graphql/client/mutations/DELETE_POST'
import { useMutation } from '@apollo/client'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const DeleteAction: React.FC<{
  postId: string
}> = ({ postId }) => {
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false)
  const router = useRouter()
  const [deletePost, { loading: deletePostIsLoading }] = useMutation(
    DELETE_POSTS,
    {
      refetchQueries: [{ query: GET_POSTS }],
      onCompleted: () => {
        toast.success('Post deleted')
        router.push('/')
      },
      onError: () => {
        toast.error('Problem deleting post')
      },
    }
  )

  return (
    <>
      <button
        className="px-2 py-2 text-sm text-red-600"
        onClick={() => {
          setDeleteModalIsVisible(true)
        }}
      >
        Delete Post
      </button>
      <Portal.Root>
        <AnimatePresence mode="wait">
          {deleteModalIsVisible && (
            <motion.div
              className="fixed left-0 top-0 z-[999] h-full w-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0, transition: { delay: 0.3 } }}
            >
              <div
                className="fixed block h-full w-full bg-black opacity-60"
                onClick={() => setDeleteModalIsVisible(false)}
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
                  <h1 className="text-center text-lg font-bold">
                    Are you sure?
                  </h1>
                  <hr className="border-top my-3 w-full border-gray-400" />
                  <div className="flex gap-2">
                    <button
                      disabled={deletePostIsLoading}
                      className="flex-grow rounded-md bg-red-600 py-2 text-sm text-white"
                      onClick={() => {
                        deletePost({
                          variables: {
                            id: postId,
                          },
                        })
                      }}
                    >
                      Delete
                    </button>
                    <button
                      disabled={deletePostIsLoading}
                      className="flex-grow rounded-md bg-gray-600 py-2 text-sm text-white"
                      onClick={() => setDeleteModalIsVisible(false)}
                    >
                      No
                    </button>
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

export default DeleteAction
