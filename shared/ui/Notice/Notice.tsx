import { ReactNode } from 'react'
import s from './Notice.module.css'

type Props = {
    title: string
    description: string
    imageSrc: string
    children: ReactNode
}

export const Notice = ({ title, description, children, imageSrc }: Props) => {
    return (
        <div className={s.container}>
            <div className={s.text_wrapper}>
                <h2 className={s.title}>{title}</h2>
                <p className={s.description}>{description}</p>
            </div>

            {children}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" className={s.image}></img>
        </div>
    )
}
