'use client'

import { ChangeEvent, SubmitEventHandler, useState } from 'react'
import s from './ForgotPassword.module.css'
import { Input } from '@/shared/ui/Inputs/Input'
import { Button } from '@/shared/ui/Button/Button'
import { Recaptcha } from '@/shared/ui/Recaptcha'
import { passwordReset } from '../api'
// import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')

    const [sendingEmail, setSendingEmail] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const isEmailValid = EMAIL_REGEX.test(email.trim())

    const isButtonDisabled = email.trim() === '' || isLoading

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        if (!isEmailValid) {
            setError('Invalid email format. Please check your email and try again')
            return
        }

        setIsLoading(true)

        try {
            await passwordReset(email.trim())
            setSendingEmail(true)
            setShowModal(true)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Что-то пошло не так'
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={s.form}>
                <Input
                    label="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value)
                        setError(undefined)
                    }}
                    className={s.input}
                    error={error}
                />
                <span className={s.instruction}>
                    Enter your email address and we will send you further instructions{' '}
                </span>
                {!sendingEmail && (
                    <>
                        <Button
                            title="Send Link"
                            variant="primary"
                            type="submit"
                            disabled={isButtonDisabled}
                            className={s.btn}
                        />

                        <Button title="Back to Sign In" variant="text" className={s.btn} />

                        <Recaptcha status={'idle'} onClick={() => console.log('click')} className={s.recaptcha} />
                    </>
                )}
                {sendingEmail && (
                    <>
                        <span className={s.successMessage}>
                            The link has been sent by email. If you don’t receive an email send link again
                        </span>
                        <Button
                            title="Send Link Again"
                            variant="primary"
                            type="submit"
                            disabled={isButtonDisabled}
                            className={s.btn}
                        />

                        <Button title="Back to Sign In" variant="text" />
                    </>
                )}
                {/* {showModal && (
                    <AlertModal title="Email sent" text="We have sent a link to confirm your email to" email={email} />
                )} */}
            </form>
        </>
    )
}
