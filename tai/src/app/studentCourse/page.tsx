"use client"
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ChatWidget from '../component/ChatWidget';
import { Checkbox } from "@material-tailwind/react";
import Navbar from '../component/Navbar';


type CourseDict = {
    [key: string]: string;
};
const courseDict: CourseDict = {};
courseDict['HIST 101'] = 'Topics in World History: Cultural History of Food in Atlantic World';
courseDict['PHYSICS 1B'] = 'Oscillations, Waves, Electric and Magnetic Fields';
courseDict['GERMAN 2'] = 'Elementary German';
courseDict['MATH 132'] = 'Complex Analysis for Applications';

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



const StudentCourse = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [code, setCode] = useState('');
    const [currentTopic, setCurrentTopic] = useState('');

    useEffect(() => {
        const searchParamString = `${searchParams}`;
        const codeParam = searchParamString.replace(/(code=)/g, '').replace(/(\+)/g, ' ');
        // console.log(codeParam);
        setCode(codeParam);
        setCurrentTopic(topicsDict[codeParam][0]);
    }, [pathname, searchParams]);

    type CourseInfoBoxProps = {
        code: string;
    }

    const handleCurrentTopic = (topic) => {
        setCurrentTopic(topic);
    }
    
    const CourseInfoBox: React.FC<CourseInfoBoxProps> = ({code}) => {    
        return (
            <div className='rounded-md w-56 bg-gray-300 p-4 relative self-start'>
                <h2 className='font-bold'>{code}</h2>
                <h3>{courseDict[code]}</h3>
                
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    {topicsDict[code]?.map(topic => {
                        return (
                            <div className="py-1" role="none">
                                <div className="block px-4 py-2 text-sm text-gray-700">
                                    <div className="flex flex-row">
                                        <div className="cursor-pointer" onClick={() => handleCurrentTopic(topic)}>{topic}</div>
                                        <Checkbox className="m-5" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
            <Navbar />
            <div className="h-5/6 flex flex-col px-4 py-4 justify-center">
                <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white">
                    <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl mx-auto items-center p-4 h-[65vh]">
                        <CourseInfoBox code={code}/>
                        <ChatWidget topic={currentTopic}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentCourse;