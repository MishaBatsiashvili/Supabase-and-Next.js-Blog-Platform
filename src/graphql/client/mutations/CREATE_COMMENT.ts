import { gql } from "@/__generated__";

export const CREATE_COMMENT = gql(`
    mutation createComment($input: CreateCommentInput!) {
        createComment(input: $input){
            id
        }
    }
`)