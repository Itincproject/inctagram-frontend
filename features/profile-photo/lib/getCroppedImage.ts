import type { CroppedArea } from '../ui/ProfilePhotoModal'

export const getCroppedImage = async (
    imageUrl: string,
    mimeType: string,
    croppedAreaPixels: CroppedArea,
): Promise<Blob> => {
    const image = new Image()
    image.src = imageUrl

    await image.decode()

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = 322
    canvas.height = 322

    if (!context) {
        throw new Error('Could not get canvas context')
    }

    context.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height,
    )

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob)
                } else {
                    reject(new Error('Canvas is empty'))
                }
            },
            mimeType,
            0.9,
        )
    })
    return blob
}
