import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
