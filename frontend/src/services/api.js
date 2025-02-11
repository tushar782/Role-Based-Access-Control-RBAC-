import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rbac-backend-theta.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // Add this to handle CORS
        'Access-Control-Allow-Credentials': true
    }
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);  // Add error logging
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API Calls with error handling
export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Register Error:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getDashboardData = async (role) => {
    try {
        const response = await api.get(`/users/${role}`);
        return response.data;
    } catch (error) {
        console.error('Dashboard Error:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
