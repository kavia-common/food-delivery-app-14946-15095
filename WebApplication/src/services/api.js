import axios from 'axios';

/**
 * API client singleton configured with:
 * - Base URL from REACT_APP_API_GATEWAY_URL
 * - Auth token from localStorage (Authorization: Bearer <token>)
 * - JSON handling and basic error logging
 */
const baseURL = process.env.REACT_APP_API_GATEWAY_URL || '';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token to each request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic error handling / logging
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Optionally map error response
    if (error.response && error.response.status === 401) {
      // token invalid/expired: optionally clear local session
      // localStorage.removeItem('auth_token');
    }
    // eslint-disable-next-line no-console
    console.error('API Error:', error?.response?.status, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
