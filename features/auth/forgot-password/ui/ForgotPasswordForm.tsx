'use client'

import { FormEvent, useRef, useState } from 'react'

import {
    Recaptcha,
    type StatusType,
} from '@/shared/ui/Recaptcha/Recaptcha'
import {RecaptchaWidget, RecaptchaWidgetRef} from "@/shared/RecaptchaWidget/RecaptchaWidget";



export const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const [captchaStatus, setCaptchaStatus] =
        useState<StatusType>('idle')

    const [recaptchaToken, setRecaptchaToken] =
        useState<string | null>(null)

    const recaptchaRef =
        useRef<RecaptchaWidgetRef>(null)

    const [isLoading, setIsLoading] =
        useState(false)

    const handleCaptchaClick = () => {
        setCaptchaStatus('loading')

        recaptchaRef.current?.execute()
    }

    const handleCaptchaSuccess = (token: string) => {
        setRecaptchaToken(token)
        setCaptchaStatus('success')
    }

    const handleCaptchaError = () => {
        setRecaptchaToken(null)
        setCaptchaStatus('error')
    }

    const handleCaptchaExpired = () => {
        setRecaptchaToken(null)
        setCaptchaStatus('expired')
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        if (
            !email.trim() ||
            !recaptchaToken
        ) {
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(
                '/auth/forgot-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        recaptchaToken,
                    }),
                },
            )

            if (!response.ok) {
                throw new Error(
                    'Failed to send reset link',
                )
            }

            // показать success modal
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const isSubmitDisabled =
        !email.trim() ||
        !recaptchaToken ||
        isLoading

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={event =>
                    setEmail(event.target.value)
                }
            />

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

            <button
                type="submit"
                disabled={isSubmitDisabled}
            >
                {isLoading
                    ? 'Sending...'
                    : 'Send link'}
            </button>
        </form>
    )
}