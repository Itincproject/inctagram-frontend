'use client'

import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Inputs/Input'
import { ChangeEvent, SubmitEventHandler, useState } from 'react'
import s from './CreateNewPassword.module.css'
import { Icon } from '@/shared/ui/Icon/Icon'
import { CreateNewPassword } from '../api'
import { useRouter } from 'next/navigation'

type Props = {
    code: string
    onExpired: () => void
}

export const CreateNewPasswordForm = ({ code, onExpired }: Props) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [confirmTouched, setConfirmTouched] = useState(false)

    const router = useRouter()

    const isValidPassword = password.length > 0 && (password.length < 6 || password.length > 20)

    const showMatchError = confirmTouched && confirmPassword.length > 0 && password !== confirmPassword

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await CreateNewPassword({ newPassword: password, recoveryCode: code })
            router.push('/sign-in')
        } catch {
            onExpired()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type={visible ? 'text' : 'password'}
                label="New Password"
                value={password}
                icon={visible ? <Icon name="eye" className={s.eyeIcon} /> : <Icon name="eye-off" />}
                iconOnClick={() => setVisible(!visible)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }}
                className={s.new_password}
            />
            <Input
                type={visible ? 'text' : 'password'}
                label="Password Confirmations"
                value={confirmPassword}
                icon={visible ? <Icon name="eye" className={s.eyeIcon} /> : <Icon name="eye-off" />}
                iconOnClick={() => setVisible(!visible)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value)
                }}
                onBlur={() => setConfirmTouched(true)}
                className={s.confirm_password}
                error={showMatchError ? 'The passwords must match' : undefined}
            />
            <span className={`${s.information} ${isValidPassword ? s.error : ''}`}>
                Your password must be between 6 and 20 characters
            </span>
            <Button
                title="Create New Password"
                variant="primary"
                type="submit"
                disabled={isLoading || isValidPassword || showMatchError}
                fullWidth
            />
        </form>
    )
}
