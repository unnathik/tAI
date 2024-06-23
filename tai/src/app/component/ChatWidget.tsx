import React, { useState, useEffect } from 'react';
import './ChatWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import ClientComponent from '@/components/widgets/ClientComponent';
import Controls from '@/components/widgets/Controls';
import Messages from '@/components/widgets/Messages';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
type AppProps = {
    topic: string;
}

const ChatWidget: React.FC<AppProps> = ({topic}) => {
  const [chatMessages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isMicrophoneOn, setMicrophoneOn] = useState(false)

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: chatMessages.length,
        text: input,
        sender: 'user',
      };
      setMessages([...chatMessages, newMessage]);
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
    setMicrophoneOn(!isMicrophoneOn)
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">TA: {topic}</div>
      {isMicrophoneOn && <div className='chat-messages'> 
      <VoiceProvider auth={{ type: "apiKey", value: "gvHXvjuGGa4tgeY4wFkinI1XUSVLKftGlPiyYsWkGX2aRTGq" }}>
      <Messages />
      <Controls />
    </VoiceProvider>
      </div>}
      {!isMicrophoneOn && <div className="chat-messages">
        {chatMessages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button className="voice-button">
        <FontAwesomeIcon color={isMicrophoneOn ? 'red' : 'black'} icon={faMicrophone} onClick={handleVoiceRecording} />
        </button>
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;