'use client'

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'
import { useEffect, useRef } from 'react'

type Props = {
    onSuccess: (token: string) => void
    shouldExecute: boolean
}

export const TurnstileCaptcha = ({ onSuccess, shouldExecute }: Props) => {
    const turnstileRef = useRef<TurnstileInstance | null>(null)

    useEffect(() => {
        if (shouldExecute) {
            turnstileRef.current?.execute()
        }
    }, [shouldExecute])

    return (
        <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            options={{ appearance: 'interaction-only', execution: 'execute' }}
            onSuccess={(token) => {
                onSuccess(token)
                turnstileRef.current?.reset()
            }}
        />
    )
}
