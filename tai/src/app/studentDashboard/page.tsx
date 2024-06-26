"use client"
import { useRouter } from 'next/navigation';
import CourseBox from '../component/CourseBox';
import Navbar from '../component/Navbar';
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

const StudentDashboard = () => {
    const router = useRouter();
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
      <div className='h-screen w-full justify-center flex flex-col bg-sky-100'>
        <Navbar student={true}/>
        <div className="h-5/6 flex flex-col justify-center">
          <div className="flex-grow flex bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white justify-center items-center">
          <div className="justify-center items-center justify-center items-center">
            <h1 className="text-xl text-center justify-center font-extrabold mb-2 pl-2 text-blue-800">Your Courses</h1>
            <div className="flex justify-center">
              <div className='grid grid-cols-3 gap-8 items-center'>
                <CourseBox
                  code='HIST 101'
                  description='Topics in World History: Cultural History of Food in Atlantic World'
                  tag='Lecture 1'
                />
                <CourseBox
                  code='PHYSICS 1B'
                  description='Oscillations, Waves, Electric and Magnetic Fields'
                  tag='Lecture 1'
                />
                <CourseBox
                  code='GERMAN 2'
                  description='Elementary German'
                  tag='Lecture 2'
                />
                <CourseBox
                  code='MATH 132'
                  description='Complex Analysis for Applications'
                  tag='Lecture 1'
                />
                <CourseBox
                  code='CS 1331'
                  description='Intro to Object-Oriented Programming with Java'
                  tag='Lecture 15'
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </motion.div>
    );
};
export default StudentDashboard;