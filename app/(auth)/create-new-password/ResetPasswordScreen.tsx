'use client'

import { CreateNewPasswordForm } from '@/features/auth/create-password/ui/CreateNewPasswordForm'
import { ExpiredLink } from '@/features/auth/create-password/ui/ExpiredLink'
import { useState } from 'react'
import styles from './ResetPasswordScreen.module.css'

type Props = {
    code: string
}

export const ResetPasswordScreen = ({ code }: Props) => {
    const [expired, setExpired] = useState(false)

    if (expired) {
        return <ExpiredLink />
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Create New Password</h3>
            <CreateNewPasswordForm code={code} onExpired={() => setExpired(true)} />
        </div>
    )
}
