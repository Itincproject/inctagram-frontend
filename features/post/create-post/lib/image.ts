import type { CropAreaPixels } from '../model/types'

export const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error('Failed to load image'))
        image.src = src
    })

export const getCenterCropArea = async (imageSrc: string, aspect: number): Promise<CropAreaPixels> => {
    const image = await loadImage(imageSrc)
    const imageWidth = image.naturalWidth
    const imageHeight = image.naturalHeight

    if (imageWidth / imageHeight > aspect) {
        const width = imageHeight * aspect

        return {
            x: (imageWidth - width) / 2,
            y: 0,
            width,
            height: imageHeight,
        }
    }

    const height = imageWidth / aspect

    return {
        x: 0,
        y: (imageHeight - height) / 2,
        width: imageWidth,
        height,
    }
}

export const createCroppedFile = async (
    imageSrc: string,
    area: CropAreaPixels,
    originalFile: File,
): Promise<File> => {
    const image = await loadImage(imageSrc)
    const canvas = document.createElement('canvas')

    canvas.width = Math.max(1, Math.round(area.width))
    canvas.height = Math.max(1, Math.round(area.height))

    const context = canvas.getContext('2d')

    if (!context) {
        throw new Error('Canvas is not available')
    }

    context.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height)

    const mimeType = originalFile.type === 'image/png' ? 'image/png' : 'image/jpeg'

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(new Error('Failed to crop image'))
                }
            },
            mimeType,
            0.92,
        )
    })

    const baseName = originalFile.name.replace(/\.[^.]+$/, '')
    const extension = mimeType === 'image/png' ? 'png' : 'jpg'

    return new File([blob], `${baseName}-cropped.${extension}`, {
        type: mimeType,
        lastModified: Date.now(),
    })
}
