import api from './api';

const conversationService = {
  // Résztvevők közti beszélgetés lekérése
  getConversation: async (user1id, user2id, createIfNotExists) => {
    try {
      const res = await api.get(`/conversation/${user1id}/${user2id}?createIfNotExists=${createIfNotExists}`);
      return res.data;
    } catch (error) {
      console.error('Hiba a beszélgetés lekérésekor:', error.response);
      throw error;
    }
  },
  // Felhasználó összes beszélgetésének lekérése
  getConversationsByUserId: async (userId) => {
    try {
      const res = await api.get(`/conversation/${userId}`);
      return res.data;
    } catch (error) {
      console.error('Hiba a beszélgetések lekérésekor:', error.response);
      throw error;
    }
  },
  // Van-e a felhasználónak olvasatlan üzenete
  getNewMessageExistByUserId: async (userId) => {
    try {
      const res = await api.get(`/conversation/has-newmessages${userId}`);
      return res.status;
    } catch (error) {
      console.error('Hiba az új üzenetek lekérésekor:', error.response);
      throw error;
    }
  }
};

export default conversationService;
