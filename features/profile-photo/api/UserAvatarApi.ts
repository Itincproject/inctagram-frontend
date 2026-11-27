import { baseApi } from '@/shared/api/baseApi'
import { CreateUserAvatarResponse } from '../model/types'

export const UserAvatarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUserAvatar: builder.mutation<CreateUserAvatarResponse, File>({
            query: (file) => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    url: '/users/me/avatar',
                    method: 'PUT',
                    body: formData,
                }
            },
        }),
        deleteUserAvatar: builder.mutation<void, void>({
            query: () => ({
                url: '/users/me/avatar',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { useCreateUserAvatarMutation, useDeleteUserAvatarMutation } = UserAvatarApi
