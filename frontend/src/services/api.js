import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rbac-backend-theta.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Remove this header as it's causing the CORS issue
    delete config.headers['Access-Control-Allow-Credentials'];
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor with better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Response Error:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.message);
        throw error;
    }
};

export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Register Error:', error.message);
        throw error;
    }
};

export const getDashboardData = async (role) => {
    try {
        const response = await api.get(`/users/${role}`);
        return response.data;
    } catch (error) {
        console.error('Dashboard Error:', error.message);
        throw error;
    }
};

export default api;
