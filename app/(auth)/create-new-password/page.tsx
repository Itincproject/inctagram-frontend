import { CreateNewPasswordForm } from '@/features/auth/create-password/ui/CreateNewPasswordForm'
import styles from './page.module.css'
import { ResetPasswordScreen } from './ResetPasswordScreen'

type Props = {
    searchParams: Promise<{ recoveryCode: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
    const { recoveryCode } = await searchParams

    return <ResetPasswordScreen code={recoveryCode} />
}
