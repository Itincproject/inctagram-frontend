'use client'

import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Input } from '@/shared/ui/Inputs/Input'
import styles from './page.module.css'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState } from 'react'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { PasswordInput } from '@/features/auth/sign-up/ui/PasswordInput/PasswordInput'

type FormValues = {
    username: string
    email: string
    password: string
    passwordConfirmation: string
}

export default function SignUp() {
    const [isAgreed, setIsAgreed] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const {
        register,
        getValues,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        mode: 'onBlur',
    })
    console.log({
        isValid,
        errors,
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const res = await fetch('https://gateway.itincproject.site/api/v1/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (res.status === 400) {
                setError('username', {
                    message: 'User with this username is already registered',
                })
                return
            }

            if (res.status === 204) {
                setShowModal(true)
            }

            return
        } catch {
            console.log('Network error')
        }
    }

    return (
        <>
            <AlertModal
                open={showModal}
                title="Email sent"
                text="We have sent a link to confirm your email to"
                email={getValues('email')}
                isOneBtn={true}
                onClose={() => {
                    setShowModal(false)
                    reset()
                }}
            />

            <main className={styles.page}>
                <section className={styles.card}>
                    <h1 className={styles.title}>Sign Up</h1>

                    <div className={styles.socialButtons}>
                        <button type="button" className={styles.socialButton} aria-label="Sign in with Google">
                            <Icon name="google-svgrepo-com-1" size={36} />
                        </button>

                        <button type="button" className={styles.socialButton} aria-label="Sign in with GitHub">
                            <Icon name="github-svgrepo-com--3--1" size={36} className={styles.whiteIcon} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.fields}>
                            <div className={styles.inputField}>
                                <Input
                                    id="username"
                                    label="Username"
                                    type="text"
                                    placeholder="Epam11"
                                    error={errors.username?.message}
                                    {...register('username', {
                                        required: true,
                                        minLength: { value: 6, message: 'Minimum number of characters 6' },
                                        maxLength: {
                                            value: 29,
                                            message: 'Maximum number of characters 30',
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9_-еаорсхк АВЕКМНОРСТХ]+$/,
                                            message: 'Username must contain a-z, A-Z, 0-9, _ -',
                                        },
                                    })}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <Input
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="Epam@epam.com"
                                    error={errors.email?.message}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/,
                                            message: 'The email must match the format',
                                        },
                                    })}
                                />
                            </div>

                            <div className={styles.passwordField}>
                                <PasswordInput
                                    id="password"
                                    label="Password"
                                    placeholder="**********"
                                    error={errors.password?.message}
                                    {...register('password', {
                                        required: true,
                                        minLength: { value: 7, message: 'Minimum number of characters 6' },
                                        maxLength: {
                                            value: 20,
                                            message: 'Maximum number of characters 20',
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
                                            message:
                                                'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
                                        },
                                    })}
                                />
                            </div>

                            <div className={styles.passwordConfirmField}>
                                <PasswordInput
                                    id="password-confirmation"
                                    label="Password confirmation"
                                    placeholder="Password confirmation"
                                    error={errors.passwordConfirmation?.message}
                                    {...register('passwordConfirmation', {
                                        required: true,
                                        validate: (value) =>
                                            value === getValues('password') || 'The passwords must match',
                                    })}
                                />
                            </div>
                        </div>

                        <div className={styles.agreements}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />
                            <p className={styles.agreementsText}>
                                I agree to the{' '}
                                <Link href="/terms-of-service" className={styles.checkboxLink}>
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy-policy" className={styles.checkboxLink}>
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        <Button
                            title="Sign Up"
                            type="submit"
                            className={styles.signUpButton}
                            disabled={
                                (!isValid || !isAgreed) &&
                                (!isAgreed ||
                                    !(
                                        getValues('password') === getValues('passwordConfirmation') &&
                                        getValues('password') !== ''
                                    ))
                            }
                        />

                        <div className={styles.signIn}>
                            <span>Do you have an account?</span>

                            <Link href="/sign-in" className={styles.signInLink}>
                                Sign In
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}
