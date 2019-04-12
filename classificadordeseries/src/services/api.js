import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({baseURL: 'http://localhost:3022'});  

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.xtoken = `${token}`;
    }
    return config;
});

export default api;