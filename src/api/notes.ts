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

export const fetchNotes = async () => {
  const response = await axiosInstance.get('/notes');
  return response.data;
};

export const fetchNote = async (id: string) => {
  const response = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  categoryId: string;
}) => {
  const response = await axiosInstance.post('/notes', note);
  return response.data;
};

export const updateNote = async ({
  id,
  ...note
}: {
  id: string;
  title?: string;
  content?: string;
  categoryId?: string;
}) => {
  const response = await axiosInstance.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};
