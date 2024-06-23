import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone, faVideo} from '@fortawesome/free-solid-svg-icons';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import ClientComponent from '@/components/widgets/ClientComponent';
import Controls from '@/components/widgets/Controls';
import Messages from '@/components/widgets/Messages';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import {FaceWidgets} from '@/components/widgets/FaceWidgets';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
type AppProps = {
    topic: string;
    refresh: boolean;
}

const ChatWidget: React.FC<AppProps> = ({topic, refresh}) => {
  const [chatMessages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isMicrophoneOn, setMicrophoneOn] = useState(false)

  const [configIds, setConfigIds] = useState<Map<string, string>>(new Map());
  const [isVideoOn, setVideoOn] = useState(false)

  if (refresh && (isMicrophoneOn || isVideoOn || chatMessages.length > 0)) {
    setMicrophoneOn(false);
    setMessages([]);
    setVideoOn(false);
    console.log('reset')
  }
  
  const handleVideoRecording = () => {
    // voice recording
    console.log('begin video recording');
    setVideoOn(!isVideoOn)
  }

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
    <div className="flex flex-col w-8/12 h-5/6 border-2 rounded-md overflow-hidden">
      <div className="bg-sky-400 text-white p-2.5 text-center">TA: {topic}</div>
      {isMicrophoneOn && <div className='flex flex-col flex-1 p-2.5 overflow-y-scroll'> 
      <VoiceProvider auth={{ type: "apiKey", value: "lOJAfmzwXjazWVwGA5fsjulJjjg5Fy8Cb8di5KulEN2utaex" }} configId={configIds.get(topic)} configVersion={0}>
        <Messages />
        <Controls topic={topic}/>
      </VoiceProvider>
      </div>}
      {!isMicrophoneOn && <div className="flex flex-col flex-1 p-2.5 overflow-y-scroll">
        {chatMessages.map((message) => (
          <div key={message.id} className={`mb-2.5 p-2.5 rounded-md w-3/5 ${message.sender == "user" ? "self-end bg-slate-200" : "self-start bg-slate-400"}`}>
            {message.text}
          </div>
        ))}
      </div>}
      <div className="chat-input p-2">
        <input
          className="flex-1 border-2 rounded-md w-8/12"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button className="voice-button w-1/12">
          <FontAwesomeIcon color={isMicrophoneOn ? 'red' : 'black'} icon={faMicrophone} onClick={handleVoiceRecording} />
        </button>
        <button className="video-button w-1/12">
          <FontAwesomeIcon color={isVideoOn ? 'red' : 'black'} icon={faVideo} onClick={handleVideoRecording} />
        </button>
        <button className="border-0 text-white rounded-md cursor-pointer bg-sky-400 hover:bg-sky-600 w-2/12" onClick={handleSendMessage}>Send</button>
      </div>
      {isVideoOn && (
        <div className="video h-100 w-full">
          <div className="videostuff flex flex-1 p-2.5 max-h-[25vh] overflow-auto items-center justify-center">
            <FaceWidgets />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;