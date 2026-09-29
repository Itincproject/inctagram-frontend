'use client'

import { Icon } from '@/shared/ui/Icon/Icon'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { useLogout } from '../model/useLogout'

import styles from './LogoutButton.module.css'

export const LogoutButton = () => {
    const { isOpen, openModal, closeModal, userEmail, handleLogout } = useLogout()

    return (
        <>
            <button className={styles.navItem} onClick={openModal}>
                <Icon name="log-out-outline" size={24} />
                <span>Log Out</span>
            </button>

            <AlertModal
                isOneBtn={false}
                open={isOpen}
                onClose={closeModal}
                onConfirm={handleLogout}
                title="Log Out"
                text="Are you really want to log out of your account"
                email={userEmail}
            />
        </>
    )
}