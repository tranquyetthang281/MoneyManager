import * as request from "../../utils/request";

export const getAllWalletsForUser = async (userId, accessToken) =>
    await request.get(`users/${userId}/wallets`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const getWalletForUser = async (userId, walletId, accessToken) =>
    await request.get(`users/${userId}/wallets/${walletId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const getAllWalletMembers = async (userId, walletId, accessToken) =>
    await request.get(`users/${userId}/wallets/${walletId}/members`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const createNewWallet = async (userId, walletForCreation, accessToken) =>
    await request.post(`users/${userId}/wallets`,
        walletForCreation,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const updateWallet = async (userId, walletId, walletForUpdate, accessToken) =>
    await request.put(`users/${userId}/wallets/${walletId}`,
        walletForUpdate,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })