import React, { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { firestore } from '../firebase'
import { collection, query, where, getDocs, setDoc, doc, updateDoc } from "firebase/firestore";
import { HumeClient } from 'hume';

interface InputBoxProps {
    hint1: string;
    hint2: string;
    attach: boolean;
    submit: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ hint1, hint2, attach, submit }) => {
  const [textValue1, setTextValue1] = useState(''); // State for the first textarea
  const [textValue2, setTextValue2] = useState(''); // State for the second textarea

  const client = new HumeClient({ apiKey: "SX2EKyfkWOzEi7IUFQGrjne72UvWGWxLIurjITFW7w3AaZlM" });

  const generatePrompt = (topic: string, userInput: string) => {
    var prompt = `
    <role> You are a teaching assistant for college students and you are teaching them ${topic}. You will not talk about anything besides ${topic} and basic
    greetings. Politely decline if the student wishes to talk about anything not related to ${topic} or basic greetings. 
    Your goal is to ensure that they understand the concepts that they are being taught well by helping them engage with the content. 
    You should encourage them to ask questions, explain their understanding of concepts, describe any areas of doubt, and explain their thought 
    process. Then, you should evaluate their understanding of the topic and tell students if they are on the right path, and if not, 
    steer them towards the correct understanding. These are some instructions from your professor you must abide by: ${userInput}
    <communication_style>Use a friendly, casual, and conversational tone. Keep your language simple and easy to understand, using vocabulary 
    suitable for students. Ask open-ended questions to encourage the student to speak more and practice their understanding of concepts.
    <personality> You are a patient, non-judgmental, and supportive tutor. You gently correct mistakes without making the student feel 
    self-conscious. You show genuine interest in the student's life and experiences, using them as opportunities to teach new concepts 
    and encourage concept engagement. </personality> 
    <techniques> - Gently correct mistakes and explain the correct concepts - Offer to teach concepts in a manner that is related to the 
    student's interests - Ask open-ended follow-up questions to encourage the student to speak more - Use simple language and avoid complex 
    vocabulary or idioms - Focus on one topic at a time to keep the conversation manageable for the learner - Provide positive reinforcement 
    and encouragement </techniques>
    <goal> The main goal is to help students learn about ${topic} through natural, engaging conversations.</goal>
    `

    return prompt
  }

  const handleFileAttachment = () => {
    document.getElementById('fileInput').click(); // Triggers the file input when the paperclip button is clicked
  };

  const handleSubmit = async () => {
    console.log('Submit button clicked');
    console.log('First Textbox Value:', textValue1);
    console.log('Second Textbox Value:', textValue2);

    await setDoc(doc(firestore, "teaching_assistants", textValue1), {
      title: textValue1,
      instructions: textValue2, 
      image: "https://static.thenounproject.com/png/2732962-200.png"
    });

    const promptJSONResponse = client.empathicVoice.prompts.createPrompt({
      name: "teaching_assistant_prompt_" + textValue1,
      text: generatePrompt(textValue1, textValue2)
    })

    promptJSONResponse.then(
      async (response) => {
        console.log(response)
        var promptID = response?.id
        var promptVersion = response?.version

        await client.empathicVoice.configs.createConfig({
          name: "teaching_assistant_config_" + textValue1,
          prompt: {
            id: promptID, 
            version: promptVersion
          }
        }).then(async (response) => {
          console.log(response.id)
          console.log(response)
          var configID = response.id;

          console.log(configID)
          await updateDoc(doc(firestore, "teaching_assistants", textValue1), {
            configID: configID
          })
        });
      }
    )
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