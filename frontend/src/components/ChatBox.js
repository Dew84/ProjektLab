import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

function ChatBox({ messages, user1Id, handleButtonClick }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="messages-container" ref={messagesEndRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === user1Id ? "sent" : "received"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <textarea
        rows="4"
        placeholder="Írj egy üzenetet..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        onClick={() => {
          handleButtonClick(newMessage);
          setNewMessage("");
        }}
      >
        Küldés
      </button>
    </div>
  );
}

export default ChatBox;
