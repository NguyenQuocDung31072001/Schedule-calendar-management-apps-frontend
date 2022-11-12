import axiosInstance from "../config/axiosConfig";

export const registerMutationApi = async ({ email, password }) => {
  return await axiosInstance.post("/api/auth/register", {
    email: email,
    password: password,
  });
};

export const loginMutationApi = async ({ email, password }) => {
  return await axiosInstance.post("/api/auth/login", {
    email: email,
    password: password,
  });
};
export const verifyAccountMutationApi = async ({ email, code }) => {
  return await axiosInstance.post("/api/auth/verify-account", {
    email: email,
    code: code,
  });
};

export const forgotPasswordMutationApi = async (email) => {
  return await axiosInstance.post("/api/auth/forgot-password", {
    email: email,
  });
};

export const verifyCodeRePasswordMutationApi = async ({ email, code }) => {
  return await axiosInstance.post("/api/auth/verify-code-repassword", {
    email: email,
    code: code,
  });
};
export const resetPasswordMutationApi = async ({ token, password }) => {
  return await axiosInstance.post("/api/auth/reset-password", {
    token: token,
    password: password,
  });
};
