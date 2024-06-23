"use client"
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ChatWidget from '../component/ChatWidget';

type CourseDict = {
    [key: string]: string;
};
const courseDict: CourseDict = {};
courseDict['HIST 101'] = 'Topics in World History: Cultural History of Food in Atlantic World';
courseDict['PHYSICS 1B'] = 'Oscillations, Waves, Electric and Magnetic Fields';
courseDict['GERMAN 2'] = 'Elementary German';
courseDict['MATH 132'] = 'Complex Analysis for Applications';

type CourseInfoBoxProps = {
    code: string;
}

const CourseInfoBox: React.FC<CourseInfoBoxProps> = ({code}) => {
    return (
        <div className='rounded-md h-64 w-48 bg-gray-300 p-4 relative'>
            <h2 className='font-bold'>{code}</h2>
            <h3>{courseDict[code]}</h3>
        </div>
    );
};

const StudentCourse = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [code, setCode] = useState('');

    useEffect(() => {
        const searchParamString = `${searchParams}`;
        const codeParam = searchParamString.replace(/(code=)/g, '').replace(/(\+)/g, ' ');
        console.log(codeParam);
        setCode(codeParam);
    }, [pathname, searchParams]);

    return (
        <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
            <div className="h-5/6 flex flex-col px-4 py-4 justify-center">
                <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white">
                    <div className="flex-grow justify-between flex flex-row bg-four/[0.6] rounded-3xl mx-auto items-center p-4 h-[65vh]">
                        <CourseInfoBox code={code}/>
                        <ChatWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentCourse;