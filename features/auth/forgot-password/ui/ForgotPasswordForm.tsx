'use client'

import { ChangeEvent, SubmitEventHandler, useRef, useState } from 'react'
import s from './ForgotPassword.module.css'
import { Input } from '@/shared/ui/Inputs/Input'
import { Button } from '@/shared/ui/Button/Button'
import { usePasswordResetMutation } from '../api'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { useRouter } from 'next/navigation'
import { Captcha, CaptchaRef } from '../../captcha-protection/Captcha'
import { Alert } from '@/shared/ui/Alert/Alert'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { TurnstileCaptcha } from '../../captcha-protection/TurnstileCaptcha'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [sendingEmail, setSendingEmail] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [alertError, setAlertError] = useState<string | undefined>(undefined)
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [emailTouched, setEmailTouched] = useState(false)
    const [shouldExecute, setShouldExecute] = useState(false)

    const captchaRef = useRef<CaptchaRef | null>(null)

    const [passwordReset, { isLoading }] = usePasswordResetMutation()

    const handleToken = (token: string) => {
        setCaptchaToken(token)
    }

    const router = useRouter()

    const isEmailValid = EMAIL_REGEX.test(email.trim())
    const isEmailformatError = email.length > 0 && !isEmailValid && emailTouched

    const isButtonDisabled = email.trim() === '' || isLoading || !captchaToken

    const sendResetEmail = async (token: string) => {
        if (!isEmailValid) {
            setError('Invalid email format. Please check your email and try again')
            return
        }
        try {
            await passwordReset({ email: email.trim(), captchaToken: token }).unwrap()
            setSendingEmail(true)
            setShowModal(true)
        } catch (error) {
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
                setError('The email address is invalid. Please check the format and try again.')
            } else if (error.status === 503) {
                setAlertError('Captcha service is currently unavailable. Please try again later.')
            } else {
                setAlertError('Something went wrong. Please, try again later')
            }
        } finally {
            setCaptchaToken(null)
            captchaRef.current?.resetCaptcha()
        }
    }

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setAlertError(undefined)
        if (!captchaToken) return
        sendResetEmail(captchaToken)
    }
    const handleCaptchaSuccess = async (token: string) => {
        setShouldExecute(false)
        await sendResetEmail(token)
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

                        <Captcha onSuccess={handleToken} className={s.recaptcha} ref={captchaRef} />
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
                            type="button"
                            disabled={isLoading || !isEmailValid}
                            className={s.btn}
                            onClick={() => setShouldExecute(true)}
                        />
                        <TurnstileCaptcha shouldExecute={shouldExecute} onSuccess={handleCaptchaSuccess} />
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
            {alertError && <Alert variant="error" message={alertError} />}
        </>
    )
}
