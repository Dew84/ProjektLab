import React, { useState } from 'react';

function ChatBox({ messages, user1Id, handleButtonClick }) {
    const [newMessage, setNewMessage] = useState('');

    return (
        <div className="chat-box" >
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.senderId === user1Id ? 'sent' : 'received'}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <input type="text" placeholder="Írj egy üzenetet..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={() => {
                handleButtonClick(newMessage)
                setNewMessage('')
            }}>Küldés</button>
        </div>
    );
}

export default ChatBox;