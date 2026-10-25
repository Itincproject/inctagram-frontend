'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useCreatePostMutation, useUploadPostImageMutation } from '../api/createPostApi'

import {
    ALLOWED_EXTENSIONS,
    ALLOWED_TYPES,
    createInitialPhotoEdit,
    MAX_FILE_SIZE,
    MAX_PHOTOS,
} from '../model/constants'
import type { PhotoEdit, Step } from '../model/types'
import { usePhotoCrop } from '../model/hooks/usePhotoCrop'

import { CloseConfirmationModal } from './CloseConfirmationModal'
import { CropStep } from './CropStep'
import { PublicationStep } from './PublicationStep'
import styles from './CreatePostModal.module.css'
import { UploadStep } from './UploadStep'

type CreatePostModalProps = {
    onClose: () => void
    onNext?: (photos: File[]) => void
}

export const CreatePostModal = ({ onClose, onNext }: CreatePostModalProps) => {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const activeThumbnailRef = useRef<HTMLDivElement>(null)
    const previewUrlsRef = useRef<Set<string>>(new Set())
    const publicationUrlsRef = useRef<Set<string>>(new Set())

    const [step, setStep] = useState<Step>('upload')
    const [photos, setPhotos] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [photoEdits, setPhotoEdits] = useState<PhotoEdit[]>([])
    const [activePhotoIndex, setActivePhotoIndex] = useState(0)
    const [publicationPhotos, setPublicationPhotos] = useState<File[]>([])
    const [uploadedImageIds, setUploadedImageIds] = useState<Array<string | null>>([])
    const [publicationUrls, setPublicationUrls] = useState<string[]>([])
    const [publicationPhotoIndex, setPublicationPhotoIndex] = useState(0)
    const [publicationDescription, setPublicationDescription] = useState('')
    const [publicationLocation, setPublicationLocation] = useState('')
    const [showZoomControl, setShowZoomControl] = useState(false)
    const [showAspectRatioPicker, setShowAspectRatioPicker] = useState(false)
    const [showPhotoPicker, setShowPhotoPicker] = useState(false)
    const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadPostImage] = useUploadPostImageMutation()
    const [createPost] = useCreatePostMutation()
    const {
        activePhotoEdit,
        activePreviewUrl,
        activeImageAspectRatio,
        activeCropAspectRatio,
        cropViewportSize,
        cropStageRef,
        updateActivePhotoEdit,
        handleAspectRatioSelect,
        handleWheelZoom,
        createCroppedPhotos,
    } = usePhotoCrop({
        photos,
        previewUrls,
        photoEdits,
        activePhotoIndex,
        setPhotoEdits,
        isCropStep: step === 'crop',
    })

    useEffect(() => {
        return () => {
            previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
            publicationUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
            previewUrlsRef.current.clear()
            publicationUrlsRef.current.clear()
        }
    }, [])

    useEffect(() => {
        if (!showPhotoPicker || !activeThumbnailRef.current) return
        activeThumbnailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, [activePhotoIndex, previewUrls.length, showPhotoPicker])

    const handleRequestClose = () => setShowCloseConfirmation(true)
    const handleCancelClose = () => setShowCloseConfirmation(false)

    const handleClose = () => {
        setShowCloseConfirmation(false)
        previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
        publicationUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
        previewUrlsRef.current.clear()
        publicationUrlsRef.current.clear()
        setStep('upload')
        setPhotos([])
        setPreviewUrls([])
        setPhotoEdits([])
        setActivePhotoIndex(0)
        setPublicationPhotos([])
        setUploadedImageIds([])
        setPublicationUrls([])
        setPublicationPhotoIndex(0)
        setPublicationDescription('')
        setPublicationLocation('')
        setShowZoomControl(false)
        setShowAspectRatioPicker(false)
        setShowPhotoPicker(false)
        setError(null)
        onClose()
    }

    const handleSaveDraft = () => {
        handleClose()
        router.push('/profile')
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files ?? [])
        event.target.value = ''
        if (selectedFiles.length === 0) return

        if (photos.length + selectedFiles.length > MAX_PHOTOS) {
            setError(`You can upload up to ${MAX_PHOTOS} photos.`)
            return
        }

        const invalidType = selectedFiles.find((file) => {
            const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
            return !ALLOWED_EXTENSIONS.includes(extension) || (file.type !== '' && !ALLOWED_TYPES.includes(file.type))
        })
        if (invalidType) {
            setError('The photo must be in JPEG or PNG format.')
            return
        }

        if (selectedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
            setError('The photo must be no larger than 20 MB.')
            return
        }

        const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file))
        newPreviewUrls.forEach((url) => previewUrlsRef.current.add(url))
        setPhotos((current) => [...current, ...selectedFiles])
        setPreviewUrls((current) => [...current, ...newPreviewUrls])
        setPhotoEdits((current) => [...current, ...selectedFiles.map(() => createInitialPhotoEdit())])
        setActivePhotoIndex((current) => Math.min(current, photos.length + selectedFiles.length - 1))
        setStep('crop')
        setShowZoomControl(false)
        setError(null)
    }

    const handleRemovePhoto = (index: number) => {
        const url = previewUrls[index]
        if (url) {
            URL.revokeObjectURL(url)
            previewUrlsRef.current.delete(url)
        }

        const remainingPhotos = photos.filter((_, photoIndex) => photoIndex !== index)
        setPhotos(remainingPhotos)
        setPreviewUrls((current) => current.filter((_, photoIndex) => photoIndex !== index))
        setPhotoEdits((current) => current.filter((_, photoIndex) => photoIndex !== index))
        setActivePhotoIndex((current) => {
            if (remainingPhotos.length === 0) return 0
            if (index < current) return current - 1
            return Math.min(current, remainingPhotos.length - 1)
        })
        setError(null)
    }

    const handleNext = async () => {
        if (photos.length === 0 || isProcessing) return
        setIsProcessing(true)
        setError(null)

        try {
            const croppedPhotos = await createCroppedPhotos()

            publicationUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
            publicationUrlsRef.current.clear()
            const nextPublicationUrls = croppedPhotos.map((photo) => URL.createObjectURL(photo))
            nextPublicationUrls.forEach((url) => publicationUrlsRef.current.add(url))
            setPublicationPhotos(croppedPhotos)
            setUploadedImageIds(Array.from({ length: croppedPhotos.length }, () => null))
            setPublicationUrls(nextPublicationUrls)
            setPublicationPhotoIndex(0)
            setStep('publication')
            setShowZoomControl(false)
            setShowAspectRatioPicker(false)
            setShowPhotoPicker(false)
        } catch {
            setError('Could not process the photos. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handlePhotoNavigation = (index: number) => {
        if (index < 0 || index >= photos.length || index === activePhotoIndex) return
        setActivePhotoIndex(index)
        setShowZoomControl(false)
        setShowAspectRatioPicker(false)
        setError(null)
    }

    const handlePublicationBack = () => {
        setStep('crop')
        setUploadedImageIds([])
        setActivePhotoIndex(Math.min(publicationPhotoIndex, photos.length - 1))
    }

    const handlePublicationPublish = async () => {
        if (publicationPhotos.length === 0 || isProcessing) return

        setIsProcessing(true)
        setError(null)

        try {
            const imageIds = [...uploadedImageIds]

            // Загружаем фотографии последовательно,
            // чтобы не превышать лимит активных загрузок.
            for (const [index, photo] of publicationPhotos.entries()) {
                if (imageIds[index]) continue

                const uploadedImage = await uploadPostImage(photo).unwrap()
                imageIds[index] = uploadedImage.uploadId
                setUploadedImageIds([...imageIds])
            }

            await createPost({
                description: publicationDescription,
                imageIds: imageIds as string[],
            }).unwrap()

            onNext?.(publicationPhotos)
            handleClose()
        } catch {
            setError('Could not publish the post. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div
            className={styles.overlay}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) handleRequestClose()
            }}
        >
            <section
                className={`${styles.modal} ${
                    step === 'crop' ? styles.cropModal : step === 'publication' ? styles.publicationModal : ''
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-post-title"
            >
                {step === 'upload' && (
                    <UploadStep
                        fileInputRef={fileInputRef}
                        photos={photos}
                        previewUrls={previewUrls}
                        error={error}
                        onRequestClose={handleRequestClose}
                        onFileChange={handleFileChange}
                        onRemovePhoto={handleRemovePhoto}
                    />
                )}

                {step === 'crop' && (
                    <CropStep
                        fileInputRef={fileInputRef}
                        activeThumbnailRef={activeThumbnailRef}
                        cropStageRef={cropStageRef}
                        photos={photos}
                        previewUrls={previewUrls}
                        activePhotoIndex={activePhotoIndex}
                        activePhotoEdit={activePhotoEdit}
                        activePreviewUrl={activePreviewUrl}
                        activeCropAspectRatio={activeCropAspectRatio}
                        activeImageAspectRatio={activeImageAspectRatio}
                        cropViewportSize={cropViewportSize}
                        showZoomControl={showZoomControl}
                        showAspectRatioPicker={showAspectRatioPicker}
                        showPhotoPicker={showPhotoPicker}
                        isProcessing={isProcessing}
                        error={error}
                        onBack={handleRequestClose}
                        onNext={handleNext}
                        onWheelZoom={handleWheelZoom}
                        onCropChange={(crop) => updateActivePhotoEdit({ crop })}
                        onZoomChange={(zoom) => updateActivePhotoEdit({ zoom })}
                        onCropComplete={(croppedAreaPixels) => updateActivePhotoEdit({ croppedAreaPixels })}
                        onToggleAspectRatio={() => {
                            setShowAspectRatioPicker((value) => !value)
                            setShowZoomControl(false)
                        }}
                        onAspectRatioSelect={handleAspectRatioSelect}
                        onToggleZoom={() => setShowZoomControl((value) => !value)}
                        onTogglePhotoPicker={() => setShowPhotoPicker((value) => !value)}
                        onPhotoNavigation={handlePhotoNavigation}
                        onRemovePhoto={handleRemovePhoto}
                        onZoomSliderChange={(zoom) => updateActivePhotoEdit({ zoom })}
                        onAddPhoto={() => fileInputRef.current?.click()}
                        onFileChange={handleFileChange}
                    />
                )}

                {step === 'publication' && (
                    <>
                        {error && (
                            <p className={styles.error} role="alert">
                                {error}
                            </p>
                        )}

                        <PublicationStep
                            publicationUrls={publicationUrls}
                            publicationPhotoIndex={publicationPhotoIndex}
                            publicationDescription={publicationDescription}
                            publicationLocation={publicationLocation}
                            isPublishing={isProcessing}
                            onBack={handlePublicationBack}
                            onPublish={handlePublicationPublish}
                            onPhotoIndexChange={setPublicationPhotoIndex}
                            onDescriptionChange={setPublicationDescription}
                            onLocationChange={setPublicationLocation}
                        />
                    </>
                )}
            </section>

            {showCloseConfirmation && (
                <CloseConfirmationModal onCancel={handleCancelClose} onSaveDraft={handleSaveDraft} />
            )}
        </div>
    )
}
