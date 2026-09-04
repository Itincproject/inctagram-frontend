'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './Pagination.module.css'

export type PaginationProps = {
    totalPages: number
    page?: number
    onPageChange?: (page: number) => void
    itemsPerPage?: number
    itemsPerPageOptions?: number[]
    onItemsPerPageChange?: (itemsPerPage: number) => void
}

const defaultItemsPerPageOptions = [10, 20, 30, 50, 100]

export const Pagination = ({
                               totalPages,
                               page,
                               onPageChange,
                               itemsPerPage,
                               itemsPerPageOptions = defaultItemsPerPageOptions,
                               onItemsPerPageChange,
                           }: PaginationProps) => {
    const [internalPage, setInternalPage] = useState(1)
    const [internalItemsPerPage, setInternalItemsPerPage] = useState(100)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentPage = page ?? internalPage
    const currentItemsPerPage = itemsPerPage ?? internalItemsPerPage

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const changePage = (newPage: number) => {
        const nextPage = Math.min(Math.max(newPage, 1), totalPages)

        if (page === undefined) {
            setInternalPage(nextPage)
        }

        onPageChange?.(nextPage)
    }

    const changeItemsPerPage = (value: number) => {
        if (itemsPerPage === undefined) {
            setInternalItemsPerPage(value)
        }

        onItemsPerPageChange?.(value)
        setIsDropdownOpen(false)
    }

    const visiblePages =
        totalPages <= 7
            ? Array.from({ length: totalPages }, (_, index) => index + 1)
            : currentPage <= 5
                ? [1, 2, 3, 4, 5, 'ellipsis', totalPages]
                : currentPage >= totalPages - 4
                    ? [
                        1,
                        'ellipsis',
                        totalPages - 4,
                        totalPages - 3,
                        totalPages - 2,
                        totalPages - 1,
                        totalPages,
                    ]
                    : [
                        1,
                        'ellipsis',
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        'ellipsis',
                        totalPages,
                    ]

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <div className={styles.pages}>
                <button
                    className={styles.arrow}
                    type="button"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    ‹
                </button>

                {visiblePages.map((item, index) =>
                    typeof item === 'string' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className={styles.ellipsis}
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            className={`${styles.page} ${
                                currentPage === item ? styles.active : ''
                            }`}
                            type="button"
                            onClick={() => changePage(item)}
                            aria-current={
                                currentPage === item ? 'page' : undefined
                            }
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    className={styles.arrow}
                    type="button"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    ›
                </button>
            </div>

            <div className={styles['items-per-page']}>
                <span>Show</span>

                <div
                    className={styles['select-wrapper']}
                    ref={dropdownRef}
                >
                    <button
                        className={styles.select}
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={isDropdownOpen}
                        onClick={() =>
                            setIsDropdownOpen((open) => !open)
                        }
                    >
                        <span>{currentItemsPerPage}</span>

                        <span
                            className={`${styles['select-arrow']} ${
                                isDropdownOpen ? styles.open : ''
                            }`}
                            aria-hidden="true"
                        />
                    </button>

                    {isDropdownOpen && (
                        <div
                            className={styles.dropdown}
                            role="listbox"
                            aria-label="Items per page"
                        >
                            {itemsPerPageOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`${styles.option} ${
                                        currentItemsPerPage === option
                                            ? styles['option-active']
                                            : ''
                                    }`}
                                    type="button"
                                    role="option"
                                    aria-selected={
                                        currentItemsPerPage === option
                                    }
                                    onClick={() =>
                                        changeItemsPerPage(option)
                                    }
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <span>on page</span>
            </div>
        </nav>
    )
}