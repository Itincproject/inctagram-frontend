import Image from 'next/image'
import s from './UserAvatar.module.css'

export type Prop = {
    photo: string
    name: string
    size?: number
}

export const UserAvatar = ({ photo, name, size }: Prop) => {
    return (
        <div>
            <Image src={photo} alt={name} className={`${size ? s.size : ''} ${s.avatar}`} />
        </div>
    )
}
