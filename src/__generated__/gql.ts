/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation createComment($input: CreateCommentInput!) {\n        createComment(input: $input){\n            id\n        }\n    }\n": types.CreateCommentDocument,
    "\n    mutation createPost($input: CreatePostInput!) {\n        createPost(input: $input){\n            id\n        }\n    }\n": types.CreatePostDocument,
    "\n    mutation deleteComment($id: ID!) {\n        deleteComment(id: $id){\n            status\n            affectedRows\n        }\n    }\n": types.DeleteCommentDocument,
    "\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id){\n            status\n            affectedRows\n        }\n    }\n": types.DeletePostDocument,
    "\n    mutation updateComment($input: UpdateCommentInput!) {\n        updateComment(input: $input){\n            id\n        }\n    }\n": types.UpdateCommentDocument,
    "\n    mutation updatePost($input: UpdatePostInput!) {\n        updatePost(input: $input){\n            id\n        }\n    }\n": types.UpdatePostDocument,
    "\nquery GetComments($postId: ID!) {\n    comments(postId: $postId) {\n      id\n      comment\n      post_id\n      user_id\n      created_at\n      updated_at\n    }\n  }\n": types.GetCommentsDocument,
    "\n query getPost($id: ID!) {\n    post(id: $id) {\n        id\n        title,\n        content,\n        user_id,\n        s3_image_object_key\n    }\n }\n": types.GetPostDocument,
    "\n query getPosts($page: Int!, $userId: ID) {\n    posts(page: $page, userId: $userId) {\n        items {\n            id\n            title,\n            content,\n            user_id,\n            s3_image_object_key,\n            created_at,\n            updated_at\n        }\n        total\n        pages\n    }\n }\n": types.GetPostsDocument,
    "\n query getS3uploadUrl($objectKey: String!) {\n  s3uploadUrl(objectKey: $objectKey)\n }\n": types.GetS3uploadUrlDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createComment($input: CreateCommentInput!) {\n        createComment(input: $input){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation createComment($input: CreateCommentInput!) {\n        createComment(input: $input){\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createPost($input: CreatePostInput!) {\n        createPost(input: $input){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation createPost($input: CreatePostInput!) {\n        createPost(input: $input){\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation deleteComment($id: ID!) {\n        deleteComment(id: $id){\n            status\n            affectedRows\n        }\n    }\n"): (typeof documents)["\n    mutation deleteComment($id: ID!) {\n        deleteComment(id: $id){\n            status\n            affectedRows\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id){\n            status\n            affectedRows\n        }\n    }\n"): (typeof documents)["\n    mutation deletePost($id: ID!) {\n        deletePost(id: $id){\n            status\n            affectedRows\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation updateComment($input: UpdateCommentInput!) {\n        updateComment(input: $input){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation updateComment($input: UpdateCommentInput!) {\n        updateComment(input: $input){\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation updatePost($input: UpdatePostInput!) {\n        updatePost(input: $input){\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation updatePost($input: UpdatePostInput!) {\n        updatePost(input: $input){\n            id\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetComments($postId: ID!) {\n    comments(postId: $postId) {\n      id\n      comment\n      post_id\n      user_id\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\nquery GetComments($postId: ID!) {\n    comments(postId: $postId) {\n      id\n      comment\n      post_id\n      user_id\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getPost($id: ID!) {\n    post(id: $id) {\n        id\n        title,\n        content,\n        user_id,\n        s3_image_object_key\n    }\n }\n"): (typeof documents)["\n query getPost($id: ID!) {\n    post(id: $id) {\n        id\n        title,\n        content,\n        user_id,\n        s3_image_object_key\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getPosts($page: Int!, $userId: ID) {\n    posts(page: $page, userId: $userId) {\n        items {\n            id\n            title,\n            content,\n            user_id,\n            s3_image_object_key,\n            created_at,\n            updated_at\n        }\n        total\n        pages\n    }\n }\n"): (typeof documents)["\n query getPosts($page: Int!, $userId: ID) {\n    posts(page: $page, userId: $userId) {\n        items {\n            id\n            title,\n            content,\n            user_id,\n            s3_image_object_key,\n            created_at,\n            updated_at\n        }\n        total\n        pages\n    }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getS3uploadUrl($objectKey: String!) {\n  s3uploadUrl(objectKey: $objectKey)\n }\n"): (typeof documents)["\n query getS3uploadUrl($objectKey: String!) {\n  s3uploadUrl(objectKey: $objectKey)\n }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;