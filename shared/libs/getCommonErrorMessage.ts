import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getCommonErrorMessage = (error: FetchBaseQueryError): string | null => {
    if (error.status === 'FETCH_ERROR') {
        return 'Network error. Please check your connection and try again'
    }
    if (typeof error.status === 'number') {
        return null
    }
    return 'Something went wrong. Please try again later.'
}
