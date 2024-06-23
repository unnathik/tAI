"use client"
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ChatWidget from '../component/ChatWidget';
import { Checkbox } from "@material-tailwind/react";
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import { TeachingAssistant } from '../teacherDashboard/page';
import Navbar from '../component/Navbar';
import CourseInfoBox from '../component/CourseInfoBox';

type CourseDict = {
    [key: string]: string;
};
const courseDict: CourseDict = {};
courseDict['HIST 101'] = 'Topics in World History: Cultural History of Food in Atlantic World';
courseDict['PHYSICS 1B'] = 'Oscillations, Waves, Electric and Magnetic Fields';
courseDict['GERMAN 2'] = 'Elementary German';
courseDict['MATH 132'] = 'Complex Analysis for Applications';
courseDict['CS 1331'] = 'Intro to Object-Oriented Programming with Java';

type TopicsDict = {
    [key: string]: string[];
};
const topicsDict: TopicsDict = {};
topicsDict['HIST 101'] = [
    'Cultural History of Food in Atlantic World',
    'Examination of National Cuisine Formation'
];
topicsDict['PHYSICS 1B'] = [
    'Fluid Mechanics',
    'Periodic Motion',
    'Mechanic Waves'
];
topicsDict['GERMAN 2'] = [
    'Introduction to German Language',
    'Nominative vs Accusative Case'
];
topicsDict['MATH 132'] = [
    'Cauchy-Riemann Equations',
    'Complex Analytic Functions',
    'Harmonic Functions'
];

// Definitions for courseDict and topicsDict remain unchanged here

const StudentCourse = () => {
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

    useEffect(() => {
        const fetchTeachingAssistants = async () => {
          const q = query(collection(firestore, 'teaching_assistants'));
          const querySnapshot = await getDocs(q);
    
          const fetchedTeachingAssistants: string[] = [];
    
          querySnapshot.forEach((doc) => {
            fetchedTeachingAssistants.push(doc.data().title);
          });

          console.info("reached")
    
          topicsDict['CS 1331'] = fetchedTeachingAssistants
          setIsDataFetched(true)
        };
    
        fetchTeachingAssistants();
      }, []); 

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [code, setCode] = useState('');
    const [currentTopic, setCurrentTopic] = useState('');

    useEffect(() => {
        if (isDataFetched) {
            const searchParamString = `${searchParams}`;
        
            const codeParam = searchParamString.replace(/(code=)/g, '').replace(/(\+)/g, ' ');
            console.info(topicsDict[codeParam])
    
            // console.log(codeParam);
            setCode(codeParam);
            setCurrentTopic(topicsDict[codeParam][0]);
        }
    }, [pathname, searchParams, isDataFetched]);

    const handleCurrentTopic = (topic: string) => {
        setCurrentTopic(topic);
    }

    return (
        <div className='h-screen w-full justify-center flex flex-col bg-sky-100'>
          <Navbar student={true} />
          <div className="h-5/6 flex flex-col px-4 py-4 justify-center items-center">
            <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white align-center items-center">
              <div className="flex justify-center w-full bg-four/[0.6] rounded-3xl mx-auto p-4 h-[65vh] align-center">
                <CourseInfoBox
                  code={code}
                  topicsDict={topicsDict}
                  courseDict={courseDict}
                  onTopicChange={handleCurrentTopic}
                  currentTopic={currentTopic}
                />
                <ChatWidget topic={currentTopic} />
              </div>
            </div>
          </div>
        </div>
    );
};

export default StudentCourse;