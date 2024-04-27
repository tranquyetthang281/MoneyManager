import * as request from "../../utils/request";

export const logIn = async (userInfo) => await request.post('authentication/login', userInfo)

export const register = async (userInfo) => await request.post('authentication/register', userInfo)