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
    author: Author
    images: Image[]
}

export type Image = {
    id: string
    url: string
    width: number
    height: number
}

export type Author = {
    id: string
    username: string
}

export type Post = {
    id: number
    description: string
    createdAt: string
    updatedAt: string
    author: Author
    images: Image[]
}

export type GetPostByIdResponse = Post

export type GetPostsByUserIdRequest = {
    userId: string
    cursor?: string
}

export type GetPostsByUserIdResponse = {
    items: Post[]
    nextCursor: string
}
