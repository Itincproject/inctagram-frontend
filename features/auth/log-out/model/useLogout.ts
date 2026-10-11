'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '../api/logoutApi'
import { useGetMeQuery } from '@/features/auth/api/authApi'

export const useLogout = () => {
    const router = useRouter()
    const [logout, { isLoading }] = useLogoutMutation()
    const { data: me } = useGetMeQuery()

    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleLogout = async () => {
        try {
            await logout().unwrap()
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            localStorage.removeItem('accessToken')
            closeModal()
            router.push('/sign-in')
        }
    }

    const userEmail = me?.email || ''

    return {
        isOpen,
        openModal,
        closeModal,
        handleLogout,
        userEmail,
        isLoading,
    }
}
