import { Button } from '@/shared/ui/Button/Button'
import { Notice } from '@/shared/ui/Notice'

export const ExpiredLink = () => {
    const title = 'Email verification link expired'
    const description = 'Looks like the verification link has expired. Not to worry, we can send the link again'

    return (
        <Notice title={title} description={description} imageSrc="/expiredLink.svg">
            <Button title="Sent Link Again" variant="primary" />
        </Notice>
    )
}
