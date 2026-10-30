import { PostsResponse } from '../model/types'

export async function getPosts(): Promise<PostsResponse> {
    console.log('getPosts called')
    const response = await fetch('https://gateway.itincproject.site/api/v1/posts', { next: { revalidate: 60 } })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    return data
}
