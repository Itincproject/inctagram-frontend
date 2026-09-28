import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Errors = {
    email?: string
    password?: string
}

const API_URL = 'https://gateway.itincproject.site/api/v1/auth/login'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useLogin = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Errors>({})

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

        const emailError = email.trim() ? undefined : 'Email is required'
        const passwordError = password.trim() ? undefined : 'Password is required'

        setErrors({ email: emailError, password: passwordError })
        if (emailError || passwordError) return

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    usernameOrEmail: email,
                    password: password,
                }),
            })

            if (response.status === 401) {
                setErrors((prev) => ({
                    ...prev,
                    password: 'The email or password are incorrect. Try again please',
                }))
                return
            }

            const data = await response.json()
            localStorage.setItem('accessToken', data.accessToken)
            router.push('/profile')
        } catch (err) {
            console.error('Login error:', err)
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
        handleEmailBlur,
        handlePasswordBlur,
        handleSubmit,
    }
}