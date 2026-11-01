'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { skipToken } from '@reduxjs/toolkit/query'
import styles from './page.module.css'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useGetPostsByUserIdInfiniteQuery } from '@/features/post/api/PostApi'
import {PostModal} from "@/features/post-details/ui/PostModal";


const ProfilePage = () => {
    const params = useParams<{ userId: string }>()
    const observerRef = useRef<HTMLDivElement | null>(null)

    const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetPostsByUserIdInfiniteQuery(
        params?.userId
            ? { userId: params.userId }
            : skipToken
    )

    const { data: me, isLoading: isMeLoading } = useGetMeQuery()

    const isOwner = !isMeLoading && !!params?.userId && me?.id === params.userId

    const countFollowing = 1000
    const countFollowers = 10000
    const countPublications = 100000

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            {
                rootMargin: '0px',
                threshold: 0,
            }
        )

        const currentElement = observerRef.current

        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            observer.disconnect()
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div>
            <div className={styles.userProfile}>
                <div className={styles.userPhoto}>
                    <Image
                        src="/default-avatar.png"
                        alt="Default profile avatar"
                        width={204}
                        height={204}
                    />
                </div>

                <div className={styles.userDetails}>
                    <div className={styles.userDetailsTop}>
                        <span className={styles.userName}>
                            {me?.username}
                        </span>

                        <Link
                            href="/profile-settings"
                            className={`${styles.profileSettingsLink} ${!isOwner ? styles.hidden : ''}`}
                        >
                            Profile Settings
                        </Link>
                    </div>

                    <div className={styles.userDetailsMiddle}>
                        <div className={styles.userActivityBlock}>
                            <span className={styles.userActivityCount}>
                                {countFollowing.toLocaleString('ru-RU')}
                            </span>
                            <span>Following</span>
                        </div>

                        <div className={styles.userActivityBlock}>
                            <span className={styles.userActivityCount}>
                                {countFollowers.toLocaleString('ru-RU')}
                            </span>
                            <span>Followers</span>
                        </div>

                        <div className={styles.userActivityBlock}>
                            <span className={styles.userActivityCount}>
                                {countPublications.toLocaleString('ru-RU')}
                            </span>
                            <span>Publications</span>
                        </div>
                    </div>

                    <div className={styles.userDetailsBottom}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>


            <div className={styles.postsGrid}>
                {data?.pages.flatMap(page =>
                    page.items.flatMap(post =>
                        post.images.map(image => (
                            <Image
                                key={image.id}
                                src={image.url}
                                alt={post.description || 'Post'}
                                width={234}
                                height={228}
                                className={styles.postImage}
                                onClick={() => setSelectedPostId(post.id)}
                            />
                        ))
                    )
                )}
            </div>

            <div ref={observerRef} className={styles.observerTarget}>
                {isFetchingNextPage && <p>Loading...</p>}
            </div>

            {selectedPostId !== null && (
                <PostModal
                    isOpen={true}
                    postId={selectedPostId}
                    onClose={() => setSelectedPostId(null)}
                />
            )}
        </div>
    )
}

export default ProfilePage