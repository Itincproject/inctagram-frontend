export type RequestBodyProps = {
    newPassword: string
    recoveryCode: string
}

export async function CreateNewPassword({ newPassword, recoveryCode }: RequestBodyProps) {
    const res = await fetch('https://gateway.itincproject.site/api/v1/auth/new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, recoveryCode }),
    })
    if (res.status === 204) return
    if (res.status === 400) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message ?? 'Your recovery code expired or invalid. Please, resend your email')
    }

    throw new Error('Something went wrong. Please try again later')
}
