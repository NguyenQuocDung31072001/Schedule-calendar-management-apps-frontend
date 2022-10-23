import axiosInstance from "../config/axiosConfig"

export const registerApi = async ({ email, password, navigate }) => {
    const result = await axiosInstance.post("/api/auth/register",
        {
            email: email,
            password: password
        }
    )
    if (result.status === 200) {
        navigate("/login")
    }
    console.log({ result })
}
export const loginApi = async ({ email, password, navigate }) => {
    const result = await axiosInstance.post("/api/auth/login",
        {
            email: email,
            password: password
        }
    )
    if (result.status === 200) {
        navigate("/schedule")
    }
    console.log({ result })
}