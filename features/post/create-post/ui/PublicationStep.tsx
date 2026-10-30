import { Icon } from '@/shared/ui/Icon/Icon'

import styles from './CreatePostModal.module.css'

type PublicationStepProps = {
    publicationUrls: string[]
    publicationPhotoIndex: number
    publicationDescription: string
    publicationLocation: string
    isPublishing: boolean
    onBack: () => void
    onPublish: () => void
    onPhotoIndexChange: (index: number) => void
    onDescriptionChange: (description: string) => void
    onLocationChange: (location: string) => void
}

export const PublicationStep = ({
    publicationUrls,
    publicationPhotoIndex,
    publicationDescription,
    publicationLocation,
    isPublishing,
    onBack,
    onPublish,
    onPhotoIndexChange,
    onDescriptionChange,
    onLocationChange,
}: PublicationStepProps) => (
    <>
        <header className={styles.publicationHeader}>
            <button
                type="button"
                className={styles.publicationBackButton}
                onClick={onBack}
                aria-label="Back to cropping"
            >
                <Icon name="arrow-ios-back" size={24} />
            </button>

            <h2 id="create-post-title" className={styles.publicationTitle}>
                Publication
            </h2>

            <button
                type="button"
                className={styles.publishButton}
                onClick={onPublish}
                disabled={isPublishing}
                aria-busy={isPublishing}
            >
                {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
        </header>

        <div className={styles.publicationContent}>
            <div className={styles.publicationMedia}>
                {publicationUrls[publicationPhotoIndex] && (
                    <img
                        src={publicationUrls[publicationPhotoIndex]}
                        alt={`Publication photo ${publicationPhotoIndex + 1}`}
                    />
                )}

                {publicationUrls.length > 1 && (
                    <>
                        {publicationPhotoIndex > 0 && (
                            <button
                                type="button"
                                className={`${styles.publicationNavigationButton} ${styles.publicationNavigationLeft}`}
                                onClick={() => onPhotoIndexChange(publicationPhotoIndex - 1)}
                                aria-label="Show previous publication photo"
                            >
                                <Icon name="arrow-ios-back" size={24} />
                            </button>
                        )}

                        {publicationPhotoIndex < publicationUrls.length - 1 && (
                            <button
                                type="button"
                                className={`${styles.publicationNavigationButton} ${styles.publicationNavigationRight}`}
                                onClick={() => onPhotoIndexChange(publicationPhotoIndex + 1)}
                                aria-label="Show next publication photo"
                            >
                                <Icon name="arrow-ios-forward" size={24} />
                            </button>
                        )}

                        <div className={styles.publicationIndicators}>
                            {publicationUrls.map((url, index) => (
                                <button
                                    key={`${url}-${index}`}
                                    type="button"
                                    className={`${styles.publicationIndicator} ${
                                        index === publicationPhotoIndex ? styles.publicationIndicatorActive : ''
                                    }`}
                                    onClick={() => onPhotoIndexChange(index)}
                                    aria-label={`Show publication photo ${index + 1}`}
                                    aria-current={index === publicationPhotoIndex ? 'true' : undefined}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={styles.publicationForm}>
                <div className={styles.publicationProfile}>
                    <span className={styles.publicationAvatar} aria-hidden="true" />
                    <span>URLProfile</span>
                </div>

                <label className={styles.publicationFieldLabel} htmlFor="publication-description">
                    Add publication descriptions
                </label>
                <div className={styles.publicationTextareaWrap}>
                    <textarea
                        id="publication-description"
                        className={styles.publicationTextarea}
                        value={publicationDescription}
                        onChange={(event) => onDescriptionChange(event.target.value.slice(0, 500))}
                        placeholder="Text-area"
                        maxLength={500}
                    />
                    <span className={styles.publicationCharacterCount}>{publicationDescription.length}/500</span>
                </div>

                <label className={styles.publicationFieldLabel} htmlFor="publication-location">
                    Add location
                </label>
                <div className={styles.publicationLocationInput}>
                    <input
                        id="publication-location"
                        value={publicationLocation}
                        onChange={(event) => onLocationChange(event.target.value)}
                        placeholder="Add location"
                    />
                    <Icon name="pin-outline" size={24} />
                </div>

                {publicationLocation.trim() && (
                    <div className={styles.publicationLocationSuggestions}>
                        <button type="button" onClick={() => onLocationChange(publicationLocation.trim())}>
                            <span>{publicationLocation.trim()}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
)
