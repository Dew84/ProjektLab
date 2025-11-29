import React, { useState, useEffect } from "react";
import conversationService from "../services/conversationService";
import messageService from "../services/messageService";
import ChatBox from "../components/ChatBox";
import { useParams } from "react-router-dom";

function ChatPage({ user1 }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user2Id } = useParams();

  const user2IdNum = parseInt(user2Id, 10);
  useEffect(() => {
    if (!user1 || !user2IdNum) return;
    const fetchData = async () => {
      try {
        const conversationData = await conversationService.getConversation(
          user1.id,
          user2IdNum,
          true
        );
        setConversation(conversationData);
      } catch (err) {
        console.error("hiba:", err);
        setError("Nem sikerült betölteni a beszélgetést.");
      }
    };

    fetchData();
  }, [user1, user2Id]);

  useEffect(() => {
    if (!conversation) return;
    let intervalId;
    const fetchData = async () => {
      try {
        const messagesData = await messageService.getMessageByConversationId(
          conversation.id
        );
        setMessages(messagesData);
      } catch (err) {
        console.error(err.message || "Hiba történt az üzenetek betöltéskor.");
      }
    };

    fetchData();

    intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [conversation]);

  useEffect(() => {
    const updateMessages = async () => {
      if(!conversation) return;
      try {
        await conversationService.updateMessagesByUserId(
          conversation.id,
          user2IdNum
        );

      } catch (err) {
        console.error(err.message || "Hiba történt az üzenetek betöltéskor.");
      }
    };

    updateMessages();
  }, [conversation]);

  const handleButtonClick = (message) => {
    console.log("Üzenet küldése:", message);
    try {
      if (message.trim() === "") alert("Az üzenet nem lehet üres.");
      messageService.sendMessage({
        conversationId: conversation.id,
        senderId: user1.id,
        content: message,
      });
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), senderId: user1.id, content: message },
      ]);
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Üzenet küldése sikertelen.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Betöltés...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="chat-page">
      <ChatBox
        messages={messages}
        handleButtonClick={handleButtonClick}
        user1Id={user1.id}
      />
    </div>
  );
}

export default ChatPage;
