import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction, WheelEvent } from 'react'

import { createCroppedFile, getCenterCropArea, loadImage } from '../../lib/image'
import { ASPECT_RATIO_VALUES, createInitialPhotoEdit } from '../constants'
import type { AspectRatio, PhotoEdit } from '../types'

type UsePhotoCropParams = {
    photos: File[]
    previewUrls: string[]
    photoEdits: PhotoEdit[]
    activePhotoIndex: number
    setPhotoEdits: Dispatch<SetStateAction<PhotoEdit[]>>
    isCropStep: boolean
}

type CropViewportSize = {
    width: number
    height: number
}

export const usePhotoCrop = ({
    photos,
    previewUrls,
    photoEdits,
    activePhotoIndex,
    setPhotoEdits,
    isCropStep,
}: UsePhotoCropParams) => {
    const cropStageRef = useRef<HTMLDivElement>(null)
    const photoEditsRef = useRef(photoEdits)
    const [activeImageAspectRatio, setActiveImageAspectRatio] = useState(1)
    const [cropStageSize, setCropStageSize] = useState<CropViewportSize>({ width: 0, height: 0 })

    const activePhotoEdit = photoEdits[activePhotoIndex] ?? createInitialPhotoEdit()
    const activePreviewUrl = previewUrls[activePhotoIndex]
    const activeCropAspectRatio =
        activePhotoEdit.aspectRatio === 'original'
            ? activeImageAspectRatio
            : ASPECT_RATIO_VALUES[activePhotoEdit.aspectRatio]

    const cropViewportSize = (() => {
        const { width, height } = cropStageSize

        if (!width || !height || !activeCropAspectRatio) {
            return { width: 0, height: 0 }
        }

        if (width / height > activeCropAspectRatio) {
            return { width: height * activeCropAspectRatio, height }
        }

        return { width, height: width / activeCropAspectRatio }
    })()

    useEffect(() => {
        let isCurrent = true

        if (!activePreviewUrl) {
            return () => {
                isCurrent = false
            }
        }

        loadImage(activePreviewUrl)
            .then((image) => {
                if (isCurrent && image.naturalHeight > 0) {
                    setActiveImageAspectRatio(image.naturalWidth / image.naturalHeight)
                }
            })
            .catch(() => {
                if (isCurrent) {
                    setActiveImageAspectRatio(1)
                }
            })

        return () => {
            isCurrent = false
        }
    }, [activePreviewUrl])

    useEffect(() => {
        photoEditsRef.current = photoEdits
    }, [photoEdits])

    useEffect(() => {
        if (!isCropStep) return

        const stage = cropStageRef.current
        if (!stage) return

        const updateStageSize = () => setCropStageSize({ width: stage.clientWidth, height: stage.clientHeight })
        updateStageSize()

        const observer = new ResizeObserver(updateStageSize)
        observer.observe(stage)

        return () => observer.disconnect()
    }, [isCropStep])

    const updateActivePhotoEdit = (updates: Partial<PhotoEdit>) => {
        const nextPhotoEdits = photoEditsRef.current.map((edit, index) =>
            index === activePhotoIndex ? { ...edit, ...updates } : edit,
        )

        photoEditsRef.current = nextPhotoEdits
        setPhotoEdits(nextPhotoEdits)
    }

    const handleAspectRatioSelect = (aspectRatio: AspectRatio) => {
        updateActivePhotoEdit({
            aspectRatio,
            crop: { x: 0, y: 0 },
            zoom: 1,
            croppedAreaPixels: null,
        })
    }

    const handleWheelZoom = (event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault()

        const delta = event.deltaY < 0 ? 0.1 : -0.1
        const nextZoom = Math.min(3, Math.max(1, Math.round((activePhotoEdit.zoom + delta) * 10) / 10))

        updateActivePhotoEdit({ zoom: nextZoom })
    }

    const createCroppedPhotos = async (): Promise<File[]> => {
        return Promise.all(
            photos.map(async (photo, index) => {
                const imageSrc = previewUrls[index]

                if (!imageSrc) {
                    throw new Error('Photo preview is unavailable')
                }

                const edit = photoEditsRef.current[index] ?? createInitialPhotoEdit()
                const image = await loadImage(imageSrc)
                const aspect =
                    edit.aspectRatio === 'original'
                        ? image.naturalWidth / image.naturalHeight
                        : ASPECT_RATIO_VALUES[edit.aspectRatio]
                const cropArea = edit.croppedAreaPixels ?? (await getCenterCropArea(imageSrc, aspect))

                return createCroppedFile(imageSrc, cropArea, photo)
            }),
        )
    }

    return {
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
    }
}
