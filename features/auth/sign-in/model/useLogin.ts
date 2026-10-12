'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LoginErrors } from './types'
import { useLoginMutation } from '@/features/auth/sign-in/api/loginApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useLogin = () => {
    const router = useRouter()
    const [login, { isLoading }] = useLoginMutation() 

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<LoginErrors>({})

    const validateEmail = (value: string): string | undefined => {
        if (!value.trim()) return 'Email is required'
        if (!EMAIL_REGEX.test(value)) {
            return 'The email must match the format example@example.com'
        }
        return undefined
    }

    const validatePassword = (value: string): string | undefined => {
        if (!value.trim()) return 'Password is required'
        return undefined
    }

    const handleEmailBlur = () => {
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
    }

    const handlePasswordBlur = () => {
        setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)

        setErrors({ email: emailError, password: passwordError })
        if (emailError || passwordError) return

        try {
            const data = await login({
                usernameOrEmail: email,
                password,
            }).unwrap()  
            localStorage.setItem('accessToken', data.accessToken)
            router.push('/profile')
        } catch (err) {

            const error = err as FetchBaseQueryError

            if (error.status === 401) {
                setErrors((prev) => ({
                    ...prev,
                    password: 'The email or password are incorrect. Try again please',
                }))
            } else {
                setErrors((prev) => ({
                    ...prev,
                    password: 'Something went wrong. Please try again.',
                }))
                console.error('Login error:', err)
            }
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        errors,
        isLoading,    
        handleEmailBlur,
        handlePasswordBlur,
        handleSubmit,
    }
}
