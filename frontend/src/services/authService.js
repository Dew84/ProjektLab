import api from './api';

const authService = {
  // Regisztráció
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
      });
      
      // Token és user mentése
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          name: response.data.userName,
          email: response.data.email,
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Regisztráció sikertelen';
    }
  },

  // Bejelentkezés
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      // Token és user mentése
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          name: response.data.userName,
          email: response.data.email,
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Bejelentkezés sikertelen';
    }
  },

  // Kijelentkezés
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Jelenlegi user lekérése localStorage-ból
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Token ellenőrzése
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;