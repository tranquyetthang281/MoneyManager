import * as request from "../../utils/request";

export const logIn = async (userInfo) => await request.post('authentication/login', userInfo)
