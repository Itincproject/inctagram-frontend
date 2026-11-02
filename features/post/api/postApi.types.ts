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
    author: author
    images: image []
}

export type image = {
    id: string
    url: string
    width: number
    height: number
}

export type author = {
    id: string
    username: string
}

export type Post = {
    id: number
    description: string
    createdAt: string
    updatedAt: string
    author: author
    images: image[]
}

export type GetPostByIdResponse = Post

export type GetPostsByUserIdRequest = {
    userId: string
    cursor?: string
}

export type GetPostsByUserIdResponse = {
    items: {
        id: number
        description: string
        createdAt: string
        updatedAt: string
        author: author
        images: image []
    } []
    nextCursor: string
}