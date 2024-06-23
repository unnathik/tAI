"use client"
import { useRouter } from 'next/navigation';
import { BiSolidSchool } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import NewsCard from './card';
import { notificationData, taData } from './notificationData';
import { SlGraduation } from "react-icons/sl";
import InputBox from './inputBox';
import Tile from './tile';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { HumeClient } from "hume";
import { FaWandMagicSparkles } from "react-icons/fa6";


interface TeachingAssistant {
  title: string;
  image: string;
}

const client = new HumeClient({ apiKey: "gvHXvjuGGa4tgeY4wFkinI1XUSVLKftGlPiyYsWkGX2aRTGq" });

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



const TeacherDashboard = () => {
  const [teachingAssistants, setTeachingAssistants] = useState<TeachingAssistant[]>([]);

  useEffect(() => {
    const fetchTeachingAssistants = async () => {
      const q = query(collection(firestore, 'teaching_assistants'));
      const querySnapshot = await getDocs(q);

      const fetchedTeachingAssistants: TeachingAssistant[] = [];

      querySnapshot.forEach((doc) => {
        fetchedTeachingAssistants.push({
          title: doc.data().title,
          image: doc.data().image,
        });
      });

      setTeachingAssistants(fetchedTeachingAssistants);
    };

    fetchTeachingAssistants();
  }, []); 

  return (
    <div className='h-screen w-full flex flex-col bg-gray-100 p-4'>
      {/* Main section- full page */}
      <div className='flex flex-row w-full h-full'>
        {/* Spacing */}
        {/* Left section */}
        <div className='w-2/3 h-1/4 p-4'>
          {/* School information card */}
          <div className="p-4 bg-blue-200 rounded-3xl shadow-lg">
            <div className="flex flex-col justify-center">
              <div className="flex">
                <BiSolidSchool size={28} color='#3b82f6'/>
                <h2 className="text-xl justify-center font-bold mb-2 pl-2 text-blue-500">University of California Berkeley</h2>
              </div>
              <p className='text-black'>Welcome back, Unnathi!</p>
              <p className='text-black'>Course Assignment(s): CS1331 (Intro to Object-Oriented Programming in Java).</p>
            </div>
          </div>
          <div className='p-4 pt-7'>
            <div className='flex'>
              <SlGraduation size={24} color='#6b7280'/>
              <p className='text-gray-500 pl-2 pb-3'>Your Teaching Assistants</p>
            </div>
              <div className="">
                <div className="w-full">
                  <InputBox hint1="Create a new teaching assistant! What topic will this teaching assistant teach?" hint2="Any other instructions? Would you like your teaching assistant to abide by any rules?" attach={true} submit={true}/>
                </div>
              </div>
            <div className="flex flex-wrap justify-center">        
            {teachingAssistants.map((ta, index) => (
          <Tile
            key={index}
            thumbnail={ta.image}
            description={ta.title}
          />
        ))}
      </div>
          </div>
        </div>

        <div className='w-1/3 flex flex-col p-4'>
          <div className="bg-gray-200 rounded-3xl p-4 shadow-lg flex-grow overfow-y-scroll">
            <div className='flex pb-100'>
            <MdOutlineNotificationsNone size={28} color='#a8a29e'/>
            <h2 className="text-xl justify-center font-bold mb-100 pl-2 text-stone-500">Notifications</h2>
            </div>
              {notificationData.map((notificationItem, index) => (
                <NewsCard
                  key={index}
                  category={notificationItem.category}
                  title={notificationItem.title}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
