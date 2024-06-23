"use client"
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const InitialLoginPage = () => {
    const router = useRouter();

    const handleStudentNavigation = () => {
        router.push('/studentLogin'); // Navigate to the student login page
    };

    const handleTeacherNavigation = () => {
        router.push('/teacherLogin'); // Navigate to the teacher login page
    };

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

    return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className='h-screen w-full justify-center flex flex-col bg-sky-100'>
            <div className="h-1/2 flex flex-col p-4 justify-center">
                <div className="flex-grow flex p-4 bg-four rounded-3xl w-1/3 mx-auto shadow-lg bg-white">
                    <div className="flex-none w-full flex items-center flex-col p-0">
                        <div className="flex-grow">
                            {/* Blank space above */}
                        </div>
                        <div className='w-full mx-auto flex flex-col justify-center items-center'>
                            <h1 className="text-xl justify-center font-bold text-blue-700">tAI</h1>
                            <h2 className="text-med justify-center">Your Personal Teaching Assistant</h2>
                            <Image 
                                src="/assets/robo_transp.png" 
                                alt="Logo" 
                                width={350} 
                                height={350} 
                                className="rounded-full" 
                            />
                            <div className='w-full p-4'>
                                <div className="flex justify-center space-x-4 mx-auto">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleStudentNavigation}
                                    >
                                        Student
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleTeacherNavigation}
                                    >
                                        Teacher
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            {/* Blank space below */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </AnimatePresence>
    );
};

export default InitialLoginPage;