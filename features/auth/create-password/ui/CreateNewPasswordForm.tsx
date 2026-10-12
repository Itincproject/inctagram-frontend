'use client'

import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Inputs/Input'
import { ChangeEvent, SubmitEventHandler, useState } from 'react'
import s from './CreateNewPassword.module.css'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useCreatePasswordMutation } from '../api'
import { useRouter } from 'next/navigation'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { Alert } from '@/shared/ui/Alert/Alert'

type Props = {
    code: string
    onExpired: () => void
}

export const CreateNewPasswordForm = ({ code, onExpired }: Props) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [alertError, setAlertError] = useState<string | undefined>(undefined)

    const [confirmTouched, setConfirmTouched] = useState(false)

    const router = useRouter()

    const isValidPassword = password.length > 0 && (password.length < 6 || password.length > 20)

    const showMatchError = confirmTouched && confirmPassword.length > 0 && password !== confirmPassword

    const [createPassword, { isLoading }] = useCreatePasswordMutation()

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setAlertError(undefined)

        try {
            await createPassword({ newPassword: password, recoveryCode: code }).unwrap()
            router.push('/sign-in')
        } catch (error) {
            console.log('Ошибка:', error)
            console.log('Тип ошибки:', typeof error)
            console.log('Caught error:', error)
            console.log('Is RTK Query error:', isFetchBaseQueryError(error))
            if (!isFetchBaseQueryError(error)) {
                setAlertError('Something went wrong. Please, try again later')
                return
            }

            const commonMessage = getCommonErrorMessage(error)
            if (commonMessage) {
                setAlertError(commonMessage)
                return
            }
            if (error.status === 400) {
                setAlertError('The password is invalid. Please check and try again.')
            } else if (error.status === 404) {
                onExpired()
            } else {
                setAlertError('Something went wrong. Please, try again later')
            }
        }
    }

    return (
        <>
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
                    label="Password сonfirmations"
                    value={confirmPassword}
                    icon={visible ? <Icon name="eye" className={s.eyeIcon} /> : <Icon name="eye-off" />}
                    iconOnClick={() => setVisible(!visible)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setConfirmPassword(e.target.value)
                    }}
                    onBlur={() => setConfirmTouched(true)}
                    className={s.confirm_password}
                    error={showMatchError ? 'Passwords must match' : undefined}
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
            {alertError && <Alert variant="error" message={alertError} />}
        </>
    )
}
