import { gql } from "@/__generated__";

export const DELETE_POSTS = gql(`
    mutation deletePost($id: ID!) {
        deletePost(id: $id){
            status
            affectedRows
        }
    }
`)