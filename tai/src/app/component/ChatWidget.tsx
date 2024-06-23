import React, { useState } from 'react';
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
    <div className="flex flex-col w-[600px] h-[500px] ml-[200px] border-2 rounded-md overflow-hidden">
      <div className="bg-sky-400 text-white p-2.5 text-center">TA: {topic}</div>
      <div className="flex flex-col flex-1 p-2.5 overflow-y-scroll">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2.5 p-2.5 rounded-md w-3/5 ${message.sender == "user" ? "self-end bg-slate-200" : "self-start bg-slate-400"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-2.5 border-t-2">
        <input
          className="flex-1 p-2.5 border-2 rounded-md mr-2.5"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button className="w-[30px] h-[30px] border-0 bg-slate-200 text-white rounded-md cursor-pointer mr-2 self-center">
        <FontAwesomeIcon icon={faMicrophone} onClick={handleVoiceRecording} />
        </button>
        <button className="border-0 py-2.5 px-5 text-white rounded-md cursor-pointer bg-sky-400 hover:bg-sky-600" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
