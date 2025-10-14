// src/services/authService.js
import api from './api';
import userService from './userService';

const authService = {
  // === REGISZTRÁCIÓ ===
  register: async ({ userName, email, password }) => {
    try {
      const res = await api.post('/auth/register', { userName, email, password });

      // Ha azonnal kapsz tokent, automatikus beléptetés
      const token = res?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        const me = await userService.me();
        localStorage.setItem('user', JSON.stringify({
          id: me.id,
          userName: me.userName,
          email: me.email,
        }));
      }

      return res.data; // ha nincs token, a UI visszaküldhet a loginra
    } catch (error) {
      throw error?.response?.data?.message || 'Regisztráció sikertelen';
    }
  },

  // === BEJELENTKEZÉS ===
  login: async ({ email, password }) => {
    try {
      // csak e-mail + jelszó mehet, userName nem támogatott
      const cleanEmail = (email ?? '').trim().toLowerCase();
      if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
        throw new Error('Adj meg érvényes e-mail címet.');
      }

      const res = await api.post('/auth/login', { email: cleanEmail, password });

      const token = res?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        const me = await userService.me();
        localStorage.setItem('user', JSON.stringify({
          id: me.id,
          userName: me.userName,
          email: me.email,
        }));
      }

      return res.data;
    } catch (error) {
      throw error?.response?.data?.message || 'Bejelentkezés sikertelen';
    }
  },

  // === KIJELENTKEZÉS ===
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // === USER LEKÉRÉSE LOKÁLBÓL ===
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // === TOKEN ELLENŐRZÉS ===
  isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
