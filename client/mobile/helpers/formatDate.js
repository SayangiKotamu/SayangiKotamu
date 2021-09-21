import { masa } from 'masa'

export function formatDate(date) {
    return masa(date).format()
}

export function formatDateWithHour(date) {
    return masa(date).format('dddd, D MMMM YYYY [pukul] HH[:]MM')
}
