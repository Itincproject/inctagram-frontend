'use client'

import Image from 'next/image'
import { Icon } from '../Icon/Icon'
import s from './PostCard.module.css'
import { useState } from 'react'
import { ImageType } from '@/pages/static-home-content/model/types'

type Prop = {
    postPhoto: ImageType[]
    isCollapsed?: boolean
}

export const PostCard = ({ postPhoto, isCollapsed }: Prop) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const isFirstPhoto = activeIndex === 0
    const isLastPhoto = activeIndex === postPhoto.length - 1

    const HandleNextClick = () => {
        if (isLastPhoto) return
        setActiveIndex((prev) => prev + 1)
    }

    const HandlePreviousClick = () => {
        if (isFirstPhoto) return
        setActiveIndex((prev) => prev - 1)
    }

    return (
        <div className={`${s.container} ${isCollapsed ? s.collapsed : ''}`}>
            <Image src={postPhoto[activeIndex].url} alt="" fill className={s.photo} />
            {!isFirstPhoto && (
                <button onClick={HandlePreviousClick} className={`${s.btn} ${s.previous}`}>
                    <Icon name="arrow-ios-back-outline" className={s.arrow} />
                </button>
            )}
            {!isLastPhoto && (
                <button onClick={HandleNextClick} className={`${s.btn} ${s.next}`}>
                    <Icon name="arrow-ios-forward-outline" className={s.arrow} />
                </button>
            )}
            <div className={s.slider_container}>
                {postPhoto.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={` ${s.sliderBtn} ${index === activeIndex ? s.active : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}
