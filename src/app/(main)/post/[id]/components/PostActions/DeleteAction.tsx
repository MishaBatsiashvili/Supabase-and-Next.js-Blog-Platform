import React, { useState } from 'react'
import * as Portal from '@radix-ui/react-portal'
import { DELETE_POSTS } from '@/graphql/client/mutations/DELETE_POST'
import { useMutation } from '@apollo/client'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

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
      {deleteModalIsVisible && (
        <Portal.Root>
          <div className='fixed top-0 left-0 z-[999]'>
            <div
              className="fixed block h-full w-full bg-black opacity-60"
              onClick={() => setDeleteModalIsVisible(false)}
            />
            <div className="fixed left-1/2 top-1/2 m-3 block w-1/2 max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 text-black">
              <h1 className="text-center text-lg font-bold">Are you sure?</h1>
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
            </div>
          </div>
        </Portal.Root>
      )}
    </>
  )
}

export default DeleteAction
