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