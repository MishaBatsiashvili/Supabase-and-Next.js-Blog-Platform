import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  post_id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['ID']['output'];
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  s3_image_object_key: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  affectedRows?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  affectedRows?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  deleteComment?: Maybe<DeleteCommentResponse>;
  deletePost?: Maybe<DeletePostResponse>;
  updateComment: Comment;
  updatePost: Post;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  s3_image_object_key: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['ID']['output'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  items: Array<Post>;
  pages: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Array<Maybe<Comment>>>;
  post?: Maybe<Post>;
  posts: PostsResponse;
  s3uploadUrl?: Maybe<Scalars['String']['output']>;
};


export type QueryCommentsArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  page: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryS3uploadUrlArgs = {
  objectKey: Scalars['String']['input'];
};

export type UpdateCommentInput = {
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdatePostInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  s3_image_object_key?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  DeleteCommentResponse: ResolverTypeWrapper<DeleteCommentResponse>;
  DeletePostResponse: ResolverTypeWrapper<DeletePostResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  DeleteCommentResponse: DeleteCommentResponse;
  DeletePostResponse: DeletePostResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Post: Post;
  PostsResponse: PostsResponse;
  Query: {};
  String: Scalars['String']['output'];
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
}>;

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteCommentResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeleteCommentResponse'] = ResolversParentTypes['DeleteCommentResponse']> = ResolversObject<{
  affectedRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeletePostResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeletePostResponse'] = ResolversParentTypes['DeletePostResponse']> = ResolversObject<{
  affectedRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['DeleteCommentResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['DeletePostResponse']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>;
}>;

export type PostResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  s3_image_object_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostsResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'postId'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostsResponse'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'page'>>;
  s3uploadUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryS3uploadUrlArgs, 'objectKey'>>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Comment?: CommentResolvers<ContextType>;
  DeleteCommentResponse?: DeleteCommentResponseResolvers<ContextType>;
  DeletePostResponse?: DeletePostResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostsResponse?: PostsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

