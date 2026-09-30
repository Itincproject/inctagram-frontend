import { Suspense } from 'react'
import RegistrationConfirmation from '@/features/auth/registration-confirmation/ui/RegistrationConfirmation'


export default function RegistrationConfirmationPage() {
    return (
        <Suspense fallback={<div>Checking verification link...</div>}>
            <RegistrationConfirmation />
        </Suspense>
    )
}