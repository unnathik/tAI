// CourseInfoBox.tsx
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
        <div className='rounded-md w-56 bg-gray-300 p-4 relative self-start'>
            <h2 className='font-bold'>{code}</h2>
            <h3>{courseDict[code]}</h3>
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                {topicsDict[code]?.map(topic => (
                    <div className="py-1 cursor-pointer" role="none">
                        <div className="block px-4 py-2 text-sm text-gray-700">
                            <div className="flex flex-row">
                                <div className={`py-1 ${topic == currentTopic ? "font-bold" : ""}`}  onClick={() => onTopicChange(topic)}>{topic}</div>
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
