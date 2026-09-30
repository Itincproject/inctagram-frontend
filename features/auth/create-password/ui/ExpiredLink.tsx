'use client'
import { Button } from '@/shared/ui/Button/Button'
import { Notice } from '@/shared/ui/Notice'
import { passwordReset } from '../../forgot-password/api'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'
import { Alert } from '@/shared/ui/Alert/Alert'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'

export const ExpiredLink = () => {
    const title = 'Email verification link expired'
    const description = 'Looks like the verification link has expired. Not to worry, we can send the link again'

    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)

    const turnstileRef = useRef<TurnstileInstance | null>(null)

    const startCheckCaptcha = () => {
        turnstileRef.current?.execute()
    }

    const handleResendonSuccess = async (token: string) => {
        const email = sessionStorage.getItem('resetEmail')

        if (!email) {
            setError('Something went wrong. Please try again.')
            return
        }

        try {
            await passwordReset({
                email,
                token,
            })
            setShowModal(true)
            sessionStorage.removeItem('resetEmail')
        } catch {
            setError('Something went wrong. Please try again.')
        }
    }

    return (
        <>
            {showModal && (
                <AlertModal
                    open={showModal}
                    title="Email sent"
                    text="We have sent a link to confirm your email"
                    isOneBtn={true}
                    onClose={() => setShowModal(false)}
                />
            )}
            {error && <Alert variant="error" message={error} />}
            <Notice title={title} description={description} imageSrc="/expiredLink.svg">
                <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    options={{
                        execution: 'execute',
                        appearance: 'interaction-only',
                    }}
                    onSuccess={handleResendonSuccess}
                />
                <Button title="Sent Link Again" variant="primary" onClick={startCheckCaptcha} />
            </Notice>
        </>
    )
}
