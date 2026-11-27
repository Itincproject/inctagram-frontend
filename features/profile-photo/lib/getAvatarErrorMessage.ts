import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getAvatarErrorMessage = (error: FetchBaseQueryError): string | null => {
    if (typeof error.status !== 'number') {
        return null
    }

    switch (error.status) {
        case 401:
            return 'Your session has expired or you are not authorized. Please sign in again.'

        case 413:
            return 'The image size must not exceed 10 MB.'

        case 415:
            return 'The uploaded image must be in JPEG or PNG format.'

        case 429:
            return 'Your photo cannot be uploaded right now. Please try again in 5 seconds.'

        default:
            return null
    }
}
