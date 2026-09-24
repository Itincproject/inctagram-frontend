import { Header } from '@/widgets/Header/Header'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
