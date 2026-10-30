import s from './UserCount.module.css'

export type Prop = {
    totalCount: number
}

export const UserCount = ({ totalCount }: Prop) => {
    const getNumbers = (totalCount: number) => {
        const degits = totalCount.toString().split('')
        const zerosCount = 6 - degits.length
        return new Array(zerosCount).fill(0).concat(degits)
    }

    const totalCountArray = getNumbers(totalCount)

    return (
        <div className={s.container}>
            <span className={s.text}>Registered users:</span>
            <div className={s.count_container}>
                {totalCountArray.map((d, index) => (
                    <span key={index} className={s.degit}>
                        {d}
                    </span>
                ))}
            </div>
        </div>
    )
}
