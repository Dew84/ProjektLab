import api from './api';

const categoryService = {
  // Összes kategória (publikus)
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Kategóriák betöltése sikertelen';
    }
  },

  // Új kategória (admin only)
  createCategory: async (name) => {
    try {
      const response = await api.post('/categories', { name });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Kategória létrehozása sikertelen';
    }
  },

  // Kategória módosítása (admin only)
  updateCategory: async (id, name) => {
    try {
      await api.put(`/categories/${id}`, { name });
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Kategória módosítása sikertelen';
    }
  },

  // Kategória törlése (admin only)
  deleteCategory: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Kategória törlése sikertelen';
    }
  },
};

export default categoryService;