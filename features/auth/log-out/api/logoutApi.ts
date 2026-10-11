import { baseApi } from '@/shared/api/baseApi'

export const logoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { useLogoutMutation } = logoutApi