import s from './RecaptchaLoading.module.css'

export const RecaptchaLoader = () => {
    return (
        <span className={s.loader_dynamic} role="status" aria-label="Загрузка">
            <svg className={s.loader__icon} viewBox="0 0 50 50" aria-hidden="true">
                <circle
                    className={s.loader__circle}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    )
}
