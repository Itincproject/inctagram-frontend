
import { baseApi } from '@/shared/api/baseApi'
import type {
    CreatePostRequest,
    CreatePostResponse,
    GetPostsByUserIdResponse,
    UploadPostImageResponse
} from './postApi.types'

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get posts by user ID (Infinite Query)
        getPostsByUserId: builder.infiniteQuery<
            GetPostsByUserIdResponse,
            { userId: string },
            string | undefined
        >({
            query: ({ queryArg, pageParam }) => ({
                url: `/users/${queryArg.userId}/posts`,
                method: 'GET',
                params: {
                    cursor: pageParam,
                },
            }),

            infiniteQueryOptions: {
                initialPageParam: undefined,

                getNextPageParam: (lastPage) => {
                    return lastPage.nextCursor || undefined
                },
            },
            providesTags: (result, error, { userId }) => [
                { type: 'Post', id: userId },
                ...(result?.pages.flatMap(page =>
                    page.items.map(post => ({ type: 'Post' as const, id: post.id }))
                ) ?? []),
            ],
        }),

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
            invalidatesTags: ['Post'],
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

export const {
    useUploadPostImageMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetPostsByUserIdInfiniteQuery,
} = postApi
