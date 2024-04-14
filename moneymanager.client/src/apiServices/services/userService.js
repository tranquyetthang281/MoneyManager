import * as request from "../../utils/request";

export const getAllUsers = async () => await request.get('users')