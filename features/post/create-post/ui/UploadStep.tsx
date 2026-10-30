import type { ChangeEvent, RefObject } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'

import styles from './CreatePostModal.module.css'

type UploadStepProps = {
    fileInputRef: RefObject<HTMLInputElement | null>
    photos: File[]
    previewUrls: string[]
    error: string | null
    onRequestClose: () => void
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
    onRemovePhoto: (index: number) => void
}

export const UploadStep = ({
    fileInputRef,
    photos,
    previewUrls,
    error,
    onRequestClose,
    onFileChange,
    onRemovePhoto,
}: UploadStepProps) => (
    <>
        <header className={styles.uploadHeader}>
            <h2 id="create-post-title" className={styles.uploadTitle}>
                Add Photo
            </h2>

            <button type="button" className={styles.closeButton} onClick={onRequestClose} aria-label="Close">
                <Icon name="close-outline" size={24} />
            </button>
        </header>

        <div className={`${styles.uploadContent} ${photos.length > 0 ? styles.uploadContentWithPhotos : ''}`}>
            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}

            {photos.length === 0 ? (
                <div className={styles.imagePlaceholder}>
                    <Icon name="image-outline" size={48} />
                </div>
            ) : (
                <div className={styles.previewGrid}>
                    {photos.map((photo, index) => (
                        <div className={styles.previewItem} key={`${photo.name}-${photo.lastModified}-${index}`}>
                            {previewUrls[index] && (
                                <img src={previewUrls[index]} alt={`Selected photo ${index + 1}`} />
                            )}

                            <button
                                type="button"
                                className={styles.removePhotoButton}
                                onClick={() => onRemovePhoto(index)}
                                aria-label={`Remove photo ${index + 1}`}
                            >
                                <Icon name="close-outline" size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <input
                ref={fileInputRef}
                className={styles.fileInput}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                multiple
                onChange={onFileChange}
            />

            <div className={styles.uploadActions}>
                <Button
                    title={photos.length > 0 ? 'Select More Photos' : 'Select from Computer'}
                    type="button"
                    variant="primary"
                    onClick={() => fileInputRef.current?.click()}
                />

                <Button title="Open Draft" type="button" variant="outline" />
            </div>
        </div>
    </>
)
