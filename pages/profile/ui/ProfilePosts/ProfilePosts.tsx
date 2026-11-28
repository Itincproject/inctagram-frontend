'use client'
import s from './ProfilePosts.module.css'
import { GetPostsByUserIdResponse, Post } from '@/features/post/api/postApi.types'
import Image from 'next/image'
import { useAppDispatch } from '@/app/providers/useAppDispatch'
import { postApi, useGetPostsByUserIdInfiniteQuery } from '@/features/post/api/PostApi'
import { useEffect, useRef, useState } from 'react'
import { PostModal } from '@/features/post-details/ui/PostModal'

type ProfilePostsProps = {
    initialData: GetPostsByUserIdResponse
    userId: string
}
export const ProfilePosts = ({ initialData, userId }: ProfilePostsProps) => {
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
    const dispatch = useAppDispatch()

    const [isInitialized, setIsInitialized] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const initialize = async () => {
            await dispatch(
                postApi.util.upsertQueryData(
                    'getPostsByUserId',
                    { userId },
                    { pages: [initialData], pageParams: [undefined] },
                ),
            )
            setIsInitialized(true)
        }
        initialize()
    }, [dispatch, userId, initialData])

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsByUserIdInfiniteQuery(
        { userId },
        { skip: !isInitialized },
    )
    const posts = isInitialized ? (data?.pages.flatMap((page) => page.items) ?? []) : initialData.items

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            {
                rootMargin: '0px 0px 150px 0px',
                threshold: 0,
            },
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
        <>
            <div className={s.postsContainer}>
                {posts.map((post) => (
                    <Image
                        key={post.id}
                        src={post.images[0].url}
                        alt={post.description || 'Post'}
                        width={234}
                        height={228}
                        className={s.postImage}
                        onClick={() => setSelectedPostId(post.id)}
                    />
                ))}
            </div>

            <div ref={observerRef} className={s.observerTarget}>
                {isFetchingNextPage && <p>Loading...</p>}
            </div>
            {selectedPostId !== null && (
                <PostModal isOpen={true} postId={selectedPostId} onClose={() => setSelectedPostId(null)} />
            )}
        </>
    )
}
