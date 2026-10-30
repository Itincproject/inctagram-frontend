import { Post } from '@/entities/Post'
import { ItemType } from '@/pages/static-home-content/model/types'

type Props = {
    posts: ItemType[]
    className?: string
}

export const PostsList = ({ posts, className }: Props) => {
    return (
        <div className={`${className ? className : ''}`}>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
