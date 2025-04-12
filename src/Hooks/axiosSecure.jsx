// useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
