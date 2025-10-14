import api from './api';

const pictureService = {
  // Adott hirdetés képeinek lekérése
  getPictures: async (adId) => {
    try {
      const response = await api.get(`/picture/${adId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Képek betöltése sikertelen';
    }
  },

  // Képek feltöltése egy hirdetéshez
  uploadPictures: async (adId, files) => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await api.post(`/picture/${adId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Feltöltés sikertelen';
    }
  },

  // Egy kép törlése kép ID alapján
  deletePicture: async (pictName) => {
    try {
      const response = await api.delete(`/picture/${pictName}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Törlés sikertelen';
    }
  },

  // Hirdetés összes képének törlése
  deletePicturesByAd: async (adId) => {
    try {
      const response = await api.delete(`/picture/byadid/${adId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Törlés sikertelen';
    }
  }
};

export default pictureService;
