import type { LoginRequest, LoginResponse } from '@/features/auth/sign-in/model/types'
import { baseApi } from '@/shared/api/baseApi'
import { SignUpRequest } from '@/app/(auth)/sign-up/page'

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
        signUp: builder.mutation<void, SignUpRequest>({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data,
            }),
        }),
        confirmRegistration: builder.mutation<void, string>({
            query: (data) => ({
                url: '/auth/registration-confirmation',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useLoginMutation, useSignUpMutation, useConfirmRegistrationMutation } = loginApi
