import dayjs from "dayjs"

export const today = new Date(dayjs().format('MM DD YYYY')).valueOf()
export const now = new Date().valueOf()
export const todayFormat = dayjs(today).format('DD MM YYYY')
export const tomorrow = dayjs(today + 86400000).format('DD MM YYYY')
export const tomorrowVal = today + 86400000