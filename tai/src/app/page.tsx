"use client"
import { useRouter } from 'next/navigation'; 
// import { AnimatePresence, motion } from 'framer-motion';

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
      // <AnimatePresence>
      // <motion.div
      //       initial="initial"
      //       animate="in"
      //       exit="out"
      //       variants={pageVariants}
      //       transition={pageTransition}
      // >
        <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
            <div className="h-1/2 flex flex-col px-4 py-4 justify-center">
                <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-1/3 mx-auto shadow-lg bg-white">
                    <div className="flex-none w-full flex flex-col p-0">
                        <div className="flex-grow">
                            {/* Blank space above */}
                        </div>
                        <div className='w-full mx-auto flex justify-center items-center flex-col'>
                            <div className='w-full flex justify-around py-4'>
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
                        <div className="flex-grow">
                            {/* Blank space below */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      // </motion.div>
      // </AnimatePresence>
    );
};

export default InitialLoginPage;
