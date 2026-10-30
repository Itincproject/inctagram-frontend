import { baseApi } from '@/shared/api/baseApi'
import type { CreatePostRequest, CreatePostResponse, UploadPostImageResponse } from './postApi.types'

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Upload post image
        uploadPostImage: builder.mutation<UploadPostImageResponse, File>({
            query: (file) => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    url: '/posts/images',
                    method: 'POST',
                    body: formData,
                }
            },
        }),

        // Create post
        createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
        }),

        // Delete post
        deletePost: builder.mutation<void, number>({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
})

export const { useUploadPostImageMutation, useCreatePostMutation, useDeletePostMutation } = postApi
