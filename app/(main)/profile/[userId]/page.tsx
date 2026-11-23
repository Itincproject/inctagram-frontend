import styles from './page.module.css'
import { getPostsByUserId } from './api/getPostsByUserId'
import { Alert } from '@/shared/ui/Alert/Alert'
import { ProfilePosts } from '@/pages/profile/ui/ProfilePosts/ProfilePosts'
import { GetPostsByUserIdResponse } from '@/features/post/api/postApi.types'
import { ProfileInfo } from '@/pages/profile/ui/ProfileInfo/ProfileInfo'
import { ProfileActions } from '@/pages/profile/ui/ProfileActions/ProfileActions'
import { getUserById } from './api/getUserById'
import { User } from '@/features/user/api/userApi.types'

type ProfilePageProps = {
    params: Promise<{ userId: string }>
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
    const { userId } = await params

    let userErrorMessage = ''
    let postsErrorMessage = ''
    let userData: User | null = null
    let postData: GetPostsByUserIdResponse | null = null

    const result = await Promise.allSettled([getUserById(userId), getPostsByUserId(userId)])

    if (result[0].status === 'fulfilled') {
        userData = result[0].value
    } else {
        const error = result[0].reason
        if (error instanceof TypeError) {
            userErrorMessage = "Couldn't load profile. Check your connection and try again."
        } else if (error instanceof Error && error.message.includes('Failed to fetch user:')) {
            userErrorMessage = 'Failed to load profile. Please try again later'
        } else {
            userErrorMessage = 'Something went wrong. Please, try later again.'
        }
    }
    if (result[1].status === 'fulfilled') {
        postData = result[1].value
    } else {
        const error = result[1].reason
        if (error instanceof TypeError) {
            postsErrorMessage = "Couldn't load posts. Check your connection and try again."
        } else if (error instanceof Error && error.message.includes('HTTP error:')) {
            postsErrorMessage = 'Failed to load posts. Please try again later'
        } else {
            postsErrorMessage = 'Something went wrong. Please, try later again.'
        }
    }

    return (
        <div className={styles.userProfile}>
            {userData && <ProfileInfo userProfile={userData} />}
            {postData && <ProfilePosts initialData={postData} userId={userId} />}
            {postsErrorMessage && <Alert variant="error" message={postsErrorMessage} />}
            {userErrorMessage && <Alert variant="error" message={userErrorMessage} />}
            <ProfileActions profileId={userId} className={styles.actions} />
        </div>
    )
}

export default ProfilePage
