import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST;

const api = axios.create({
  baseURL: `${HOST}/api`,
  headers: { 'Content-Type': 'application/json' }, 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
