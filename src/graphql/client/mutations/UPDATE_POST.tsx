import { gql } from "@/__generated__";

export const UPDATE_POST = gql(`
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input){
            id
        }
    }
`)