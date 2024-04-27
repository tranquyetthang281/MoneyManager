import * as request from "@/utils/request";
import dateFormat from "dateformat";

export const getTransactionsInMonthForWallet = async (userId, walletId, time, accessToken) =>
    await request.get(`users/${userId}/wallets/${walletId}/transactions`,
        {
            params: {
                time: dateFormat(time, 'yyyy-mm')
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const getAllTransactionsInMonth = async (userId, time, accessToken) =>
    await request.get(`users/${userId}/transactions`,
        {
            params: {
                time: dateFormat(time, 'yyyy-mm')
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })


export const createNewTransaction = async (userId, walletId, transactionForCreation, accessToken) =>
    await request.post(`users/${userId}/wallets/${walletId}/transactions`,
        transactionForCreation,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const updateTransaction = async (userId, walletId, transactionId, transactionForUpdate, accessToken) =>
    await request.put(`users/${userId}/wallets/${walletId}/transactions/${transactionId}`,
        transactionForUpdate,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const deleteTransaction = async (userId, walletId, transactionId, accessToken) =>
    await request.delete_(`users/${userId}/wallets/${walletId}/transactions/${transactionId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })