import type { RefObject } from 'react'

export type Step = 'upload' | 'crop' | 'publication'
export type AspectRatio = 'original' | '1:1' | '4:5' | '16:9'

export type CropPosition = {
    x: number
    y: number
}

export type CropAreaPixels = {
    x: number
    y: number
    width: number
    height: number
}

export type PhotoEdit = {
    crop: CropPosition
    zoom: number
    aspectRatio: AspectRatio
    croppedAreaPixels: CropAreaPixels | null
}

export type PhotoInputRef = RefObject<HTMLInputElement | null>
