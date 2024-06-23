import React, { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { FaWandMagicSparkles } from "react-icons/fa6";

interface InputBoxProps {
    hint1: string;
    hint2: string;
    attach: boolean;
    submit: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ hint1, hint2, attach, submit }) => {
  const [textValue1, setTextValue1] = useState(''); // State for the first textarea
  const [textValue2, setTextValue2] = useState(''); // State for the second textarea

  const handleFileAttachment = () => {
    document.getElementById('fileInput').click(); // Triggers the file input when the paperclip button is clicked
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
    console.log('First Textbox Value:', textValue1);
    console.log('Second Textbox Value:', textValue2);
    // Add any additional submit logic here, such as sending data to a server
  };

  return (
    <div className='mb-4'>
      <div className="items-center border border-gray-300 rounded-lg p-2 w-full bg-white relative h-12 mb-1">
        <textarea
          placeholder={hint1}
          className="border-none focus:outline-none text-black w-full placeholder-gray-400 h-full"
          value={textValue1}
          onChange={(e) => setTextValue1(e.target.value)}
        ></textarea>
      </div>
      <div className="items-center border border-gray-300 rounded-lg p-2 w-full bg-white relative h-24">
        <textarea
          placeholder={hint2}
          className="border-none focus:outline-none text-black w-full placeholder-gray-400 h-full"
          value={textValue2}
          onChange={(e) => setTextValue2(e.target.value)}
        ></textarea>
        <div className="absolute bottom-0 right-0 p-4 flex">
          {attach && (
            <>
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={() => console.log('File selected')} />
              <button
                aria-label="Attach file"
                className="bg-gray-300 mr-2 text-black p-2 rounded-lg hover:bg-gray-400"
                onClick={handleFileAttachment}
              >
                <AiOutlinePaperClip className="h-5 w-5"/>
              </button>
            </>
          )}
          {submit && (
            <button
              aria-label="Submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              <FaWandMagicSparkles className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputBox;