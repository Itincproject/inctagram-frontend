import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    if (typeof error !== 'object' || error === null || !('status' in error)) {
        return false
    }
    const status = error.status

    return (
        typeof status === 'number' ||
        status === 'FETCH_ERROR' ||
        status === 'PARSING_ERROR' ||
        status === 'TIMEOUT_ERROR' ||
        status === 'CUSTOM_ERROR'
    )
}
