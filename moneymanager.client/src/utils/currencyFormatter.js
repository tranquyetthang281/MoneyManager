import { CURRENCY_UNIT } from "./constants"

const currencyFormatter = (amount) =>
    `${amount > 0 ? '+' : ''}${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${CURRENCY_UNIT}`

export default currencyFormatter