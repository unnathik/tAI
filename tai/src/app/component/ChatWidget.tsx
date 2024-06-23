import React, { useState, useEffect } from 'react';
import './ChatWidget.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length,
        text: input,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">Chat Box</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
