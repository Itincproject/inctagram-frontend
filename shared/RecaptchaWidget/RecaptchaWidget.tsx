'use client'

import {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react'

import {
    Turnstile,
    type TurnstileInstance,
} from '@marsidev/react-turnstile'

export type RecaptchaWidgetRef = {
    execute: () => void
    reset: () => void
}

type Props = {
    onSuccess: (token: string) => void
    onError: () => void
    onExpired: () => void
}

export const RecaptchaWidget = forwardRef<
    RecaptchaWidgetRef,
    Props
>(function RecaptchaWidget(
    {
        onSuccess,
        onError,
        onExpired,
    },
    ref,
) {
    const turnstileRef =
        useRef<TurnstileInstance | null>(null)

    useImperativeHandle(ref, () => ({
        execute() {
            turnstileRef.current?.execute()
        },

        reset() {
            turnstileRef.current?.reset()
        },
    }))

    return (
        <Turnstile
            ref={turnstileRef}
            siteKey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
            }
            options={{
                size: 'invisible',
                execution: 'execute',
            }}
            onSuccess={onSuccess}
            onError={onError}
            onExpire={onExpired}
        />
    )
})