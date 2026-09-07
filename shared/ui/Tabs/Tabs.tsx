import styles from './Tabs.module.css'

export type TabItem = {
    value: string
    title: string
    disabled?: boolean
}

export type Props = {
    value: string
    onValueChange: (value: string) => void
    items: TabItem[]
}

export const Tabs = ({ onValueChange, items, value }: Props) => {
    return (
        <div role="tablist" className={styles.conteiner}>
            {items.map((item) => {
                const isActive = item.value === value
                return (
                    <button
                        className={`${styles.tab} + ${isActive ? styles.selected : ''}`}
                        key={item.value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        disabled={item.disabled}
                        onClick={() => onValueChange(item.value)}
                    >
                        {item.title}
                    </button>
                )
            })}
        </div>
    )
}
