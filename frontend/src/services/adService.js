import api from './api';

const adService = {
  // Hirdetések listázása (publikus)
  getAds: async (params = {}) => {
    try {
      const response = await api.get('/ads', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Hirdetések betöltése sikertelen';
    }
  },

  // Egy hirdetés lekérése
  getAdById: async (id) => {
    try {
      const response = await api.get(`/ads/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Hirdetés betöltése sikertelen';
    }
  },

  // Saját hirdetések
  getMyAds: async (page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/ads/mine', {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Saját hirdetések betöltése sikertelen';
    }
  },

  // Új hirdetés létrehozása
  createAd: async (adData) => {
    try {
      const response = await api.post('/ads', {
        title: adData.title,
        description: adData.description,
        price: adData.price,
        categoryIds: adData.categoryIds,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Hirdetés létrehozása sikertelen';
    }
  },

  // Hirdetés módosítása
  updateAd: async (id, adData) => {
    try {
      const response = await api.put(`/ads/${id}`, adData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Hirdetés módosítása sikertelen';
    }
  },

  // Hirdetés törlése
  deleteAd: async (id) => {
    try {
      await api.delete(`/ads/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Hirdetés törlése sikertelen';
    }
  },

  // Keresés
  searchAds: async (keyword, categoryId = null, page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/ads', {
        params: { keyword, categoryId, page, pageSize },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Keresés sikertelen';
    }
  },
};

export default adService;