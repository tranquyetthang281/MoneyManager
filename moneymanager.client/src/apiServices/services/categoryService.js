import * as request from "../../utils/request";

export const getAllCategories = async () => await request.get('categories')
