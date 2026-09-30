export async function passwordReset({ email, token }: { email: string; token: string }): Promise<void> {
    const res = await fetch('https://gateway.itincproject.site/api/v1/auth/password-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
    })

    if (res.status === 204) return
    if (res.status === 400) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message ?? 'User with this email does not exist')
    }
    throw new Error('Something went wrong. Please try again later')
}
