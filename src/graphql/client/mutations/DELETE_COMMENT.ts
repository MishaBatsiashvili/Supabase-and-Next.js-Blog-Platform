import { gql } from "@/__generated__";

export const DELETE_COMMENT = gql(`
    mutation deleteComment($id: ID!) {
        deleteComment(id: $id){
            status
            affectedRows
        }
    }
`)