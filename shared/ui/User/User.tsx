import { UserAvatar } from '../UserAvatar'
import s from './User.module.css'

type UserProps = {
    name: string
    photo: string
}

export const User = ({ name, photo }: UserProps) => {
    return (
        <div className={s.container}>
            <UserAvatar photo={photo} name={name} />
            <span className={s.userName}>{name}</span>
        </div>
    )
}
