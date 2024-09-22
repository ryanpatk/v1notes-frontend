import axios from 'axios';

const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};

export const createCategory = async (category: { name: string }) => {
  const response = await axiosInstance.post('/categories', category);
  return response.data;
};
