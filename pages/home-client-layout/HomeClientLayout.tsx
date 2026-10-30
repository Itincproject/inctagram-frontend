'use client'

import { useGetMeQuery } from '@/features/auth/api/authApi'
import { getCommonErrorMessage } from '@/shared/libs/getCommonErrorMessage'
import { isFetchBaseQueryError } from '@/shared/libs/isFetchBaseQueryError'
import { Header } from '@/widgets/Header'
import { ReactNode } from 'react'
import s from './HomeClientLayout.module.css'
import { Sidebar } from '@/widgets/Sidebar/Sidebar'

import { Alert } from '@/shared/ui/Alert/Alert'

type Props = {
    children: ReactNode
}

export const HomeClientLayout = ({ children }: Props) => {
    const { data, error, isLoading, isError } = useGetMeQuery()
    let alertError = ''

    const isAuth = Boolean(data) && !isError

    if (error && isFetchBaseQueryError(error)) {
        const messageError = getCommonErrorMessage(error)

        if (messageError) alertError = messageError
    }
    return (
        <div className={s.page}>
            <Header isAuth={isAuth} />
            <div className={`${s.main_container} ${isAuth ? s.authorized : s.unauthorized}`}>
                {isAuth && <Sidebar />}
                <main className={s.static_part}>{children}</main>
            </div>
            {alertError && <Alert variant="error" message={alertError} />}
        </div>
    )
}
