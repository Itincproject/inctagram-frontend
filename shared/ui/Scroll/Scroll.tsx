import type { CSSProperties, PropsWithChildren } from 'react'

import styles from './Scroll.module.css'

type ScrollProps = PropsWithChildren<{
    orientation?: 'vertical' | 'horizontal'
    className?: string
    style?: CSSProperties
}>

export const Scroll = ({ children, orientation = 'vertical', className, style }: ScrollProps) => {
    const classes = [styles.scroll, styles[orientation], className].filter(Boolean).join(' ')

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}
