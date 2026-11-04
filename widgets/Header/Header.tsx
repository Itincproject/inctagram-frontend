'use client'

import { useState } from 'react'
import { Select, SelectOption } from '@/shared/ui/Select/Select'
import styles from './Header.module.css'
import { useRouter } from 'next/navigation'
import {selectIsLoggedIn} from "@/app/providers/app-slice";
import {useAppSelector} from "@/app/providers/useAppSelector";

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

export const Header = () => {
    const [language, setLanguage] = useState('en')

    const isLoggedIn = useAppSelector(selectIsLoggedIn)


    const router = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Inctagram</div>

            <div className={styles.rightControls}>
                {isLoggedIn && (
                    <button type="button" className={styles.notificationButton} aria-label="Уведомления"></button>
                )}

                <Select
                    options={languageOptions}
                    value={language}
                    onChange={setLanguage}
                    placeholder="Select language"
                    className={styles.languageSelect}
                />

                {!isLoggedIn && (
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
