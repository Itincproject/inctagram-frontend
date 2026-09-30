'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Notice } from '@/shared/ui/Notice'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Inputs/Input'

import styles from './RegistrationConfirmation.module.css'

type FormValues = {
    email: string
}

type Status = 'loading' | 'success' | 'error'

export default function RegistrationConfirmation() {
    const searchParams = useSearchParams()

    const code = searchParams ? searchParams.get('code') : null

    const [status, setStatus] = useState<Status>(
        code ? 'loading' : 'error'
    )

    const confirmRegistration = async (code: string) => {
        return fetch(
            'https://gateway.itincproject.site/api/v1/auth/registration-confirmation',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            }
        )
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onBlur',
    })

    useEffect(() => {
        if (!code) {
            return
        }

        const confirm = async () => {
            try {
                const response = await confirmRegistration(code)

                if (response.status === 204) {
                    setStatus('success')
                    return
                }

                setStatus('error')
            } catch {
                console.log('Network error')
                setStatus('error')
            }
        }

        confirm()
    }, [code])

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch(
                'https://gateway.itincproject.site/api/v1/auth/registration-email-resending',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            if (!response.ok) {
                console.log('Resend failed:', response.status)
            }
        } catch {
            console.log('Network error')
        }
    }

    if (status === 'loading') {
        return (
            <div className={styles.loading}>
                Checking verification link...
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className={styles.container}>
                <Notice
                    title="Congratulations"
                    description="Your email has been confirmed"
                    imageSrc="/congratulations.svg"
                >
                    <Link
                        href="/sign-in"
                        className={styles.signInLink}
                    >
                        Sign In
                    </Link>
                </Notice>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Notice
                title="Email verification link expired"
                description="Looks like the verification link has expired. Not to worry, we can send the link again"
                imageSrc="/link-expired.svg"
            >
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        className={styles.emailInput}
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Epam@epam.com"
                        error={errors.email?.message}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/,
                                message:
                                    'The email must match the format',
                            },
                        })}
                    />

                    <Button
                        title="Resend verification link"
                        type="submit"
                        className={styles.resendLinkButton}
                    />
                </form>
            </Notice>
        </div>
    )
}