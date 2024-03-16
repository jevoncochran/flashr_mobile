import axios from "axios";

const BASE_URL = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as api };
