import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rbac-backend-theta.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Request Interceptor - Adds Token to Headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor - Handle Unauthorized Errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';  // Redirect to login if unauthorized
        }
        return Promise.reject(error);
    }
);

// Auth API Calls
export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

// Get User Dashboard Data
export const getDashboardData = async (role) => {
    const response = await api.get(`/users/${role}`);
    return response.data;
};

export default api;
