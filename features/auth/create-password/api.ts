import { baseApi } from '@/shared/api/baseApi'

export type RequestBodyProps = {
    newPassword: string
    recoveryCode: string
}

export const createPasswordApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPassword: build.mutation<void, RequestBodyProps>({
            query: ({ newPassword, recoveryCode }) => ({
                url: '/auth/new-password',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { newPassword, recoveryCode },
            }),
        }),
    }),
})

export const { useCreatePasswordMutation } = createPasswordApi
