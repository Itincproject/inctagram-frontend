export type PostsResponse = {
    totalUsers: number
    items: ItemType[]
}

export type ItemType = {
    id: number
    description: string
    createdAt: string
    updatedAt: string
    author: AuthorType
    images: ImageType[]
}

export type AuthorType = {
    id: string
    username: string
}

export type ImageType = {
    id: string
    url: string
    width: number
    height: number
}
