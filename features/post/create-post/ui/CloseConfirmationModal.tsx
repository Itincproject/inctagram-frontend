import { Icon } from '@/shared/ui/Icon/Icon'

import styles from './CreatePostModal.module.css'

type CloseConfirmationModalProps = {
    onCancel: () => void
    onSaveDraft: () => void
}

export const CloseConfirmationModal = ({ onCancel, onSaveDraft }: CloseConfirmationModalProps) => (
    <div className={styles.confirmationOverlay}>
        <section
            className={styles.confirmationModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="close-confirmation-title"
            aria-describedby="close-confirmation-description"
        >
            <header className={styles.confirmationHeader}>
                <h2 id="close-confirmation-title" className={styles.confirmationTitle}>
                    Close
                </h2>

                <button type="button" className={styles.confirmationCloseButton} onClick={onCancel} aria-label="Close confirmation">
                    <Icon name="close-outline" size={24} />
                </button>
            </header>

            <div className={styles.confirmationContent}>
                <p id="close-confirmation-description" className={styles.confirmationMessage}>
                    Do you really want to close the creation of a publication?
                </p>

                <div className={styles.confirmationActions}>
                    <button type="button" className={styles.discardButton} onClick={onCancel}>
                        Discard
                    </button>

                    <button type="button" className={styles.saveDraftButton} onClick={onSaveDraft}>
                        Save draft
                    </button>
                </div>
            </div>
        </section>
    </div>
)
