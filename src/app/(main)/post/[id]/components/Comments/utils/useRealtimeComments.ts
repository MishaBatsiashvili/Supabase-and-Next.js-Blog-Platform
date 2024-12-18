import { Database } from "@/database.schema"
import { GET_COMMENTS } from "@/graphql/client/queries/GET_COMMENTS"
import { createClient } from "@/utils/supabase/client"
import { useApolloClient, useQuery } from "@apollo/client"
import { Modifier, Reference } from "@apollo/client/cache"
import { useCallback, useEffect } from "react"

type CommentType = Database['public']['Tables']['comments']['Row']

export const useRealtimeComments = (postId: string) => {
    const client = useApolloClient()
  const { loading: commentsLoading, error: commentsError, data: commentsData } = useQuery(GET_COMMENTS, {
    variables: {
      postId: postId
    },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only'
  })
  const supabase = createClient()

  const subscribeToRealtimeComments = useCallback(() => {
    return supabase
      .channel('comments')
      .on<CommentType>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        (payload) => {
          const { eventType, new: newComment, old: oldComment } = payload
          
          switch (eventType) {
            case 'INSERT':
              client.cache.modify({
                fields: {
                  comments(existingCommentRefs = [], { toReference }) {
                    const newCommentRef = toReference({
                      __typename: 'Comment',
                      ...newComment,
                    }, true);
              
                    return [newCommentRef, ...existingCommentRefs];
                  },
                },
              });
              break;
            case 'UPDATE':
              client.cache.modify({
                fields: {
                  comments(existingCommentRefs = [], { toReference }): Reference[] {
                    if (!Array.isArray(existingCommentRefs)) {
                      return existingCommentRefs;
                    }

                    return existingCommentRefs.map((ref) => {
                      if(ref.__ref === `Comment:${newComment.id}`){
                        return toReference({
                          __typename: 'Comment',
                          ...newComment
                        }, true)
                      }
                      return ref
                    })
                  },
                },
              });
              break;
            case 'DELETE':
              client.cache.modify({
                fields: {
                  comments(existingCommentRefs = []) {
                    
                    if (!Array.isArray(existingCommentRefs)) {
                      return existingCommentRefs;
                    }

                    return existingCommentRefs.filter(ref => {
                      return ref.__ref !== `Comment:${oldComment.id}`
                    })
                  },
                },
              });
              break;
            default:
              return
          }
        }
      )
      .subscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    useEffect(() => {
        const channel = subscribeToRealtimeComments()
        return () => {
            supabase.removeChannel(channel)
        }
    }, [commentsData, client.cache, subscribeToRealtimeComments, supabase])

    return {
        commentsLoading,
        commentsError,
        commentsData
    }
}