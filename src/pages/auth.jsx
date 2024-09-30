import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Register a new user
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    localStorage.setItem('token', response.data.token);
    console.log('User registered:', response.data.token);
  } catch (error) {
    console.error('Registration error:', error);
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    console.log('User logged in:', response.data.token);
  } catch (error) {
    console.error('Login error:', error);
  }
};
