'use client'

import { Icon } from '@/shared/ui/Icon/Icon'
import { useState } from 'react'

import styles from './Alert.module.css'

type AlertProps = {
    variant: 'error' | 'success'
    message: string
}

export const Alert = ({ variant, message }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) {
        return null
    }

    return (
        <div className={`${styles.alert} ${styles[variant]}`}>
      <span className={styles.message}>
        {variant === 'error' && <strong>Error!</strong>}
          {variant === 'error' && ' '}
          {message}
      </span>

            <button
                className={styles.close}
                type="button"
                onClick={() => setIsVisible(false)}
                aria-label="Close alert"
            >
                <Icon name="close" size={24} />
            </button>
        </div>
    )
}
