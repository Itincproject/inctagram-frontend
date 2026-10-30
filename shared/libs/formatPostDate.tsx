export const formatPostDate = (publishedAt: string): string => {
    const publishedDate = new Date(publishedAt)
    const now = new Date()

    const difference = now.getTime() - publishedDate.getTime()
    const minutesPassed = Math.floor(difference / (1000 * 60))
    const hoursPassed = Math.floor(minutesPassed / 60)

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const isYesterday =
        publishedDate.getDate() === yesterday.getDate() &&
        publishedDate.getMonth() === yesterday.getMonth() &&
        publishedDate.getFullYear() === yesterday.getFullYear()

    const relativeFormatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'always',
    })
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    })
    const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    if (difference <= 1000) return 'Just now'
    else if (minutesPassed < 60) {
        return relativeFormatter.format(-minutesPassed, 'minute')
    } else if (hoursPassed < 24) {
        return relativeFormatter.format(-hoursPassed, 'hour')
    } else if (isYesterday) {
        return `Yesterday at ${timeFormatter.format(publishedDate)}`
    }

    return dateFormatter.format(publishedDate)
}
