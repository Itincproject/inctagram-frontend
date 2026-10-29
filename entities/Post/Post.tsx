'use client'

import { UserAvatar } from '@/shared/ui/UserAvatar'
import { useLayoutEffect, useRef, useState } from 'react'
import s from './Post.module.css'
import { formatPostDate } from '@/shared/libs/formatPostDate'
import { PostCard } from '@/shared/ui/PostCard'
import { ItemType } from '@/pages/static-home-content/model/types'
import avatar from '@/public/vercel.svg'

type Props = {
    post: ItemType
}

export const Post = ({ post }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [isOverflowing, setIsOverFlowing] = useState(false)
    const [shortDescription, setShortDescription] = useState(post.description)

    const publishTime = formatPostDate(post.createdAt)
    const measureRef = useRef<HTMLParagraphElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        const measure = measureRef.current

        if (!measure) return

        const lineHeight = parseFloat(getComputedStyle(measure).lineHeight)
        const maxHeight = Math.ceil(lineHeight * 3)

        const fits = (text: string) => {
            measure.textContent = `${text}... Show more`
            return measure.scrollHeight <= maxHeight
        }
        measure.textContent = post.description

        if (measure.scrollHeight <= maxHeight) {
            setShortDescription(post.description)
            setIsOverFlowing(false)
            return
        }

        let left = 0
        let right = post.description.length

        while (left < right) {
            const middle = Math.ceil((left + right) / 2)

            if (fits(post.description.slice(0, middle))) {
                left = middle
            } else {
                right = middle - 1
            }
        }

        setShortDescription(post.description.slice(0, left))
        setIsOverFlowing(true)
    }, [post.description])

    return (
        <div className={s.container}>
            <PostCard postPhoto={post.images} isCollapsed={!isCollapsed} />
            <div className={s.userContainer}>
                <UserAvatar photo={avatar} name={post.author.id} size={36} />
                <span className={s.userName}>{post.author.username}</span>
            </div>
            <time className={s.time}>{publishTime}</time>
            <div className={s.descContainer}>
                <p ref={descriptionRef} className={`${s.descripion} ${!isCollapsed ? s.collapsed : ''}`}>
                    {isCollapsed ? shortDescription : post.description}

                    {isOverflowing && isCollapsed && (
                        <>
                            ...{' '}
                            <button
                                onClick={() => {
                                    setIsCollapsed(false)
                                }}
                                className={s.btn}
                            >
                                Show more
                            </button>
                        </>
                    )}
                    {!isCollapsed && (
                        <button
                            onClick={() => {
                                setIsCollapsed(true)
                            }}
                            className={s.btn}
                        >
                            Hide
                        </button>
                    )}
                </p>

                <p ref={measureRef} className={s.measure} aria-hidden="true" />
            </div>
        </div>
    )
}
