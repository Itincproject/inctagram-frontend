'use client'

import { useEffect, useRef, useState } from 'react'
import { DayPicker, type DateRange } from '@daypicker/react'

import { Icon } from '@/shared/ui/Icon/Icon'

import styles from './DatePicker.module.css'

export type DatePickerProps = {
    mode?: 'single' | 'range'
    label?: string
    error?: string
    disabled?: boolean
    placeholder?: string
    value?: Date | DateRange
    onChange?: (value: Date | DateRange | undefined) => void
}

const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

export const DatePicker = ({
    mode = 'single',
    label = mode === 'single' ? 'Date select' : 'Date range',
    error,
    disabled = false,
    placeholder = 'DD/MM/YYYY',
    value: controlledValue,
    onChange,
}: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedRange, setSelectedRange] = useState<DateRange>()
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', closeOnOutsideClick)

        return () => document.removeEventListener('mousedown', closeOnOutsideClick)
    }, [])

    const date = controlledValue instanceof Date ? controlledValue : selectedDate
    const range = controlledValue && !(controlledValue instanceof Date) ? controlledValue : selectedRange

    const value =
        mode === 'single'
            ? date
                ? formatDate(date)
                : ''
            : range?.from
              ? `${formatDate(range.from)}${range.to ? ` - ${formatDate(range.to)}` : ''}`
              : ''

    const inputClassName = [
        styles.input,
        mode === 'range' ? styles.rangeInput : '',
        isOpen ? styles.focus : '',
        error ? styles.error : '',
        disabled ? styles.disabled : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <span className={styles.label}>{label}</span>

            <button
                type="button"
                className={inputClassName}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                onClick={() => setIsOpen((open) => !open)}
            >
                <span className={value ? styles.value : styles.placeholder}>{value || placeholder}</span>

                <Icon name="calendar-outline" size={24} className={styles.calendarIcon} aria-hidden="true" />
            </button>

            {error && <span className={styles.errorMessage}>{error}</span>}

            {isOpen && !disabled && (
                <div className={styles.calendar} role="dialog" aria-label={label}>
                    {mode === 'single' ? (
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={(nextDate) => {
                                setSelectedDate(nextDate)
                                onChange?.(nextDate)
                                setIsOpen(false)
                            }}
                            showOutsideDays
                            weekStartsOn={1}
                            navLayout="after"
                            classNames={{
                                root: styles.dayPicker,
                                month: styles.month,
                                month_caption: styles.monthCaption,
                                caption_label: styles.captionLabel,
                                nav: styles.nav,
                                button_previous: styles.navButton,
                                button_next: styles.navButton,
                                weekdays: styles.weekdays,
                                weekday: styles.weekday,
                                month_grid: styles.monthGrid,
                                week: styles.week,
                                day: styles.day,
                                day_button: styles.dayButton,
                            }}
                            components={{
                                Chevron: ({ orientation, className }) => (
                                    <Icon
                                        name={orientation === 'left' ? 'arrow-ios-back' : 'arrow-ios-forward'}
                                        size={20}
                                        className={`${styles.chevron} ${className ?? ''}`}
                                        aria-hidden="true"
                                    />
                                ),
                            }}
                        />
                    ) : (
                        <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={(nextRange) => {
                                setSelectedRange(nextRange)
                                onChange?.(nextRange)
                            }}
                            showOutsideDays
                            weekStartsOn={1}
                            navLayout="after"
                            classNames={{
                                root: styles.dayPicker,
                                month: styles.month,
                                month_caption: styles.monthCaption,
                                caption_label: styles.captionLabel,
                                nav: styles.nav,
                                button_previous: styles.navButton,
                                button_next: styles.navButton,
                                weekdays: styles.weekdays,
                                weekday: styles.weekday,
                                month_grid: styles.monthGrid,
                                week: styles.week,
                                day: styles.day,
                                day_button: styles.dayButton,
                            }}
                            components={{
                                Chevron: ({ orientation, className }) => (
                                    <Icon
                                        name={orientation === 'left' ? 'arrow-ios-back' : 'arrow-ios-forward'}
                                        size={20}
                                        className={`${styles.chevron} ${className ?? ''}`}
                                        aria-hidden="true"
                                    />
                                ),
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
