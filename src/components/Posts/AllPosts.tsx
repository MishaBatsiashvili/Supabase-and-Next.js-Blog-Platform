'use client'

import React, { useEffect, useState } from 'react'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import Post from './Post.tsx/Post'
import { User } from '@supabase/supabase-js'
import { NormalizedCacheObject, useQuery } from '@apollo/client'
import { Card, CardBody, Pagination, Skeleton } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GetPostsQuery } from '@/__generated__/graphql'
import { HalfShortPostSkeleton } from './Post.tsx/Variations'
import { toast } from 'react-toastify'

const getPageNumber = (pageString: string | null) => {
  try {
    if (!pageString) {
      throw new Error(`pageString is ${pageString}`)
    }
    return parseInt(pageString)
  } catch (err) {
    return 1
  }
}

const AllPosts: React.FC<{
  user: User
}> = ({ user }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(getPageNumber(searchParams.get('page')))
  const [cachePosts, setCachedPosts] = useState<
    GetPostsQuery['posts']['items']
  >([])
  const [cachePages, setCachedPages] =
    useState<GetPostsQuery['posts']['pages']>(0)

  const { data, error, refetch, loading } = useQuery(GET_POSTS, {
    variables: {
      page,
    },
    onCompleted: (data) => {
      setCachedPages(data?.posts.pages ?? 0)
    },
    onError: () => {
      toast.error('Problem fetching posts')
    },
  })

  useEffect(() => {
    if (loading) {
      setCachedPosts([])
    } else {
      setCachedPosts(data?.posts.items ?? [])
    }
  }, [data, loading])

  const posts = cachePosts
  const pages = cachePages

  const renderPosts = () => {
    if (loading || !!error) {
      return (
        <>
          <HalfShortPostSkeleton />
          <HalfShortPostSkeleton />
        </>
      )
    }

    return posts.map((post) => (
      <div key={post.id} className="col-span-1">
        <Post post={post} user={user} variant="halfShort" />
      </div>
    ))
  }

  if (posts?.length === 0 && !loading) {
    return (
      <div className="mt-24 flex justify-center">
        <Card className="px-5">
          <CardBody className="text-center">
            <p className="text-sm">No Posts</p>
            <button
              onClick={() => {
                setPage(1)
              }}
              className="mt-3 rounded-md bg-black px-3 py-2 text-sm text-white"
            >
              Return to Home
            </button>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <h3 className="mr-4 mt-[30px] text-xl font-bold">All blog posts</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">{renderPosts()}</div>

      <div className="flex justify-center py-14">
        {pages ? (
          <Pagination
            className="inline-block"
            showControls
            total={pages}
            initialPage={page}
            onChange={(newPage) => {
              setPage(newPage)
              const newSearchParams = new URLSearchParams(
                searchParams.toString()
              )
              newSearchParams.set('page', newPage.toString())
              router.push(`${pathname}?${newSearchParams.toString()}`)
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AllPosts
