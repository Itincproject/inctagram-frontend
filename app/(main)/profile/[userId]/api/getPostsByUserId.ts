import { GetPostsByUserIdResponse } from '@/features/post/api/postApi.types'

export const getPostsByUserId = async (userId: string): Promise<GetPostsByUserIdResponse> => {
    const res = await fetch(`https://gateway.itincproject.site/api/v1/users/${userId}/posts`)
    if (!res.ok) {
        throw new Error('Failed to fetch user posts')
    }
    const data: GetPostsByUserIdResponse = await res.json()
    return data
}
