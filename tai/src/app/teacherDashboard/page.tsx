"use client"
import { useRouter } from 'next/navigation';
// import { AnimatePresence, motion } from 'framer-motion';
const TeacherDashboard = () => {
    const router = useRouter();
    return (
      <div className='h-screen w-full justify-center flex flex-col bg-teal-100'>
        <div className="h-5/6 flex flex-col px-4 py-4 justify-center">
          <div className="flex-grow flex px-0 py-0 bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white">
            <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl mx-auto justify-center items-center p-4 h-[65vh]">
              <p>Teacher Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    );
};
export default TeacherDashboard;