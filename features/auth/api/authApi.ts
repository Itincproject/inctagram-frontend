import { baseApi } from '@/shared/api/baseApi'

export type MeResponse = {
    id: string
    email: string
    username: string
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<MeResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
    }),
})

export const { useGetMeQuery } = authApi