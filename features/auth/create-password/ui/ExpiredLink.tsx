'use client'
import { Button } from '@/shared/ui/Button/Button'
import { Notice } from '@/shared/ui/Notice'
import { passwordReset } from '../../forgot-password/api'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'
import { Alert } from '@/shared/ui/Alert/Alert'

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
            {showModal && <Alert variant="success" message={'We sent link on your email'} />}
            {error && <Alert variant="error" message={error} />}
            <Notice title={title} description={description} imageSrc="/expiredLink.svg">
                <Turnstile
                    ref={turnstileRef}
                    siteKey="0x4AAAAAAFHFBrAWSx9MHmNv"
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
