import { baseApi } from '@/shared/api/baseApi'

type PasswordResetArgs = {
    email: string
    captchaToken: string
}

export const resetPasswordApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        passwordReset: build.mutation<void, PasswordResetArgs>({
            query: ({ email, captchaToken }) => ({
                url: '/auth/password-recovery',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { email, captchaToken },
            }),
        }),
    }),
})

export const { usePasswordResetMutation } = resetPasswordApi
