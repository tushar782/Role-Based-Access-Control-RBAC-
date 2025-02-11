import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7001/api',
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const getDashboardData = async (role) => {
    const response = await api.get(`/users/${role}`);
    return response.data;
};

export default api;