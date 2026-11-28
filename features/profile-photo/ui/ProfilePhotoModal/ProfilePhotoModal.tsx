'use client'

import { Icon } from '@/shared/ui/Icon/Icon'
import s from './ProfilePhotoModal.module.css'
import { Button } from '@/shared/ui/Button/Button'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../model/constants'
import { Alert } from '@/shared/ui/Alert/Alert'
import Cropper from 'react-easy-crop'
import { getCroppedImage } from '../../lib/getCroppedImage'
import { useCreateUserAvatarMutation } from '../../api/UserAvatarApi'
import { useRouter } from 'next/navigation'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { getAvatarErrorMessage } from '../../lib/getAvatarErrorMessage'

type ProfilePhotoModalProps = {
    onClose: () => void
}

export type CroppedArea = {
    width: number
    height: number
    x: number
    y: number
}
export const ProfilePhotoModal = ({ onClose }: ProfilePhotoModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [mainError, setMainError] = useState<string | null>(null)
    const [createUserAvatar, { isLoading }] = useCreateUserAvatarMutation()

    const router = useRouter()

    const clickHandler = () => {
        fileInputRef.current?.click()
    }
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0]
        event.currentTarget.value = ''

        if (!file) return

        setErrorMessage(null)
        setMainError(null)

        if (file) {
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setErrorMessage('The format of the uploaded photo must be PNG and JPEG')
                setSelectedFile(null)
                setImageUrl(null)
                setCroppedAreaPixels(null)
                return
            }
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage('Photo size must be less than 10MB!')
                setSelectedFile(null)
                setImageUrl(null)
                setCroppedAreaPixels(null)
                return
            }
            const url = URL.createObjectURL(file)
            setImageUrl(url)
            setSelectedFile(file)
            setErrorMessage(null)
            setCroppedAreaPixels(null)
            setCrop({ x: 0, y: 0 })
        }
    }

    useEffect(() => {
        if (!imageUrl) return
        return () => {
            URL.revokeObjectURL(imageUrl)
        }
    }, [imageUrl])

    const saveImage = async () => {
        if (!imageUrl || !selectedFile || !croppedAreaPixels) return

        try {
            const croppedImage = await getCroppedImage(imageUrl, selectedFile.type, croppedAreaPixels)
            const file = new File([croppedImage], selectedFile.name, { type: selectedFile.type })

            await createUserAvatar(file).unwrap()
            router.push('/profile-settings')
        } catch (e) {
            if (isFetchBaseQueryError(e)) {
                const message = getAvatarErrorMessage(e) ?? getCommonErrorMessage(e)
                setMainError(message ?? 'Something went wrong. Please try again.')
            } else {
                setMainError('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <div className={s.overlay}>
            {mainError && <Alert variant="error" message={mainError} />}
            <div className={s.modalContainer}>
                <div className={s.header}>
                    <h2>Add a Profile Photo</h2>
                    <button onClick={onClose} className={s.closeBtn} aria-label="Close profile photo modal">
                        <Icon name={'close-outline'} />
                    </button>
                </div>
                <div className={s.mainContent}>
                    {errorMessage && <Alert variant="error" message={errorMessage} className={s.alert} />}
                    <div className={`${s.imageWrapper} ${imageUrl ? s.withImage : ''}`}>
                        {imageUrl ? (
                            <Cropper
                                image={imageUrl}
                                crop={crop}
                                aspect={1}
                                objectFit="cover"
                                cropShape="round"
                                onCropChange={setCrop}
                                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                            />
                        ) : (
                            <Icon name={'image-outline'} />
                        )}
                    </div>
                    {imageUrl ? (
                        <Button title="Save" onClick={saveImage} disabled={isLoading} className={s.saveBtn} />
                    ) : (
                        <Button title="Select from Computer" onClick={clickHandler} fullWidth />
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png"
                        hidden
                        onChange={changeHandler}
                    />
                </div>
            </div>
        </div>
    )
}
