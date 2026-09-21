'use client'

import { useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Input } from '@/shared/ui/Inputs/Input'

import styles from './page.module.css'

type Errors = {
    email?: string
    password?: string
}

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Errors>({})

    const handleEmailBlur = () => {
        setErrors((prev) => ({
            ...prev,
            email: email.trim() ? undefined : 'Email is required',
        }))
    }

    const handlePasswordBlur = () => {
        setErrors((prev) => ({
            ...prev,
            password: password.trim() ? undefined : 'Password is required',
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const emailError = email.trim() ? undefined : 'Email is required'
        const passwordError = password.trim()
            ? undefined
            : 'Password is required'

        setErrors({
            email: emailError,
            password: passwordError,
        })

        if (emailError || passwordError) {
            return
        }

        // Backend login will be added later.
    }

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <h1 className={styles.title}>Sign In</h1>

                <div className={styles.socialButtons}>
                    <button
                        type="button"
                        className={styles.socialButton}
                        aria-label="Sign in with Google"
                    >
                        <Icon name="google-svgrepo-com-1" size={36} />
                    </button>

                    <button
                        type="button"
                        className={styles.socialButton}
                        aria-label="Sign in with GitHub"
                    >
                        <Icon
                            name="github-svgrepo-com--3--1"
                            size={36}
                            className={styles.whiteIcon}
                        />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Epam@epam.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            onBlur={handleEmailBlur}
                            error={errors.email}
                        />

                        <div className={styles.passwordField}>
                            <Input
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="**********"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                onBlur={handlePasswordBlur}
                                error={errors.password}
                                className={styles.passwordInput}
                            />

                            <button
                                type="button"
                                className={styles.passwordIcon}
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                aria-label={
                                    showPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                            >
                                <Icon
                                    name={
                                        showPassword
                                            ? 'eye-outline'
                                            : 'eye-off-outline'
                                    }
                                    size={24}
                                    className={styles.whiteIcon}
                                />
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.forgotPassword}
                    >
                        Forgot Password
                    </button>

                    <Button
                        title="Sign In"
                        type="submit"
                        className={styles.signInButton}
                    />

                    <div className={styles.signUp}>
                        <span>Don’t have an account?</span>

                        <button
                            type="button"
                            className={styles.signUpButton}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}