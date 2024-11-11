import { gql } from "@/__generated__";

export const GET_POST = gql(`
 query getPost($id: ID!) {
    post(id: $id) {
        id
        title,
        content,
        user_id,
        s3_image_object_key
    }
 }
`)