import { gql } from "@/__generated__";

export const GET_POSTS = gql(`
 query getPosts {
    posts {
        id
        title,
        content,
        user_id,
        s3_image_object_key
    }
 }
`)