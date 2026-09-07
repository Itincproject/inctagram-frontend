import { ChangeEvent } from 'react'
import styles from './CheckBox.module.css'
import { Icon } from '../Icon/Icon'

export type Props = {
    id: string
    name?: string
    label?: string
    checked: boolean
    disabled?: boolean
    onChange: (checked: boolean) => void
}

export function CheckBox({ name, label, id, checked, disabled, onChange }: Props) {
    return (
        <div className={styles.conteiner}>
            <label htmlFor={id} className={styles.checkbox_container}>
                <input
                    id={id}
                    type="checkbox"
                    name={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        onChange(event.target.checked)
                    }}
                    checked={checked}
                    className={styles.checkbox}
                    disabled={disabled}
                />
                <span className={styles.icon_container}>
                    {checked ? (
                        <Icon name="check_box_checked" size={18} />
                    ) : (
                        <Icon name="check_box_unchecked" size={18} />
                    )}
                </span>

                <span className={styles.label}>{label}</span>
            </label>
        </div>
    )
}
