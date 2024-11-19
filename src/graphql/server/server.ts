import { ApolloServer } from '@apollo/server'
import { loadFilesSync } from '@graphql-tools/load-files'
import type { Resolvers } from '@/__generated__/resolvers-types'
import { commentsResolver } from './resolvers/comment/comments'
import { postsResolver } from './resolvers/post/posts'
import { postResolver } from './resolvers/post/post'
import { s3uploadUrlResolver } from './resolvers/s3/s3uploadUrl'
import { createCommentResolver } from './resolvers/comment/createComment'
import { updateCommentResolver } from './resolvers/comment/updateComment'
import { deleteCommentResolver } from './resolvers/comment/deleteComment'
import { createPostResolver } from './resolvers/post/createPost'
import { updatePostResolver } from './resolvers/post/updatePost'
import { deletePostResolver } from './resolvers/post/deletePost'

const typeDefs = loadFilesSync('**/schema.graphql')

const resolvers: Resolvers = {
  Query: {
    comments: commentsResolver,
    posts: postsResolver,
    post: postResolver,
    s3uploadUrl: s3uploadUrlResolver,
  },
  Mutation: {
    createComment: createCommentResolver,
    updateComment: updateCommentResolver,
    deleteComment: deleteCommentResolver,
    createPost: createPostResolver,
    updatePost: updatePostResolver,
    deletePost: deletePostResolver,
  },
}

console.log('resolvers', resolvers)
console.log('typeDefs', typeDefs)

// server setup
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

// console.log('apolloServer', apolloServer)
