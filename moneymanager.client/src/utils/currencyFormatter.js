import { CURRENCY_UNIT } from "./constants"

const currencyFormatter = (amount) =>
    `${amount > 0 ? '+' : ''}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${CURRENCY_UNIT}`

export default currencyFormatter

export const currencyFormatterByK = (amount) => {
    let k = 'k'
    if (Math.abs(amount) < 1) {
        amount *= 1000
        k = ''
    }
    return `${amount > 0 ? '+' : ''}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${k} ${CURRENCY_UNIT}`
}
