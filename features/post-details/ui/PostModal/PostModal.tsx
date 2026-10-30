'use client'

import { Icon } from '@/shared/ui/Icon/Icon'
import s from './PostModal.module.css'
import { useState } from 'react'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { PostCard } from '@/shared/ui/PostCard'
import { User } from '@/shared/ui/User'
import avatar from '@/public/expiredLink.svg'
import { useDeletePostMutation } from '@/features/post/api/PostApi'
import { Alert } from '@/shared/ui/Alert/Alert'

type Props = {
    isOpen: boolean
    onClose: () => void
    postId: number
}
export const PostModal = ({ isOpen, onClose, postId }: Props) => {
    const [deletePost, { isLoading, isSuccess, isError }] = useDeletePostMutation()

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const confirmDelete = async () => {
        try {
            await deletePost(postId).unwrap()
            setShowDeleteModal(false)
            onClose()
        } catch (error) {
            if (error && isFetchBaseQueryError(error)) {
                const messageError = getCommonErrorMessage(error)
                if (messageError) setErrorMessage(messageError)
            }
        }
    }

    const deleteHandler = () => setShowDeleteModal(true)

    const editHandler = () => {}
    const menuItems = [
        { label: 'Edit Post', iconName: 'edit-2-outline', onClick: editHandler },
        { label: 'Delete Post', iconName: 'trash-outline', onClick: deleteHandler },
    ]

    return (
        <>
            {isOpen && (
                <div className={s.overlay}>
                    <div className={s.content}>
                        {/* <PostCard postPhoto={} /> */}
                        <div className={s.post_card}></div>

                        <div>
                            <div className={s.post_header}>
                                <User name="Ivan Ivanov" photo={avatar} />
                                <div className={s.menu_wrapper}>
                                    <button className={s.btn} onClick={() => setOpen((prev) => !prev)}>
                                        <Icon name="more-horizontal" />
                                    </button>
                                    {open && (
                                        <nav className={s.dropdown}>
                                            {menuItems.map((item) => (
                                                <button
                                                    key={item.label}
                                                    className={`${s.menu_item}`}
                                                    onClick={item.onClick}
                                                >
                                                    <Icon name={item.iconName} size={24} />
                                                    <span>{item.label}</span>
                                                </button>
                                            ))}
                                        </nav>
                                    )}
                                </div>
                            </div>
                        </div>
                        {showDeleteModal && (
                            <AlertModal
                                open={showDeleteModal}
                                title="Delete Post"
                                text="Are you sure you want to delete this post?"
                                onClose={() => {
                                    setShowDeleteModal(false)
                                    setOpen(false)
                                }}
                                onConfirm={confirmDelete}
                            />
                        )}
                        <button onClick={onClose} className={s.close_btn}>
                            <Icon name="close-outline" />
                        </button>
                    </div>
                    {errorMessage && <Alert variant="error" message={errorMessage} />}
                </div>
            )}
        </>
    )
}
