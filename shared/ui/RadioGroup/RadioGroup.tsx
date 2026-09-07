import { ChangeEvent } from 'react'
import styles from './RadioGroup.module.css'
import { Icon } from '../Icon/Icon'

export type RadioOptions = { value: string; label: string; disabled?: boolean }
export type Props = {
    name: string
    options: RadioOptions[]
    value: string
    onChange: (value: string) => void
}

export const RadioButton = ({ options, value, name, onChange }: Props) => {
    return (
        <>
            {options.map((option) => {
                const checked = value === option.value

                return (
                    <div key={option.value} className={styles.container}>
                        <label htmlFor={option.value} className={styles.item}>
                            <input
                                name={name}
                                type="radio"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                                value={option.value}
                                id={option.value}
                                checked={checked}
                                disabled={option.disabled}
                                className={styles.input}
                            />
                            <span className={styles.icon_container}>
                                {checked ? (
                                    <Icon name={'radio_button_checked'} size={20} className={styles.icon} />
                                ) : (
                                    <Icon name={'radio_button_unchecked'} size={20} className={styles.icon} />
                                )}
                            </span>
                            <span className={styles.label}>{option.label}</span>
                        </label>
                    </div>
                )
            })}
        </>
    )
}
