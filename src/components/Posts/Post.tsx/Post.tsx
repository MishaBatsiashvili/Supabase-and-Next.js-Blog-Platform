
export type Post = {
    id: number
    user_id: string
    title: string
    content: string
}

const Post: React.FC<{
    post: any
}> = ({
    post
}) => {
    return <h1>{post.title}</h1>
}

export default Post