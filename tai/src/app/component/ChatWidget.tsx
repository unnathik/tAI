import React, { useState, useEffect } from 'react';
import './ChatWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
type AppProps = {
    topic: string;
}

const ChatWidget: React.FC<AppProps> = ({topic}) => {
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

      // call API to send message to model here

    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleVoiceRecording = () => {
    // voice recording
    console.log('begin voice recording');
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">TA: {topic}</div>
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
        <button className="voice-button">
        <FontAwesomeIcon icon={faMicrophone} onClick={handleVoiceRecording} />
        </button>
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
