import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => localStorage.removeItem('user');

// verify email
const verifyEmail = async (verificationToken) => {
  const response = await axios.get(
    `${API_URL}verify-email/${verificationToken}`,
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  verifyEmail,
};

export default authService;
