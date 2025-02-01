import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend URL
  timeout: 10000, // Request timeout in milliseconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token"); // Get the JWT token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
