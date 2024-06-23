import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import ClientComponent from '@/components/widgets/ClientComponent';
import Controls from '@/components/widgets/Controls';
import Messages from '@/components/widgets/Messages';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import { title } from 'process';

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

  const [configIds, setConfigIds] = useState<Map<string, string>>(new Map());

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

  useEffect(() => {
    const fetchConfigIDs = async () => {
      const q = query(collection(firestore, 'teaching_assistants'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data().title)
        console.log(doc.data().configID)
        setConfigIds(new Map(configIds.set(doc.data().title, doc.data().configID)))
      });

      console.log(configIds)
    };

    fetchConfigIDs();
  }, []); 

  return (
    <div className="flex flex-col w-[600px] h-[500px] ml-[200px] border-2 rounded-md overflow-hidden">
      <div className="bg-sky-400 text-white p-2.5 text-center">TA: {topic}</div>
      {isMicrophoneOn && <div className='flex flex-col flex-1 p-2.5 overflow-y-scroll'> 
      <VoiceProvider auth={{ type: "apiKey", value: "lOJAfmzwXjazWVwGA5fsjulJjjg5Fy8Cb8di5KulEN2utaex" }} configId={configIds.get(topic)} configVersion={0}>
      <Messages />
      <Controls />
    </VoiceProvider>
      </div>}
      {!isMicrophoneOn && <div className="flex flex-col flex-1 p-2.5 overflow-y-scroll">
        {chatMessages.map((message) => (
          <div key={message.id} className={`mb-2.5 p-2.5 rounded-md w-3/5 ${message.sender == "user" ? "self-end bg-slate-200" : "self-start bg-slate-400"}`}>
            {message.text}
          </div>
        ))}
      </div>}
      <div className="chat-input">
        <input
          className="flex-1 p-2.5 border-2 rounded-md mr-2.5"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button className="voice-button">
        <FontAwesomeIcon color={isMicrophoneOn ? 'red' : 'black'} icon={faMicrophone} onClick={handleVoiceRecording} />
        </button>
        <button className="border-0 py-2.5 px-5 text-white rounded-md cursor-pointer bg-sky-400 hover:bg-sky-600" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;