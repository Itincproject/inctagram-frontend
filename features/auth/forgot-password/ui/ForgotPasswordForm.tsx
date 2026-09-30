'use client'

import { ChangeEvent, SubmitEventHandler, useState } from 'react'
import s from './ForgotPassword.module.css'
import { Input } from '@/shared/ui/Inputs/Input'
import { Button } from '@/shared/ui/Button/Button'
import { passwordReset } from '../api'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { useRouter } from 'next/navigation'
import { Captcha } from '../../captcha-protection/Captcha'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')

    const [sendingEmail, setSendingEmail] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    const [emailTouched, setEmailTouched] = useState(false)

    const handleToken = (token: string) => {
        setCaptchaToken(token)
    }

    const router = useRouter()

    const isEmailValid = EMAIL_REGEX.test(email.trim())
    const isEmailformatError = email.length > 0 && !isEmailValid && emailTouched

    const isButtonDisabled = email.trim() === '' || isLoading || !captchaToken

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        if (!isEmailValid) {
            setError('Invalid email format. Please check your email and try again')
            return
        }

        setIsLoading(true)

        try {
            if (!captchaToken) return
            await passwordReset({ email: email.trim(), token: captchaToken })
            setSendingEmail(true)
            setShowModal(true)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Что-то пошло не так'
            setError(message)
        } finally {
            setIsLoading(false)
            setCaptchaToken(null)
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
                    onBlur={() => setEmailTouched(true)}
                />
                {isEmailformatError ? (
                    <span className={s.err_instruction}>The email must match the format example@example.com</span>
                ) : (
                    <span className={s.instruction}>
                        Enter your email address and we will send you further instructions{' '}
                    </span>
                )}

                {!sendingEmail && (
                    <>
                        <Button
                            title="Send Link"
                            variant="primary"
                            type="submit"
                            disabled={isButtonDisabled}
                            className={s.btn}
                        />

                        <Button
                            title="Back to Sign In"
                            variant="text"
                            className={s.btn}
                            onClick={() => router.push('/sign-in')}
                        />

                        <Captcha onSuccess={handleToken} className={s.recaptcha} />
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

                        <Button title="Back to Sign In" variant="text" onClick={() => router.push('/sign-in')} />
                    </>
                )}
                {showModal && (
                    <AlertModal
                        open={showModal}
                        title="Email sent"
                        text="We have sent a link to confirm your email to"
                        email={email}
                        isOneBtn
                        onClose={() => setShowModal(false)}
                    />
                )}
            </form>
        </>
    )
}
