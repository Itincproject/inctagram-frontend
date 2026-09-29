'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = 'https://gateway.itincproject.site/api/v1/auth/logout'

export const useLogout = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken')

            await fetch(API_URL, {
                method: 'POST',
                credentials: 'include',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            })
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userEmail')

            closeModal()
            router.push('/sign-in')
        }
    }

    const userEmail = typeof window !== 'undefined'
        ? localStorage.getItem('userEmail') || ''
        : ''

    return {
        isOpen,
        openModal,
        closeModal,
        handleLogout,
        userEmail,
    }
}