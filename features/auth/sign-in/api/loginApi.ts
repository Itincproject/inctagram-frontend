import type { LoginRequest, LoginResponse } from '@/features/auth/sign-in/model/types'
import { baseApi } from '@/shared/api/baseApi'

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
        }),
    }),
})

export const { useLoginMutation } = loginApi