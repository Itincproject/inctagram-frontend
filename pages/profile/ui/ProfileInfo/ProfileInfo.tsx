import Image from 'next/image'
import s from './ProfileHeader.module.css'
import { User } from '@/shared/model/types/userApi.types'

import defaultAvatar from '@/public/default-avatar.png'

type ProfileInfoProps = {
    userProfile: User
}
export const ProfileInfo = ({ userProfile }: ProfileInfoProps) => {
    const { username, avatarUrl, postsCount, aboutMe: description } = userProfile
    return (
        <div className={s.mainContainer}>
            <div className={s.userPhoto}>
                <Image
                    src={avatarUrl ? avatarUrl : defaultAvatar}
                    alt={`Avatar of ${username}`}
                    width={204}
                    height={204}
                />
            </div>
            <div className={s.userDetails}>
                <h3 className={s.userName}>{username}</h3>

                <div className={s.profileInfo}>
                    <div className={s.followingBlock}>
                        <span>1000</span>
                        <span>Following</span>
                    </div>

                    <div className={s.followersBlock}>
                        <span>1000</span>
                        <span>Followers</span>
                    </div>

                    <div className={s.countPublications}>
                        <span>{postsCount}</span>
                        <span>Publications</span>
                    </div>
                </div>

                <div className={s.profileDesc}>{description}</div>
            </div>
        </div>
    )
}
