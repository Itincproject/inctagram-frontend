import { useGetMeQuery } from '@/features/auth/api/authApi'
import Link from 'next/link'
import s from './ProfileActions.module.css'
import { Button } from '@/shared/ui/Button/Button'

type ProfileActionsType = {
    profileId: string
    className?: string
}

export const ProfileActions = ({ profileId, className }: ProfileActionsType) => {
    const { data, isLoading } = useGetMeQuery()

    const isOwner = data?.id === profileId

    return (
        <>
            {isOwner && (
                <Link href="/profile-settings" className={s.profileSettingsLink}>
                    Profile Settings
                </Link>
            )}
            {!isOwner && (
                <div className={className ? className : ''}>
                    <Button title="Follow" variant="primary" />
                    <Button title="Send Message" variant="secondary" />
                </div>
            )}
        </>
    )
}
