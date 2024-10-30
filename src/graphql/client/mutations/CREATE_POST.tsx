import { gql } from "@/__generated__";

export const CREATE_POST = gql(`
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input){
            id
        }
    }
`)