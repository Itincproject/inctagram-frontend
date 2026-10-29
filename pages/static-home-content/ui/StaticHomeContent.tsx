import { UserCount } from '@/widgets/UserCount'
import s from './StaticHomeContent.module.css'
import { getPosts } from '../api/getPosts'
import { Alert } from '@/shared/ui/Alert/Alert'
import { PostsList } from '@/widgets/PostList'
import { PostsResponse } from '../model/types'

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
    return (
        <div className={s.container}>
            {result && (
                <>
                    <UserCount totalCount={result.totalUsers} />
                    <PostsList posts={result.items} className={s.posts} />
                </>
            )}

            {errorMessage && <Alert variant="error" message={errorMessage} />}
        </div>
    )
}
