'use client'

import { Icon } from '@/shared/ui/Icon/Icon'
import s from './PostModal.module.css'
import { useState } from 'react'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'
import { User } from '@/shared/ui/User'
import avatar from '@/public/expiredLink.svg'
import { useDeletePostMutation, useGetPostByIdQuery, useEditPostMutation } from '@/features/post/api/PostApi'
import { Alert } from '@/shared/ui/Alert/Alert'
import { Button } from '@/shared/ui/Button/Button'
import { TextArea } from '@/shared/ui/TextArea/TextArea'

type Props = {
    isOpen: boolean
    onClose: () => void
    postId: number
}

const CONFIRM_TEXT = 'Do you really want to finish editing? If you close the changes you have made will not be saved'

export const PostModal = ({ isOpen, onClose, postId }: Props) => {
    const { data: post } = useGetPostByIdQuery(postId, { skip: !isOpen })
    const [deletePost] = useDeletePostMutation()
    const [editPost, { isLoading: isSaving }] = useEditPostMutation()

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState('')
    const [showConfirmClose, setShowConfirmClose] = useState(false)

    const isDirty = post ? editValue.trim() !== post.description.trim() : false

    const startEditing = () => {
        setOpen(false)
        setEditValue(post?.description ?? '')
        setIsEditing(true)
    }

    const cancelEditing = () => {
        if (isSaving) return
        if (!isDirty) {
            setIsEditing(false)
        } else {
            setShowConfirmClose(true)
        }
    }

    const handleSave = async () => {
        if (!editValue.trim() || editValue.length > 500) return 
        
        if (!isDirty) {
            setIsEditing(false)
            return
        }

        try {
            await editPost({ postId, description: editValue.trim() }).unwrap()
            setIsEditing(false)
        } catch (e) {
            console.error(e)
        }
    }

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

    const menuItems = [
        { label: 'Edit Post', iconName: 'edit-2-outline', onClick: startEditing },
        { label: 'Delete Post', iconName: 'trash-outline', onClick: deleteHandler },
    ]

    if (!isOpen) return null

    return (
        <div className={s.overlay} onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                if (isEditing) cancelEditing()
                else onClose()
            }
        }}>
            <div className={s.content}>
                
                {!isEditing && (
                    <div className={s.view_layout}>
                        <div className={s.post_card}>
                            {post?.images?.map(img => (
                                <img key={img.id} src={img.url} alt="Post image" />
                            ))}
                        </div>
                        <div className={s.view_info}>
                            <div className={s.header_inside}>
                                <User name={post?.author?.username ?? 'IVAN IVANOV'} photo={avatar} />
                                <div className={s.menu_wrapper}>
                                    <button className={s.btn} onClick={() => setOpen((prev) => !prev)}>
                                        <Icon name="more-horizontal" />
                                    </button>
                                    {open && (
                                        <nav className={s.dropdown}>
                                            {menuItems.map((item) => (
                                                <button key={item.label} className={s.menu_item} onClick={item.onClick}>
                                                    <Icon name={item.iconName} size={24} />
                                                    <span>{item.label}</span>
                                                </button>
                                            ))}
                                        </nav>
                                    )}
                                </div>
                            </div>
                            <p className={s.description}>{post?.description ?? ''}</p>
                        </div>
                    </div>
                )}

                {isEditing && (
                    <div className={s.edit_layout}>
                        <div className={s.modal_header}>
                            <span className={s.edit_title}>Edit Post</span>
                            <button onClick={cancelEditing} className={s.btn} disabled={isSaving}>
                                <Icon name="close-outline" />
                            </button>
                        </div>
                        <div className={s.edit_body}>
                            <div className={s.post_card}>
                                {post?.images?.map(img => (
                                    <img key={img.id} src={img.url} alt="Post image" />
                                ))}
                            </div>
                            
                            <div className={s.edit_right_column}>
                                <div className={s.edit_author}>
                                    <User name={post?.author?.username ?? 'IVAN IVANOV'} photo={avatar} />
                                </div>

                                <div className={s.edit_container}>
                                    <TextArea
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        disabled={isSaving}
                                        autoFocus
                                        label="Add publication descriptions"
                                        maxLength={500}
                                    />
                                    <div className={s.counter}>{editValue.length}/500</div>
                                    <div className={s.edit_footer}>
                                        <Button 
                                            title={isSaving ? 'Saving...' : 'Save Changes'}
                                            variant="primary"
                                            onClick={handleSave}
                                            disabled={isSaving || !editValue.trim()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
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

                {showConfirmClose && (
                    <AlertModal
                        open={showConfirmClose}
                        title="Finish editing?"
                        text={CONFIRM_TEXT}
                        onClose={() => setShowConfirmClose(false)}
                        onConfirm={() => {
                            setShowConfirmClose(false)
                            setIsEditing(false)
                        }}
                    />
                )}
                
                {!isEditing && (
                    <button onClick={onClose} className={s.close_btn}>
                        <Icon name="close-outline" />
                    </button>
                )}
            </div>
            {errorMessage && <Alert variant="error" message={errorMessage} />}
        </div>
    )
}