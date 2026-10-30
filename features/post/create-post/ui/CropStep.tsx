import dynamic from 'next/dynamic'
import type { ChangeEvent, CSSProperties, RefObject, WheelEvent } from 'react'

import { Icon } from '@/shared/ui/Icon/Icon'

import {
    ASPECT_RATIOS,
    ASPECT_RATIO_LABELS,
} from '../model/constants'
import type { AspectRatio, PhotoEdit } from '../model/types'

import styles from './CreatePostModal.module.css'

const Cropper = dynamic(() => import('react-easy-crop'), { ssr: false })

type CropStepProps = {
    fileInputRef: RefObject<HTMLInputElement | null>
    activeThumbnailRef: RefObject<HTMLDivElement | null>
    cropStageRef: RefObject<HTMLDivElement | null>
    photos: File[]
    previewUrls: string[]
    activePhotoIndex: number
    activePhotoEdit: PhotoEdit
    activePreviewUrl?: string
    activeCropAspectRatio: number
    activeImageAspectRatio: number
    cropViewportSize: { width: number; height: number }
    showZoomControl: boolean
    showAspectRatioPicker: boolean
    showPhotoPicker: boolean
    isProcessing: boolean
    error: string | null
    onBack: () => void
    onNext: () => void
    onWheelZoom: (event: WheelEvent<HTMLDivElement>) => void
    onCropChange: (crop: { x: number; y: number }) => void
    onZoomChange: (zoom: number) => void
    onCropComplete: (area: { x: number; y: number; width: number; height: number }) => void
    onToggleAspectRatio: () => void
    onAspectRatioSelect: (ratio: AspectRatio) => void
    onToggleZoom: () => void
    onTogglePhotoPicker: () => void
    onPhotoNavigation: (index: number) => void
    onRemovePhoto: (index: number) => void
    onZoomSliderChange: (zoom: number) => void
    onAddPhoto: () => void
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CropStep = ({
    fileInputRef,
    activeThumbnailRef,
    cropStageRef,
    photos,
    previewUrls,
    activePhotoIndex,
    activePhotoEdit,
    activePreviewUrl,
    activeCropAspectRatio,
    activeImageAspectRatio,
    cropViewportSize,
    showZoomControl,
    showAspectRatioPicker,
    showPhotoPicker,
    isProcessing,
    error,
    onBack,
    onNext,
    onWheelZoom,
    onCropChange,
    onZoomChange,
    onCropComplete,
    onToggleAspectRatio,
    onAspectRatioSelect,
    onToggleZoom,
    onTogglePhotoPicker,
    onPhotoNavigation,
    onRemovePhoto,
    onZoomSliderChange,
    onAddPhoto,
    onFileChange,
}: CropStepProps) => (
    <>
        <header className={styles.cropHeader}>
            <button type="button" className={styles.backButton} onClick={onBack} aria-label="Back to photo selection">
                <Icon name="arrow-ios-back" size={24} />
            </button>

            <h2 id="create-post-title" className={styles.cropTitle}>
                Cropping
            </h2>

            <button type="button" className={styles.nextButton} onClick={onNext} disabled={isProcessing}>
                {isProcessing ? '...' : 'Next'}
            </button>
        </header>

        <div ref={cropStageRef} className={styles.cropStage} onWheel={onWheelZoom}>
            <div
                className={styles.cropViewport}
                style={
                    cropViewportSize.width > 0
                        ? { width: cropViewportSize.width, height: cropViewportSize.height }
                        : undefined
                }
            >
                {activePreviewUrl && (
                    <Cropper
                        key={`${activePhotoIndex}-${activePhotoEdit.aspectRatio}-${activeImageAspectRatio}`}
                        image={activePreviewUrl}
                        crop={activePhotoEdit.crop}
                        zoom={activePhotoEdit.zoom}
                        aspect={activeCropAspectRatio}
                        objectFit="cover"
                        rotation={0}
                        minZoom={1}
                        maxZoom={3}
                        zoomSpeed={1}
                        cropShape="rect"
                        showGrid={false}
                        restrictPosition
                        style={{}}
                        classes={{}}
                        mediaProps={{}}
                        cropperProps={{}}
                        keyboardStep={1}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={(_, croppedAreaPixels) => onCropComplete(croppedAreaPixels)}
                    />
                )}
            </div>

            <div className={styles.cropToolsLeft}>
                <button
                    type="button"
                    className={`${styles.cropToolButton} ${showAspectRatioPicker ? styles.aspectRatioButtonActive : ''}`}
                    onClick={onToggleAspectRatio}
                    title={`Aspect ratio: ${activePhotoEdit.aspectRatio}`}
                    aria-label={`Change aspect ratio, current ${activePhotoEdit.aspectRatio}`}
                    aria-expanded={showAspectRatioPicker}
                >
                    <Icon name="expand-outline" size={24} />
                </button>

                <button
                    type="button"
                    className={`${styles.cropToolButton} ${styles.zoomToggleButton} ${
                        showZoomControl ? styles.zoomToggleButtonActive : ''
                    }`}
                    onClick={onToggleZoom}
                    title="Zoom"
                    aria-label="Toggle zoom control"
                    aria-expanded={showZoomControl}
                >
                    <Icon name={showZoomControl ? 'maximize' : 'maximize-outline'} size={24} />
                </button>
            </div>

            {showAspectRatioPicker && (
                <div className={styles.aspectRatioPicker} role="menu" aria-label="Aspect ratio">
                    {ASPECT_RATIOS.map((ratio) => (
                        <button
                            key={ratio}
                            type="button"
                            className={`${styles.aspectRatioOption} ${
                                activePhotoEdit.aspectRatio === ratio ? styles.aspectRatioOptionActive : ''
                            }`}
                            onClick={() => onAspectRatioSelect(ratio)}
                            role="menuitemradio"
                            aria-checked={activePhotoEdit.aspectRatio === ratio}
                        >
                            <span>{ASPECT_RATIO_LABELS[ratio]}</span>
                            {ratio === 'original' ? (
                                <Icon name="image-outline" size={24} />
                            ) : (
                                <span
                                    className={`${styles.aspectRatioIndicator} ${
                                        ratio === '1:1'
                                            ? styles.aspectRatioIndicatorSquare
                                            : ratio === '4:5'
                                              ? styles.aspectRatioIndicatorPortrait
                                              : styles.aspectRatioIndicatorLandscape
                                    }`}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}

            <button
                type="button"
                className={`${styles.cropToolButton} ${styles.addPhotoTool} ${
                    showPhotoPicker ? styles.addPhotoToolActive : ''
                }`}
                onClick={onTogglePhotoPicker}
                title="Add another photo"
                aria-label="Add another photo"
                aria-expanded={showPhotoPicker}
            >
                <Icon name="image-outline" size={24} />
            </button>

            {showPhotoPicker && (
                <div className={`${styles.photoPicker} ${photos.length === 1 ? styles.photoPickerSingle : ''}`}>
                    <div className={styles.photoPickerPhotos}>
                        {previewUrls.map((previewUrl, index) => (
                            <div
                                className={`${styles.photoPickerPreview} ${
                                    photos.length > 1 && index === activePhotoIndex
                                        ? styles.photoPickerPreviewActive
                                        : ''
                                }`}
                                ref={index === activePhotoIndex ? activeThumbnailRef : undefined}
                                key={`${previewUrl}-${index}`}
                            >
                                <button
                                    type="button"
                                    className={styles.photoPickerSelect}
                                    onClick={() => onPhotoNavigation(index)}
                                    aria-label={`Show photo ${index + 1}`}
                                >
                                    <img src={previewUrl} alt={`Selected photo ${index + 1}`} />
                                </button>
                                <button
                                    type="button"
                                    className={styles.photoPickerRemove}
                                    onClick={() => onRemovePhoto(index)}
                                    aria-label={`Remove photo ${index + 1}`}
                                >
                                    <Icon name="close-outline" size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="button" className={styles.photoPickerAdd} onClick={onAddPhoto} aria-label="Add another photo">
                        <Icon name="plus-circle-outline" size={30} />
                    </button>
                </div>
            )}

            {photos.length > 1 && (
                <>
                    {activePhotoIndex > 0 && (
                        <button
                            type="button"
                            className={`${styles.photoNavigationButton} ${styles.photoNavigationLeft}`}
                            onClick={() => onPhotoNavigation(activePhotoIndex - 1)}
                            aria-label="Show previous photo"
                        >
                            <Icon name="arrow-ios-back" size={24} />
                        </button>
                    )}

                    {activePhotoIndex < photos.length - 1 && (
                        <button
                            type="button"
                            className={`${styles.photoNavigationButton} ${styles.photoNavigationRight}`}
                            onClick={() => onPhotoNavigation(activePhotoIndex + 1)}
                            aria-label="Show next photo"
                        >
                            <Icon name="arrow-ios-forward" size={24} />
                        </button>
                    )}

                    <div className={styles.photoIndicators}>
                        {photos.map((photo, index) => (
                            <button
                                type="button"
                                className={`${styles.photoIndicator} ${
                                    index === activePhotoIndex ? styles.photoIndicatorActive : ''
                                }`}
                                key={`${photo.name}-indicator-${index}`}
                                onClick={() => onPhotoNavigation(index)}
                                aria-label={`Show photo ${index + 1}`}
                                aria-current={index === activePhotoIndex ? 'true' : undefined}
                            />
                        ))}
                    </div>
                </>
            )}

            {showZoomControl && (
                <div className={styles.zoomControl} onWheel={(event) => event.stopPropagation()}>
                    <input
                        id="photo-zoom"
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={activePhotoEdit.zoom}
                        style={{ '--zoom-progress': `${((activePhotoEdit.zoom - 1) / 2) * 100}%` } as CSSProperties}
                        onChange={(event) => onZoomSliderChange(Number(event.target.value))}
                        aria-label="Zoom photo"
                    />
                </div>
            )}

            {error && (
                <p className={styles.cropError} role="alert">
                    {error}
                </p>
            )}

            <input
                ref={fileInputRef}
                className={styles.fileInput}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                multiple
                onChange={onFileChange}
            />
        </div>
    </>
)
