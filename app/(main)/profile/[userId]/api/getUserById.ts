import { User } from '@/shared/model/types/userApi.types'

export const getUserById = async (userId: string): Promise<User> => {
    const res = await fetch(`https://gateway.itincproject.site/api/v1/users/${userId}`)

    if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status}`)
    }
    const data = await res.json()
    return data
}
