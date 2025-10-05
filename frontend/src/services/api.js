// src/services/api.js
import axios from 'axios';

// ENV: REACT_APP_API_URL-t használunk, különben localhost:5209
// Ha nem /api-ra végződik, hozzáfűzzük.
const envBase = process.env.REACT_APP_API_URL || 'http://localhost:5209';
const BASE_URL = envBase.endsWith('/api') ? envBase : `${envBase}/api`;

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Kimenő kérések: Bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Bejövő válaszok: 401 → token törlés, de NINCS redirect
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // nem navigálunk sehova; az App/Home mutatja a login/reg gombokat
            // ha mégis akarsz UI szintű váltást, azt az App.js-ben kezeld state-tel
        }
        return Promise.reject(error);
    }
);

export default api;
