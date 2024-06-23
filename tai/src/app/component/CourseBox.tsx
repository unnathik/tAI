import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import text from '../art_assets/partner.png';

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
        <div className='rounded-md cursor-pointer h-48 w-64 bg-gray-300 p-4 relative' onClick={() => handleCourseNav(code)}>
            <h2 className='font-bold'>{code}</h2>
            <h3>{description}</h3>
            <div className='rounded-b-md absolute bottom-0 left-0 bg-cyan-400 w-64'>
                <h3 className='px-4 py-2'>{tag}</h3>
            </div>
        </div>
    );
};

export default CourseBox;