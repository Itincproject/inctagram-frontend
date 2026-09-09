import { RecaptchaLoader } from '@/shared/ui/RecaptchaLoading'
import { Icon } from '../Icon/Icon'
import styles from './Recaptcha.module.css'

export type StatusType = 'idle' | 'loading' | 'success' | 'error' | 'expired'
export type Props = {
    onClick: () => void
    status: StatusType
}

export const Recaptcha = ({ onClick, status }: Props) => {
    const errorMessage = {
        error: 'Please verify that you are not a robot',
        expired: 'Verifiction expired. Check the checkbox again.',
    }
    const isError = status === 'error'
    const isExpired = status === 'expired'
    return (
        <div className={`${styles.invisible_wrapper} ${isError ? styles.error_wrapper : ''}`}>
            <div className={styles.conteiner}>
                {isExpired && (
                    <span className={`${styles.errorMessage} ${styles.expired}`}>{errorMessage.expired}</span>
                )}
                <div className={styles.captcha_conteiner}>
                    <input
                        type="checkbox"
                        onChange={onClick}
                        className={styles.checkbox}
                        id="captcha"
                        disabled={status === 'loading' || status === 'success'}
                    />
                    <div className={styles.btn_container}>
                        {status === 'loading' ? (
                            <RecaptchaLoader />
                        ) : status === 'success' ? (
                            <Icon name="success_verify" />
                        ) : (
                            <span className={styles.square} />
                        )}
                    </div>

                    <label htmlFor="captcha" className={styles.label}>
                        I’m not a robot
                    </label>
                </div>
                <div className={styles.logo_container}>
                    <Icon name="recaptcha" size={31} className={styles.logo} />
                    <span>reCAPTCHA</span>
                    <div className={styles.link_container}>
                        <a className={styles.link} href="https://policies.google.com/privacy">
                            Privacy
                        </a>
                        <span className={styles.separator}>-</span>
                        <a className={styles.link} href="https://policies.google.com/terms">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
            {isError && <span className={styles.errorMessage}>{errorMessage.error}</span>}
        </div>
    )
}
