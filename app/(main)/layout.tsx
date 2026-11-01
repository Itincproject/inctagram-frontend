import { Header } from '@/widgets/Header/Header'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'
import styles from './MainLayout.module.css'

export default function MainLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className={styles.layout}>
            <Header />

            <Sidebar />

            <main className={styles.main}>{children}</main>
        </div>
    )
}
