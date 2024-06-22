import React from 'react';
import Login from '../component/LoginComponent'; // Assuming you have a component named Login

// import { motion } from 'framer-motion';

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

const StudentLoginPage = () => {
    return (
        // <motion.div
        //     initial="initial"
        //     animate="in"
        //     exit="out"
        //     variants={pageVariants}
        //     transition={pageTransition}
        // >
        <div className='h-screen w-full justify-center flex flex-col'>
        <div className="h-1/2 flex flex-col px-4 py-4 justify-center">
            {/* Navbar */}
            {/* Main content */}
            <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-1/3 mx-auto shadow-lg">
                {/* Left: Login Component */}
                <div className="flex-none w-full flex flex-col p-0">
                    <div className="flex-grow">
                    </div> {/* Blank space above */}
                    <div className='w-full mx-auto flex justify-center items-center flex-col'>
                        <div className='flex justify-center flex-col items-center'>
                        </div>
                        <text>Student</text>
                        <Login route='/student-dashboard' className='w-full'/>
                    </div>
                    <div className="flex-grow"></div> {/* Blank space below */}
                </div>
                </div>
        </div>
        </div>
        // </motion.div>
    );
}

export default StudentLoginPage;