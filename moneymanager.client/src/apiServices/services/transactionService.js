import * as request from "../../utils/request";
import dateFormat from "dateformat";

export const getTransactionsInMonthForWallet = async (userId, walletId, time) =>
    await request.get(`users/${userId}/wallets/${walletId}/transactions`,
        {
            params: {
                time: dateFormat(time, 'yyyy-mm')
            }
        })

export const getAllTransactionsInMonth = async (userId, time) =>
    await request.get(`users/${userId}/transactions`,
        {
            params: {
                time: dateFormat(time, 'yyyy-mm')
            }
        })


export const createNewTransaction = async (userId, walletId, transactionForCreation) =>
    await request.post(`users/${userId}/wallets/${walletId}/transactions`,
        transactionForCreation)

export const updateTransaction = async (userId, walletId, transactionId, transactionForUpdate) =>
    await request.put(`users/${userId}/wallets/${walletId}/transactions/${transactionId}`,
        transactionForUpdate)