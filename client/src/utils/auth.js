import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('userToken');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('userToken');
  if (!token) return null;
  // Decode token to get user info, or call API to get user profile
  return { token };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
