'use client';

import { useState } from 'react';

import { LogoutButton } from '@/features/auth/log-out/ui/LogoutButton';
import { CreatePostModal } from '@/features/post/create-post/ui';

import { Icon } from '@/shared/ui/Icon/Icon';

import styles from './Sidebar.module.css';

const mainNavItems = [
    { label: 'Feed', iconName: 'home-outline' },
    { label: 'Create', iconName: 'plus-square-outline' },
    { label: 'My Profile', iconName: 'person-outline' },
    { label: 'Messenger', iconName: 'message-circle-outline' },
    { label: 'Search', iconName: 'search-outline' },
];

const secondaryNavItems = [
    { label: 'Statistics', iconName: 'trending-up-outline' },
    { label: 'Favorites', iconName: 'bookmark-outline' },
];

export const Sidebar = () => {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    return (
        <>
            <aside className={styles.sidebar}>
                <nav className={styles.nav}>
                    {mainNavItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={styles.navItem}
                            onClick={
                                item.label === 'Create'
                                    ? () => setIsCreatePostOpen(true)
                                    : undefined
                            }
                        >
                            <Icon name={item.iconName} size={24} />
                            <span>{item.label}</span>
                        </button>
                    ))}

                    <div className={styles.separatorBlock}>
                        {secondaryNavItems.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                className={styles.navItem}
                            >
                                <Icon name={item.iconName} size={24} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                <div className={styles.bottomSection}>
                    <LogoutButton />
                </div>
            </aside>

            {isCreatePostOpen && <CreatePostModal onClose={() => setIsCreatePostOpen(false)} />}
        </>
    );
};
