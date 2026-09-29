'use client'

import { Recaptcha, StatusType } from '@/shared/ui/Recaptcha'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import { useRef, useState } from 'react'

type Props = {
    onSuccess: (token: string) => void
    className: string
}

export const Captcha = ({ onSuccess, className }: Props) => {
    const [status, setStatus] = useState<StatusType>('idle')

    const turnstileRef = useRef<TurnstileInstance | null>(null)

    const executeCaptcha = () => {
        setStatus('loading')
        turnstileRef.current?.execute()
    }

    return (
        <>
            <Recaptcha onClick={executeCaptcha} status={status} className={className} />
            <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ appearance: 'interaction-only', execution: 'execute' }}
                onSuccess={(token) => {
                    setStatus('success')
                    onSuccess(token)
                }}
                onError={() => setStatus('error')}
                onEmptied={() => setStatus('expired')}
            />
        </>
    )
}
