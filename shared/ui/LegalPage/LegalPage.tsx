import Link from 'next/link'
import { Icon } from '@/shared/ui/Icon/Icon'
import styles from './LegalPage.module.css'
import { ReactNode } from 'react'

type LegalPageProps = {
    title: string
    children: ReactNode
}

export const LegalPage = ({ title, children }: LegalPageProps) => {
    return (
        <main>
            <section className={styles.container} aria-labelledby="legal-page-title">
                <Link
                    href="/sign-up"
                    className={styles.backLink}
                    aria-label="Back to Sign up"
                >
                    <Icon
                        name="arrow-back-outline"
                        size={24}
                        className={styles.whiteIcon}
                        aria-hidden="true"
                    />

                    <span className={styles.buttonText}>
                        Back to Sign up
                    </span>
                </Link>

                <div className={styles.textBlock}>
                    <h1
                        id="legal-page-title"
                        className={styles.textHeader}
                    >
                        {title}
                    </h1>

                    <div className={styles.textContent}>
                        {children}
                    </div>
                </div>
            </section>
        </main>
    )
}

