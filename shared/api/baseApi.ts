import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gateway.itincproject.site/api/v1',
        prepareHeaders: (headers) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
            }
            return headers
        },
    }),
    endpoints: () => ({}),
})