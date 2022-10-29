import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://sheca-api.azurewebsites.net"
})

// axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// axiosInstance.interceptors.request.use(
//     config => {
//       if (!config.headers.Authorization) {
//         const token = JSON.parse(localStorage.getItem("keyCloak")).token;

//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//       }

//       return config;
//     },
//     error => Promise.reject(error)
//   );

export default axiosInstance