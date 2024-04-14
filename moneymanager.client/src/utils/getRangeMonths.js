import dateFormat from "dateformat";

const getStringOfMonth = (firstDay, lastDay) => {
    const dateFormatStr = "dd/mm/yyyy"
    return `${dateFormat(firstDay, dateFormatStr)}-${dateFormat(lastDay, dateFormatStr)}`
}

/**
 * @param {Date} centerMonth
 */
export const getRangeMonths = (centerMonth) => {
    const firstDayInCenterMonth = new Date(centerMonth.getFullYear(), centerMonth.getMonth(), 1)
    const lastDayInCenterMonth = new Date(centerMonth.getFullYear(), centerMonth.getMonth() + 1, 0)
    const firstDayInLeftMonth = new Date(centerMonth.getFullYear(), centerMonth.getMonth() - 1, 1)
    const lastDayInLeftMonth = new Date(centerMonth.getFullYear(), centerMonth.getMonth(), 0)
    const firstDayInRightMonth = new Date(centerMonth.getFullYear(), centerMonth.getMonth() + 1, 1)
    const lastDayInRightMonth = new Date(firstDayInRightMonth.getFullYear(), firstDayInRightMonth.getMonth() + 1, 0)

    const leftMonthStr = getStringOfMonth(firstDayInLeftMonth, lastDayInLeftMonth)
    const centerMonthStr = getStringOfMonth(firstDayInCenterMonth, lastDayInCenterMonth)
    const rightMonthStr = getStringOfMonth(firstDayInRightMonth, lastDayInRightMonth)

    return [leftMonthStr, centerMonthStr, rightMonthStr]
}