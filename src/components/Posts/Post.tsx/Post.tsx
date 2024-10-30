import { GetPostsQuery } from "@/__generated__/graphql";
import EditPostModal from "@/components/EditPostModal/EditPostModal";
import { DELETE_POSTS } from "@/graphql/client/mutations/DELETE_POST";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import { useMutation } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import React, { useState } from "react";
import { HalfPost, HalfShortPost, FullShortPost } from "./Variations"; // import your variants

type PostProps = {
    post: NonNullable<GetPostsQuery['posts']>[0];
    user: User;
    variant: 'half' | 'halfShort' | 'fullShort';
};

const Post: React.FC<PostProps> = ({ post, user, variant = 'half' }) => {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const [mutateFunction] = useMutation(DELETE_POSTS, {
        refetchQueries: [{ query: GET_POSTS }]
    });

    const renderActionButtons = () => {
        if (post.user_id === user.id) {
            return (
                <div className="mt-5">
                    <button className="mr-2 py-1 px-4 bg-slate-500 text-white rounded-md text-sm" onClick={() => setEditModalIsOpen(true)}>Edit</button>
                    <EditPostModal modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} post={post} />
                    <button onClick={() => mutateFunction({ variables: { id: post.id } })} className="mr-2 py-1 px-4 bg-red-600 rounded-md text-sm">Delete</button>
                </div>
            );
        }
        return null;
    };

    const renderVariant = () => {
        switch (variant) {
            case 'half':
                return <HalfPost post={post} />;
            case 'halfShort':
                return <HalfShortPost post={post} />;
            case 'fullShort':
                return <FullShortPost post={post} />;
            default:
                return null;
        }
    };

    return (
        <div className="block rounded-md">
            {renderVariant()}
            {/* {renderActionButtons()} */}
        </div>
    );
}

export default Post;
