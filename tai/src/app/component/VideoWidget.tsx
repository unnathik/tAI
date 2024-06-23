import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import {faVideo} from '@fortawesome/free-solid-svg-icons';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import ClientComponent from '@/components/widgets/ClientComponent';
import Controls from '@/components/widgets/Controls';
import Messages from '@/components/widgets/Messages';
import {FaceWidgets} from '@/components/widgets/FaceWidgets';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
type AppProps = {
    topic: string;
}

const VideoWidget: React.FC<AppProps> = ({topic}) => {
  const [isVideoOn, setVideoOn] = useState(false)
  const handleVideoRecording = () => {
    // voice recording
    console.log('begin video recording');
    setVideoOn(!isVideoOn)
  }

  return (
    <div className="flex w-3/12 border-2 rounded-md overflow-hidden">
      <div className="bg-sky-400 text-white p-2.5 text-center">TA: {topic}</div>
      {isVideoOn && <div className='videostuff flex flex-col flex-1 p-2.5 overflow-y-scroll'> 
        <p>Video</p>
        <FaceWidgets />
      </div>}
      <button className="video-button w-1/12">
          <FontAwesomeIcon color={isVideoOn ? 'red' : 'black'} icon={faVideo} onClick={handleVideoRecording} />
      </button>
    </div>
  );
};

export default VideoWidget;