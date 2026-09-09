"use client";

import {useState} from "react";
import {Select, SelectOption} from "@/shared/ui/Select/Select";
import styles from "./Header.module.css"

const languageOptions: SelectOption[] = [
    {
        value: 'en',
        label: 'English',
        flag: '/en.png',
    },
    {
        value: 'ru',
        label: 'Русский',
        flag: '/images/flags/ru.png',
    },
];

export const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                Inctagram
            </div>

            <div className={styles.rightControls}>
                {isAuthenticated && (
                    <button
                        type="button"
                        className={styles.notificationButton}
                        aria-label="Уведомления"
                    >
                    </button>
                )}

                <Select
                    options={languageOptions}
                    value={language}
                    onChange={setLanguage}
                    placeholder="Select language"
                    className={styles.languageSelect}
                />

                {!isAuthenticated && (
                    <>
                        <button
                            type="button"
                            className={styles.buttonOutline}
                        >
                            Log in
                        </button>

                        <button
                            type="button"
                            className={styles.buttonPrimary}
                        >
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};