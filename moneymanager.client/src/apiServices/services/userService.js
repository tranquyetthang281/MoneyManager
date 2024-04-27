import * as request from "../../utils/request";

export const getUser = async (userId, accessToken) =>
    await request.get(`users/${userId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })

export const updateUser = async (userId, userForUpdate, accessToken) =>
    await request.put(`users/${userId}`,
        userForUpdate,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })