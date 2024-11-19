'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { GET_POSTS } from '@/graphql/client/queries/GET_POSTS'
import Post from './Post.tsx/Post'
import { User } from '@supabase/supabase-js'
import { NormalizedCacheObject, useQuery } from '@apollo/client'
import { Card, CardBody, Pagination, Skeleton } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { GetPostsQuery } from '@/__generated__/graphql'
import { HalfShortPostSkeleton } from './Post.tsx/Variations'
import { toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from '@/contexts/UserContext/UserContext'

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

const AllPosts: React.FC<{}> = () => {
  const { userIsLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(getPageNumber(searchParams.get('page')))
  const [cachePages, setCachedPages] =
    useState<GetPostsQuery['posts']['pages']>(0)

  const { data, loading } = useQuery(GET_POSTS, {
    variables: {
      page,
    },
    onCompleted: (data) => {
      setCachedPages(data?.posts.pages ?? 0)
    },
    onError: () => {
      toast.error('Problem fetching posts')
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })

  const posts = data?.posts.items
  const pages = cachePages

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

  const renderPosts = () => {
    if (loading) {
      return (
        <motion.div
          key={'skeleton-1'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid md:gap-6"
        >
          <HalfShortPostSkeleton />
          <HalfShortPostSkeleton />
        </motion.div>
      )
    }

    if(posts?.length === 0){
      return <>No Posts</>
    }

    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0 }}
        key={`posts-page:${page}`}
      >
        <div className="col-span-1 grid gap-6">
          {posts?.map((post) => (
            <Post key={post.id} post={post} variant="halfShort" />
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        {userIsLoading ? (
          <Skeleton className="mt-[30px] w-1/2 max-w-[250px] rounded-md">
            <h3 className="text-xl">Loading...</h3>
          </Skeleton>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-[30px]"
          >
            <h3 className="mr-4 text-xl font-bold">All blog posts</h3>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="wait">{renderPosts()}</AnimatePresence>
      </div>

      <div className="flex justify-center py-14">
        {pages > 0 ? (
          <Pagination
            className="inline-block"
            classNames={{
              cursor: 'bg-black text-white',
            }}
            showControls
            total={pages}
            initialPage={page}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AllPosts
