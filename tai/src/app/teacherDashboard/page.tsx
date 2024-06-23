"use client"
import { useRouter } from 'next/navigation'; 
// import { AnimatePresence, motion } from 'framer-motion';

const TeacherDashboard = () => {
    const router = useRouter();
    return (
      <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
        <div className="h-1/2 flex flex-col px-4 py-4 justify-center">
          <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-1/3 mx-auto shadow-lg bg-white">
                <p>Teacher Dashboard</p>
          </div>
        </div>
      </div>
    );
};

export default TeacherDashboard;