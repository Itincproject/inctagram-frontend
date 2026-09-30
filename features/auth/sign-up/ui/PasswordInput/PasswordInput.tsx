'use client'

import { useState } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import { Input } from '@/shared/ui/Inputs/Input'
import styles from './PasswordInput.module.css'

type PasswordInputProps = {
    id: string
    label: string
    placeholder?: string
    error?: string
    className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const PasswordInput = ({
                                  id,
                                  label,
                                  placeholder,
                                  error,
                                  className,
                                  ...props
                              }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styles.container}>
            <Input
                id={id}
                label={label}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                error={error}
                className={className}
                {...props}
            />

            <button
                type="button"
                className={styles.passwordIcon}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    className={styles.whiteIcon}
                />
            </button>
        </div>
    )
}