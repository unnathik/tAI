"use client";
import React from 'react';
import Image from 'next/image';
import Login from '../component/LoginComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; 
import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

const TeacherLoginPage = () => {
    const router = useRouter();

    const handleReturnNavigation = () => {
        router.push('/');
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
        <div className='h-screen w-full justify-center flex flex-col bg-sky-100'>
        <div className="h-1/2 flex flex-col px-4 py-4 justify-center">
            {/* Main content */}
            <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-1/3 mx-auto shadow-lg bg-white">
                {/* Left: Login Component */}
                <div className="flex-none w-full flex flex-col p-0 ">
                    <div className="flex-grow">
                    </div> {/* Blank space above */}
                    <div className="pl-6">
                        <FontAwesomeIcon className="cursor-pointer pt-5" icon={faArrowLeft} onClick={handleReturnNavigation} />
                    </div>
                    <div className='w-full mx-auto flex justify-center items-center flex-col'>
                        <div className='flex justify-center flex-col items-center'>
                        </div>
                        <Image 
                                src="/assets/teacher_new.png" 
                                alt="Logo" 
                                width={200} 
                                height={200} 
                                className="rounded-full" 
                            />
                        <h1 className="text-xl justify-center font-bold text-blue-700">tAI Teacher Login</h1>
                        <Login route='/teacherDashboard' className='w-full'/>
                    </div>
                    <div className="flex-grow"></div> {/* Blank space below */}
                </div>
                </div>
        </div>
        </div>
        </motion.div>
    );
}

export default TeacherLoginPage;