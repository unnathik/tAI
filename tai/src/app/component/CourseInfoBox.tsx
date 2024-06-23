import React from 'react';
import { Checkbox } from "@material-tailwind/react";

type CourseInfoBoxProps = {
    code: string;
    topicsDict: { [key: string]: string[] };
    courseDict: { [key: string]: string };
    onTopicChange: (topic: string) => void;
    currentTopic: string;
}

const CourseInfoBox: React.FC<CourseInfoBoxProps> = ({ code, topicsDict, courseDict, onTopicChange, currentTopic}) => {
    return (
        <div className='rounded-md w-80 bg-gray-300 p-4 relative self-start text-center'>
            <h2 className='font-bold items-center justify-center '>{code}</h2>
            <h3 className='text-center'>{courseDict[code]}</h3>
            <div className="absolute right-0 w-full z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                {topicsDict[code]?.map(topic => (
                    <div className="py-1 cursor-pointer" role="none">
                        <div className="block w-full px-4 py-2 text-sm text-gray-700">
                            <div className="flex flex-row w-full">
                                <div className={`w-full py-1 flex items-center justify-center ${topic == currentTopic ? "font-bold" : ""}`}  onClick={() => onTopicChange(topic)}>{topic}</div>
                                <Checkbox className="m-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseInfoBox;
