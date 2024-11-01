import React from 'react';
import { GetPostsQuery } from "@/__generated__/graphql";
import Image from 'next/image';
import { textTruncate } from '@/utils/helpers/textTruncate';

const IMAGE = 'https://i.ytimg.com/vi/fAMfYPmyDbk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQIiql4o6GNn5BfsQMTzagf155VQ'

type PostProps = {
    post: NonNullable<GetPostsQuery['posts']>[0]
    titleCharSize?: number
    contentCharSize?: number
}

// Example component for HalfPost
const HalfPost: React.FC<PostProps> = ({ post }) => (
    <div className="rounded-lg relative">
        <div className='w-full h-full flex flex-col'>
            <div className='relative pt-[40%] basis-8/12'>
                <Image src={IMAGE} alt='123' width={500} height={500} className='absolute left-0 top-0 w-full h-full object-cover'/>
            </div>
            <div className='basis-6/12 pt-6'>
                <span className='text-xs text-violet-700'>Sunday , 1 Jan 2023</span>
                <h1 className="text-xl font-bold mt-1 truncate-multi-line-1">{post.title}</h1>
                <p className='text-sm text-gray-400 mt-3 truncate-multi-line-3'>{post.content}</p>
                <div className='flex flex-wrap mt-8 gap-2'>
                    <span className='text-xs px-4 py-1 bg-gray-100 rounded-lg'>Design</span>
                    <span className='text-xs px-4 py-1 bg-gray-100 rounded-lg'>Development</span>
                    <span className='text-xs px-4 py-1 bg-gray-100 rounded-lg'>Frontend</span>
                </div>
            </div>
        </div>
    </div>
);

// Create similar components for FourthPost and FullShortPost

const HalfShortPost: React.FC<PostProps> = ({ post }) => (
    <div className="rounded-lg relative">
        <div className='top-0 left-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div className='relative basis-6/12 pt-[50%] col-span-1'>
                <Image src={IMAGE} alt='123' width={500} height={500} className='absolute left-0 top-0 w-full h-full object-cover'/>
            </div>
            <div>
                <span className='text-xs text-violet-700'>Sunday , 1 Jan 2023</span>
                <h1 className="text-lg font-bold mt-1 truncate-multi-line-1">{post.title}</h1>
                <p className='text-sm text-gray-500 mt-3 truncate-multi-line-3'>{post.content}</p>
                <div className='flex flex-wrap mt-8 gap-2'>
                    <span className='text-xs px-4 py-1 bg-gray-100 rounded-lg'>Design</span>
                    <span className='text-xs px-4 py-1 bg-gray-100 rounded-lg'>Development</span>
                </div>
            </div>
        </div>
    </div>
);

const FullShortPost: React.FC<PostProps> = ({ post }) => (
    <div className="p-7 bg-gray-300 border rounded-lg">
        <h1 className="text-2xl">{post.title} - FullShortView</h1>
        <p>{post.content.substring(0, 100)}...</p>
    </div>
);

export { HalfPost, HalfShortPost, FullShortPost };
