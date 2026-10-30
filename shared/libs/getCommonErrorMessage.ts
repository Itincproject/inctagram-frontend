import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getCommonErrorMessage = (error: FetchBaseQueryError): string | null => {
    if (error.status === 'FETCH_ERROR') {
        return 'Network error. Please check your connection and try again'
    }

    if (error.status === 'TIMEOUT_ERROR' || error.status === 504) {
        return 'The server took too long to respond. Please try again later.'
    }

    if (error.status === 'PARSING_ERROR') {
        return 'Something went wrong while processing the server response.'
    }

    if (typeof error.status === 'number' && error.status >= 500 && error.status <= 599) {
        return 'Something went wrong on the server. Please try again later.'
    }

    if (error.status === 'CUSTOM_ERROR') {
        return 'Something went wrong. Please try again later.'
    }

    return null
}
