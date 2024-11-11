import { gql } from '@/__generated__'

export const GET_COMMENTS = gql(`
query GetComments($postId: ID!) {
    comments(postId: $postId) {
      id
      comment
      post_id
      user_id
      created_at
      updated_at
    }
  }
`)
