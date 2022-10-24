import axiosInstance from "../config/axiosConfig"

export const registerQuery = async ({ email, password }) => {
    return await axiosInstance.post("/api/auth/register", {
        email: email,
        password: password
    })
}

export const loginQuery = async ({ email, password }) => {
    return await axiosInstance.post("/api/auth/login", {
        email: email,
        password: password
    })
}