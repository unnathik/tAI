import React from 'react';
import { useRouter } from 'next/navigation';

type AppProps = {
    code: string;
    description: string;
    tag: string;
}

const CourseBox: React.FC<AppProps> = ({code, description, tag}) => {
    const router = useRouter();
    const handleCourseNav = (classCode: string) => {
        router.push(`/studentCourse/?code=${classCode}`);
    };
    return (
        <div className='rounded-md cursor-pointer h-60 w-80 bg-gray-300 p-4 relative hover:shadow-2xl' onClick={() => handleCourseNav(code)}>
            <h2 className='font-bold'>{code}</h2>
            <h3>{description}</h3>
            <div className='rounded-b-md absolute bottom-0 left-0 bg-cyan-400 w-full'>
                <h3 className='px-4 py-2'>{tag}</h3>
            </div>
        </div>
    );
};

export default CourseBox;