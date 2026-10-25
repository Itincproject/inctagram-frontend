import { baseApi } from '@/shared/api/baseApi'

export type UploadPostImageResponse = {
    uploadId: string
    contentType: string
    size: number
    width: number
    height: number
    expiresAt: string
}

export type CreatePostRequest = {
    description: string
    imageIds: string[]
}

export type CreatePostResponse = {
    id: number
    description: string
    createdAt: string
    updatedAt: string
    author: {
        id: string
        username: string
    }
    images: {
        id: string
        url: string
        width: number
        height: number
    }[]
}

export const createPostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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

        createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useUploadPostImageMutation, useCreatePostMutation } = createPostApi
