'use client'

import { getS3ImageUrl } from '@/utils/helpers/getS3ImageUrl'
import Image from 'next/image'
import React from 'react'
import PostActions from '../PostActions/PostActions'
import { GetPostQuery } from '@/__generated__/graphql'
import { motion } from 'framer-motion'
import { useUser } from '@nextui-org/react'

const renderContentWithLineBreaks = (content: string) => {
  return { __html: content.replace(/\n/g, '<br />') }
}

const PostView: React.FC<{
  post: Exclude<GetPostQuery['post'], null | undefined>
}> = ({ post }) => {
  return (
    <div>
      <div className="relative mt-3 w-full pt-[60%]">
        <Image
          src={getS3ImageUrl(post.s3_image_object_key)}
          alt="123"
          width={1000}
          height={1000}
          className="absolute left-0 top-0 h-full w-full object-cover"
          priority
        />
      </div>

      <PostActions post={post} />

      <div className="mb-24 mt-6">
        <h1 className="text-center text-2xl font-bold">{post.title}</h1>
        <p
          className="mt-6"
          dangerouslySetInnerHTML={renderContentWithLineBreaks(post.content)}
        />
      </div>
    </div>
  )
}

export default PostView
