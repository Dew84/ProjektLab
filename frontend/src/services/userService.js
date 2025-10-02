import api from './api';

const userService = {
  // Saját profil
  getMe: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Profil betöltése sikertelen';
    }
  },

  // Profil módosítása
  updateMe: async (userData) => {
    try {
      await api.put('/users/me', userData);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Profil módosítása sikertelen';
    }
  },

  // Felhasználó lekérése (admin vagy saját)
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Felhasználó betöltése sikertelen';
    }
  },

  // Összes felhasználó (admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Felhasználók betöltése sikertelen';
    }
  },

  // Felhasználó törlése (admin only)
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Felhasználó törlése sikertelen';
    }
  },
};

export default userService;