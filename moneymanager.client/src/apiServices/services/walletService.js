import * as request from "../../utils/request";

export const getAllWalletsForUser = async (userId) => await request.get(`users/${userId}/wallets`)

export const getWalletForUser = async (userId, walletId) =>
    await request.get(`users/${userId}/wallets/${walletId}`)