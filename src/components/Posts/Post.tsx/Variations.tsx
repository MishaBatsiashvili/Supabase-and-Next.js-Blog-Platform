import React from 'react'
import { GetPostsQuery } from '@/__generated__/graphql'
import Image from 'next/image'
import { getS3ImageUrl } from '@/utils/helpers/getS3ImageUrl'
import moment from 'moment'
import { Skeleton } from '@nextui-org/react'

type PostProps = {
  post: NonNullable<GetPostsQuery['posts']>['items'][0]
  titleCharSize?: number
  contentCharSize?: number
}

const HalfPost: React.FC<PostProps> = ({ post }) => (
  <div className="relative rounded-lg">
    <div className="flex h-full w-full flex-col">
      <div className="relative basis-8/12 pt-[40%]">
        <Image
          src={getS3ImageUrl(post.s3_image_object_key)}
          alt="123"
          width={500}
          height={500}
          className="absolute left-0 top-0 h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="basis-6/12 pt-6">
        <span className="text-xs text-violet-700">Sunday , 1 Jan 2023</span>
        <h1 className="mt-1 text-xl font-bold truncate-multi-line-1">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-gray-400 truncate-multi-line-3">
          {post.content}
        </p>
      </div>
    </div>
  </div>
)

const HalfShortPost: React.FC<PostProps> = ({ post }) => (
  <div className="relative rounded-lg">
    <div className="left-0 top-0 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-5">
      <div className="relative col-span-2 basis-6/12 pt-[50%]">
        <Image
          src={getS3ImageUrl(post.s3_image_object_key)}
          alt="123"
          width={500}
          height={500}
          className="absolute left-0 top-0 h-full w-full object-cover rounded-md"
          priority
        />
      </div>
      <div className='col-span-3'>
        <span className="text-xs text-violet-700">
          {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}
        </span>
        <h1 className="mt-1 text-lg font-bold truncate-multi-line-1">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-gray-500 truncate-multi-line-3">
          {post.content}
        </p>
      </div>
    </div>
  </div>
)

const HalfShortPostSkeleton = () => {
  return (
    <div className="relative rounded-lg">
      <div className="left-0 top-0 grid h-full w-full grid-cols-2 gap-6 sm:grid-cols-5">
        <Skeleton className="relative col-span-2 basis-6/12 rounded-md pt-[50%]" />
        <div className='col-span-3'>
          <Skeleton className="w-1/3 rounded-md pt-2 text-lg font-bold truncate-multi-line-1" />
          <Skeleton className="mt-3 w-2/3 rounded-md pt-4 text-lg font-bold truncate-multi-line-1" />
          <Skeleton className="mt-3 w-4/5 rounded-md pt-16 text-sm text-gray-500 truncate-multi-line-3" />
        </div>
      </div>
    </div>
  )
}

const FullShortPost: React.FC<PostProps> = ({ post }) => (
  <div className="rounded-lg border bg-gray-300 p-7">
    <h1 className="text-2xl">{post.title} - FullShortView</h1>
    <p>{post.content.substring(0, 100)}...</p>
  </div>
)

export { HalfPost, HalfShortPost, HalfShortPostSkeleton, FullShortPost }
