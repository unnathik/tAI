"use client"
import { useRouter } from 'next/navigation';
import CourseBox from '../component/CourseBox';
// import { AnimatePresence, motion } from 'framer-motion';

const StudentDashboard = () => {
    const router = useRouter();
    return (
      <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
        <div className="h-5/6 flex flex-col px-4 py-4 justify-center">
          <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white">
            <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl mx-auto justify-center items-center p-4 h-[65vh]">
              {/* <p>Student Dashboard</p> */}
              <div className='grid grid-cols-3 gap-3'>
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
    );
};
export default StudentDashboard;