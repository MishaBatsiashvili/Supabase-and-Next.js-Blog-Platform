'use client'

import { GetPostsQuery } from '@/__generated__/graphql'
import Post from '@/components/Posts/Post.tsx/Post'
import { HalfShortPostSkeleton } from '@/components/Posts/Post.tsx/Variations'
import { useUser } from '@/contexts/UserContext/UserContext'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import { useQuery } from '@apollo/client'
import { Pagination } from '@nextui-org/pagination'
import { Skeleton } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

const Posts = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { user, userIsLoading } = useUser()
  const [page, setPage] = useState(1)
  const [cachePages, setCachedPages] =
  useState<GetPostsQuery['posts']['pages']>(0)

  const {
    data,
    loading: postsLoading,
  } = useQuery(GET_POSTS, {
    variables: {
      page: page,
      userId: user?.id,
    },
    skip: userIsLoading,
    onCompleted: (data) => {
      setCachedPages(data?.posts.pages ?? 0)
    },
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', newPage.toString())
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    const newPage = newSearchParams.get('page')
    if (newPage && newPage !== page.toString()) {
      setPage(getPageNumber(newPage))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const renderLoadingView = () => {
    return (
      <motion.div
        key="user-posts-skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="grid grid-cols-2 gap-5">
          <HalfShortPostSkeleton />
          <HalfShortPostSkeleton />
          <HalfShortPostSkeleton />
          <HalfShortPostSkeleton />
        </div>
        <div className="mt-12 flex justify-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </motion.div>
    )
  }

  const renderLoadedView = () => {
    return (
      <motion.div
        key="user-posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="grid grid-cols-2 gap-3">
          {data?.posts.items.map((post) => (
            <Post key={post.id} post={post} variant="halfShort" />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            className="mt-12 inline-block"
            classNames={{
              cursor: 'bg-black text-white',
            }}
            showControls
            total={cachePages}
            initialPage={page}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {postsLoading ? renderLoadingView() : renderLoadedView()}
    </AnimatePresence>
  )
}

export default Posts
