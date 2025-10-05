// src/services/userServices.js
import api from './api';

const userService = {
  // Saját profil lekérése
  me: async () => {
    try {
      const { data } = await api.get('/users/me');
      return data; // { id, userName, email, ... }
    } catch (error) {
      throw error?.response?.data?.message || 'Profil betöltése sikertelen';
    }
  },

  // Saját profil módosítása (frissített profilt ad vissza)
  updateMe: async (userData) => {
    try {
      const { data } = await api.put('/users/me', userData);
      return data; // backendtől függően visszajöhet a friss user; ha nem, keep as is
    } catch (error) {
      throw error?.response?.data?.message || 'Profil módosítása sikertelen';
    }
  },

  // (admin) felhasználó lekérése
  getUserById: async (id) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      return data;
    } catch (error) {
      throw error?.response?.data?.message || 'Felhasználó betöltése sikertelen';
    }
  },

  // (admin) összes user
  getAllUsers: async () => {
    try {
      const { data } = await api.get('/users');
      return data;
    } catch (error) {
      throw error?.response?.data?.message || 'Felhasználók betöltése sikertelen';
    }
  },

  // (admin) törlés
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw error?.response?.data?.message || 'Felhasználó törlése sikertelen';
    }
  },
};

export default userService;
