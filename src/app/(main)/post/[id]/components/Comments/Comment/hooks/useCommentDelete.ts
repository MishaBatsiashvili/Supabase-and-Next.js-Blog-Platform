import { DELETE_COMMENT } from '@/graphql/client/mutations/DELETE_COMMENT'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { CommentProps } from '../Comment'

export const useCommentDelete = (data: CommentProps['data']) => {
  const [deleteComment, { loading: deleteCommentIsLoading }] = useMutation(
    DELETE_COMMENT,
    {
      onError: () => toast.error('Error deleting comment'),
      onCompleted: () => toast.success('Comment deleted'),
    }
  )

  const handleDeleteComment = async () => {
    await deleteComment({
      variables: { id: data.id },
    })
  }

  return {
    handleDeleteComment,
    deleteCommentIsLoading
  }
}
