import axios from "axios";

const request = axios.create({
    baseURL: '/api/'
})

export const get = async (path, config = {}) => {
    const response = await request.get(path, config)
    return response.data
};

export const post = async (path, data, config = {}) => {
    const response = await request.post(path, data, config)
    return response.data
}

export const put = async (path, data, config = {}) => {
    const response = await request.put(path, data, config)
    return response.data
}