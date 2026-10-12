'use client'

import { Recaptcha, StatusType } from '@/shared/ui/Recaptcha'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import { forwardRef, useRef, useState, useImperativeHandle } from 'react'

export type Props = {
    onSuccess: (token: string) => void
    className: string
}
export type CaptchaRef = {
    resetCaptcha: () => void
}

export const Captcha = forwardRef<CaptchaRef, Props>(({ onSuccess, className }, ref) => {
    const [status, setStatus] = useState<StatusType>('idle')

    const turnstileRef = useRef<TurnstileInstance | null>(null)

    const executeCaptcha = () => {
        setStatus('loading')
        turnstileRef.current?.execute()
    }
    const resetCaptcha = () => {
        setStatus('idle')
        turnstileRef.current?.reset()
    }
    useImperativeHandle(ref, () => ({
        resetCaptcha,
    }))

    return (
        <>
            <Recaptcha onClick={executeCaptcha} status={status} className={className} />
            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ appearance: 'interaction-only', execution: 'execute', retry: 'never' }}
                onSuccess={(token) => {
                    setStatus('success')
                    onSuccess(token)
                }}

                onError={() => {
                    setStatus('error')
                }}
                onExpire={() => {
                    setStatus('expired')
                }}
            />
        </>
    )
})
Captcha.displayName = 'Captcha'
