import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import styles from './Alert.module.css'

type Props = {
    open: boolean
    title: string
    text: string
    email?: string
    onClose?: () => void

    isOneBtn?: boolean  
    confirmText?: string
    cancelText?: string
}

export const AlertModal = ({ open, title, text, email, onClose, isOneBtn }: Props) => {
    return (
        <>
            {open && (
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>{title}</h2>

                            <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
                                <Icon name="close-outline" size={24} className={styles.icon} />
                            </button>
                        </div>

                        <div className={styles.body}>
                            <p className={styles.text}>
                                {text+' '}
                                {email}
                            </p>

                            <div className={styles.actions}>
                                {isOneBtn ?
                                    <Button title="OK" variant="primary" onClick={onClose} />
                                : <div className={styles.wrapperBtns}>
                                    <Button title="OK" variant="outline" onClick={onClose} />
                                    <Button title="No" variant="primary" onClick={onClose} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

