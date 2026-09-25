import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './AlertModal.module.css'

type Props = {
	title: string
	text: string
	email?: string
}

export const AlertModal = ({title, text, email}: Props) => {
     return (
			<div className={styles.overlay}>
        <div className={styles.content}>
					<div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} aria-label="Close">
                <Icon name="close-outline" size={24} className={styles.icon}/>
            </button>
            </div>

            <div className={styles.body}>
            <p className={styles.text}>
							{text}
							{email && <strong>{email}</strong>}?
            </p>

            <div className={styles.actions}>
							<Button title="Yes" variant="outline" />
							<Button title="No" variant="primary" />
            </div>
					</div>
			</div>
    </div>
  );
}