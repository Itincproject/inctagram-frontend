'use client'

import Link from 'next/link'

import {LogoutButton} from '@/features/auth/log-out/ui/LogoutButton'
import {useGetMeQuery} from '@/features/auth/api/authApi'
import {Icon} from '@/shared/ui/Icon/Icon'

import styles from './Sidebar.module.css'
import {useState} from 'react'
import {CreatePostModal} from '@/features/post/create-post/ui'

export const Sidebar = () => {
    const { data: me } = useGetMeQuery()
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

    return (
        <>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <nav className={styles.nav}>
                        <Link href="/feed" className={styles.navItem}>
                            <Icon name="home-outline" size={24} />
                            <span>Feed</span>
                        </Link>

                        <button className={styles.navItem} onClick={() => setIsCreatePostOpen(true)}>
                            <Icon name={'plus-square-outline'} size={24} />
                            <span>Create</span>
                        </button>

                        <Link
                            href={me?.id ? `/profile/${me.id}` : '#'}
                            className={`${styles.navItem} ${!me?.id ? styles.disabled : ''}`}
                            aria-disabled={!me?.id}
                            tabIndex={me?.id ? 0 : -1}
                            onClick={(e) => {
                                if (!me?.id) e.preventDefault()
                            }}
                        >
                            <Icon name="person-outline" size={24} />
                            <span>My Profile</span>
                        </Link>

                        <Link href="/messenger" className={styles.navItem}>
                            <Icon name="message-circle-outline" size={24} />
                            <span>Messenger</span>
                        </Link>

                        <Link href="/search" className={styles.navItem}>
                            <Icon name="search-outline" size={24} />
                            <span>Search</span>
                        </Link>

                        <div className={styles.separatorBlock}>
                            <Link href="/statistics" className={styles.navItem}>
                                <Icon name="trending-up-outline" size={24} />
                                <span>Statistics</span>
                            </Link>

                            <Link href="/favorites" className={styles.navItem}>
                                <Icon name="bookmark-outline" size={24} />
                                <span>Favorites</span>
                            </Link>
                        </div>
                    </nav>

                    <div className={styles.bottomSection}>
                        <LogoutButton />
                    </div>
                </div>
            </aside>
            {isCreatePostOpen && <CreatePostModal onClose={() => setIsCreatePostOpen(false)} />}
        </>
    )
}
