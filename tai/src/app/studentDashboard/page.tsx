"use client"
import { useRouter } from 'next/navigation';
import CourseBox from '../component/CourseBox';
import Navbar from '../component/Navbar';
// import { AnimatePresence, motion } from 'framer-motion';

const StudentDashboard = () => {
    const router = useRouter();
    return (
      <div className='h-screen w-full justify-center flex flex-col bg-sky-100'>
        <Navbar />
        <div className="h-5/6 flex flex-col justify-center">
          <div className="flex-grow flex bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white justify-center items-center">
          <div className="justify-center items-center justify-center items-center">
            <h1 className="text-xl text-center justify-center font-bold mb-2 pl-2 text-blue-800">Your Courses:</h1>
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
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
};
export default StudentDashboard;