import { gql } from "@/__generated__";

export const UPDATE_COMMENT = gql(`
    mutation updateComment($input: UpdateCommentInput!) {
        updateComment(input: $input){
            id
        }
    }
`)