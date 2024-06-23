import React from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';

interface InputBoxProps {
    hint: string;
    attach: boolean
}

const InputBox: React.FC<InputBoxProps> = ({ hint, attach }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full bg-white relative">
      <textarea
        placeholder={hint}
        className="flex-grow p-2 border-none focus:outline-none text-black placeholder-gray-400 resize-none"
        rows={3}
      ></textarea>
      {attach && (<button className="absolute bottom-2 right-14 bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400">
        <AiOutlinePaperClip className="h-5 w-5"/>
      </button>)}
    </div>
  );
};

export default InputBox;
