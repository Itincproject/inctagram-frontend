import { UserCount } from '@/widgets/UserCount'
import s from './StaticHomeContent.module.css'
import { getPosts } from '@/widgets/static-home-content/api/getPosts'
import { Alert } from '@/shared/ui/Alert/Alert'
import { PostsList } from '@/widgets/PostList'
import { PostsResponse } from '../model/types'
import { formatPostDate } from '@/shared/libs/formatPostDate'

export async function StaticHomeContent() {
    let result: PostsResponse | undefined
    let errorMessage

    try {
        result = await getPosts()
    } catch (error) {
        console.error('getPosts error:', error)
        if (error instanceof TypeError) {
            errorMessage = "Couldn't load posts. Check your connection and try again."
        } else if (error instanceof Error && error.message.includes('HTTP error:')) {
            errorMessage = 'Failed to load posts. Please try again later'
        } else {
            errorMessage = 'Something went wrong. Please, try later again.'
        }
    }

    const posts = result?.items.map((post) => ({
        ...post,
        publishTime: formatPostDate(post.createdAt),
    }))
    return (
        <div className={s.container}>
            {result && posts && (
                <>
                    <UserCount totalCount={result.totalUsers} />
                    <PostsList posts={posts} className={s.posts} />
                </>
            )}

            {errorMessage && <Alert variant="error" message={errorMessage} />}
        </div>
    )
}
