import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Sweet APIs
export const sweetAPI = {
  getAll: () => api.get('/sweets'),
  getById: (id) => api.get(`/sweets/${id}`),
  create: (sweetData) => api.post('/sweets', sweetData),
  update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),
  delete: (id) => api.delete(`/sweets/${id}`),
  purchase: (id, quantity) => api.post(`/sweets/${id}/purchase`, { quantity }),
  restock: (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity }),
};

export default api;

