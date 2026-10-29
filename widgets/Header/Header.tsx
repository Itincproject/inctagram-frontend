'use client'

import { useState } from 'react'
import { Select, SelectOption } from '@/shared/ui/Select/Select'
import styles from './Header.module.css'
import { useRouter } from 'next/navigation'

const languageOptions: SelectOption[] = [
    {
        value: 'en',
        label: 'English',
        flag: 'Flag-United-Kingdom',
    },
    {
        value: 'ru',
        label: 'Русский',
        flag: 'Flag-Russia',
    },
]
type Prop = {
    isAuth: boolean
}
export const Header = ({ isAuth }: Prop) => {
    const [language, setLanguage] = useState('en')

    const router = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Inctagram</div>

            <div className={styles.rightControls}>
                {isAuth && (
                    <button type="button" className={styles.notificationButton} aria-label="Уведомления"></button>
                )}

                <Select
                    options={languageOptions}
                    value={language}
                    onChange={setLanguage}
                    placeholder="Select language"
                    className={styles.languageSelect}
                />

                {!isAuth && (
                    <>
                        <button type="button" className={styles.buttonOutline} onClick={() => router.push('/sign-in')}>
                            Log in
                        </button>

                        <button type="button" className={styles.buttonPrimary} onClick={() => router.push('/sign-up')}>
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}
