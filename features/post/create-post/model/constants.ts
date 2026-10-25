import type { AspectRatio, PhotoEdit } from './types'

export const MAX_PHOTOS = 10
export const MAX_FILE_SIZE = 20 * 1024 * 1024

export const ALLOWED_TYPES = ['image/jpeg', 'image/png']
export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png']

export const ASPECT_RATIO_VALUES: Record<AspectRatio, number> = {
    original: 1,
    '1:1': 1,
    '4:5': 4 / 5,
    '16:9': 16 / 9,
}

export const ASPECT_RATIOS: AspectRatio[] = ['original', '1:1', '4:5', '16:9']

export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
    original: 'Original',
    '1:1': '1:1',
    '4:5': '4:5',
    '16:9': '16:9',
}

export const createInitialPhotoEdit = (): PhotoEdit => ({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspectRatio: 'original',
    croppedAreaPixels: null,
})
