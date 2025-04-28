import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createCollege = async (collegeData) => {
  const response = await api.post('/colleges', collegeData);
  return response.data;
};

export const getColleges = async () => {
  const response = await api.get('/colleges');
  return response.data;
};

export const createDepartment = async (departmentData) => {
  const response = await api.post('/departments', departmentData);
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get('/departments');
  return response.data;
};

export default api;