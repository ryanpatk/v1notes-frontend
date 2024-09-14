import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const fetchNote = async (id: string) => {
  const response = await axios.get(`${API_URL}/notes/${id}`);
  return response.data;
};

export const updateNote = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, { content });
  return response.data;
};
