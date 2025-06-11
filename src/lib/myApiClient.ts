import axios from 'axios';
import { BACKEND_API_URL } from '@/config';

const myApiClient = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors without authentication
myApiClient.interceptors.response.use(
    (response: any) => response,
    (error: any) => Promise.reject(error)
);

export default myApiClient;
