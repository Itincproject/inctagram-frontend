'use client'

import { FormEvent, useRef, useState } from 'react'

import {
    Recaptcha,
    type StatusType,
} from '@/shared/ui/Recaptcha/Recaptcha'
import {
    RecaptchaWidget,
    type RecaptchaWidgetRef,
} from '@/shared/RecaptchaWidget/RecaptchaWidget'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [captchaToken, setCaptchaToken] =
        useState<string | null>(null)

    const [captchaStatus, setCaptchaStatus] =
        useState<StatusType>('idle')

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const recaptchaRef =
        useRef<RecaptchaWidgetRef>(null)

    const handleCaptchaClick = () => {
        setIsError(false)
        setCaptchaStatus('loading')

        recaptchaRef.current?.execute()
    }

    const handleCaptchaSuccess = (token: string) => {
        setCaptchaToken(token)
        setCaptchaStatus('success')
    }

    const handleCaptchaError = () => {
        setCaptchaToken(null)
        setCaptchaStatus('error')
    }

    const handleCaptchaExpired = () => {
        setCaptchaToken(null)
        setCaptchaStatus('expired')
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (!email.trim() || !captchaToken) {
            return
        }

        setIsLoading(true)
        setIsError(false)

        try {
            const response = await fetch(
                `${API_URL}/auth/password-recovery`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        captchaToken,
                    }),
                },
            )

            if (response.status === 204) {
                setIsSuccess(true)
                return
            }

            if (response.status === 400) {
                setIsError(true)

                // CAPTCHA мог быть invalid/expired,
                // поэтому token больше не используем.
                setCaptchaToken(null)
                setCaptchaStatus('idle')
                recaptchaRef.current?.reset()

                return
            }

            throw new Error(
                `Unexpected response: ${response.status}`,
            )
        } catch (error) {
            console.error(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const isSubmitDisabled =
        !email.trim() ||
        !captchaToken ||
        isLoading

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={event =>
                    setEmail(event.target.value)
                }
                placeholder="Email"
                autoComplete="email"
            />

            <p>
                Enter your email and we will send you
                further instruction
            </p>

            <Recaptcha
                status={captchaStatus}
                onClick={handleCaptchaClick}
            />

            <RecaptchaWidget
                ref={recaptchaRef}
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                onExpired={handleCaptchaExpired}
            />

            {isError && (
                <p>
                    Something went wrong. Please check
                    your email and CAPTCHA and try again.
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitDisabled}
            >
                {isLoading
                    ? 'Sending...'
                    : 'Send link'}
            </button>

            {isSuccess && (
                <p>
                    We have sent a link to confirm your
                    email to {email}
                </p>
            )}
        </form>
    )
}