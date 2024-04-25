import axios from "axios";

export const DEFAULT_API = `${import.meta.env.VITE_API_URL}`;
export const API = axios.create({
    baseURL: DEFAULT_API,
    timeout: 3000,
})