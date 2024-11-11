import { gql } from '@/__generated__'

export const GET_POSTS = gql(`
 query getPosts($page: Int!) {
    posts(page: $page) {
        items {
            id
            title,
            content,
            user_id,
            s3_image_object_key,
            created_at,
            updated_at
        }
        total
        pages
    }
 }
`)
