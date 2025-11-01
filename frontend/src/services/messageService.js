import api from './api';

const messageService = {
  // Üzenet lekérése ID alapján
  getMessageById: async (id) => {
    try {
      const res = await api.get(`/message/${id}`);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Üzenet betöltése sikertelen';
    }
  },
  
  // Üzenetek lekérése beszélgetés ID alapján
  getMessageByConversationId: async (id) => {
    try {
      const res = await api.get(`/message/by-conversation/${id}`);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Üzenetek betöltése sikertelen';
    }
  },

  // Üzenet küldése
  sendMessage: async (messageDto) => {
    try {
      const res = await api.post('/message', messageDto);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Üzenet küldése sikertelen';
    }
  },

  // Üzenet módosítása
  updateMessage: async (id, updateDto) => {
    try {
      await api.put(`/message/${id}`, updateDto);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Üzenet módosítása sikertelen';
    }
  },

  // Üzenet törlése
  deleteMessage: async (id) => {
    try {
      await api.delete(`/message/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || 'Üzenet törlése sikertelen';
    }
  }
};

export default messageService;
