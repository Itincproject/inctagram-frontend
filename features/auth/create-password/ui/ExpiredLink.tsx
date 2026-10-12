'use client'
import { Button } from '@/shared/ui/Button/Button'
import { Notice } from '@/shared/ui/Notice'
import { usePasswordResetMutation } from '../../forgot-password/api'
import { useState } from 'react'
import { Alert } from '@/shared/ui/Alert/Alert'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { TurnstileCaptcha } from '../../captcha-protection/TurnstileCaptcha'

export const ExpiredLink = () => {
    const title = 'Email verification link expired'
    const description = 'Looks like the verification link has expired. Not to worry, we can send the link again'

    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [shouldExecute, setShouldExecute] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    const [passwordReset] = usePasswordResetMutation()
    const hadleClick = () => {
        setShouldExecute(true)
        setIsloading(true)
    }
    const handleResendOnSuccess = async (token: string) => {
        setShouldExecute(false)
        const email = sessionStorage.getItem('resetEmail')

        if (!email) {
            setError('Unable to find your email. Please try again.')
            return
        }

        try {
            await passwordReset({
                email,
                captchaToken: token,
            }).unwrap()
            setShowModal(true)
            sessionStorage.removeItem('resetEmail')
        } catch (error) {
            if (!isFetchBaseQueryError(error)) {
                setError('Something went wrong. Please try again.')
                return
            }
            const commonMessage = getCommonErrorMessage(error)
            if (commonMessage) {
                setError(commonMessage)
                return
            }
            if (error.status === 503) {
                setError('Captcha service is currently unavailable. Please try again later.')
            } else {
                setError('Something went wrong. Please, try again later')
            }
        } finally {
            setIsloading(false)
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
                <TurnstileCaptcha shouldExecute={shouldExecute} onSuccess={handleResendOnSuccess} />
                <Button title="Resend Link" variant="primary" onClick={hadleClick} disabled={isLoading} />
            </Notice>
        </>
    )
}
