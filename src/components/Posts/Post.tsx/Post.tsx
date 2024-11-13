import { GetPostsQuery } from "@/__generated__/graphql";
import { User } from "@supabase/supabase-js";
import React from "react";
import { HalfPost, HalfShortPost, FullShortPost } from "./Variations"; // import your variants
import Link from "next/link";

type PostProps = {
    post: NonNullable<GetPostsQuery['posts']['items']>[0];
    variant: 'half' | 'halfShort' | 'fullShort';
    titleCharSize?: number
    contentCharSize?: number
};

const Post: React.FC<PostProps> = ({ post, variant = 'half', titleCharSize, contentCharSize }) => {
    const renderVariant = () => {
        switch (variant) {
            case 'half':
                return <HalfPost post={post} titleCharSize={titleCharSize} contentCharSize={contentCharSize} />;
            case 'halfShort':
                return <HalfShortPost post={post} titleCharSize={titleCharSize} contentCharSize={contentCharSize} />;
            case 'fullShort':
                return <FullShortPost post={post} titleCharSize={titleCharSize} contentCharSize={contentCharSize} />;
            default:
                return null;
        }
    };

    return (
        <div className="block rounded-md">
            <Link href={`/post/${post.id}`}>
                {renderVariant()}
            </Link>
        </div>
    );
}

export default Post;
