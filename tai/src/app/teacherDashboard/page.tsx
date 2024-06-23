"use client";
import { useRouter } from 'next/navigation';
import schoolImage from '../art_assets/school.png'; // Example image for school
import postItImage from '../art_assets/notes.png'; // Another image example
import Image from 'next/image'

const TeacherDashboard = () => {
  const router = useRouter();

  return (
    <div className='h-screen w-full flex flex-col bg-white p-4'>
      {/* Main section- full page */}
      <div className='flex flex-row w-full h-full'>
        {/* Spacing */}
        <div className='w-1/12'></div>

        {/* Left section */}
        <div className='w-2/3 h-1/4 p-4'>
          {/* School information card */}
          <div className="p-4 bg-blue-400 rounded-3xl shadow-lg">
            <div className="flex flex-col justify-center">
              <div className="flex">
                <Image src={schoolImage} width={30} height ={30} alt="School" className=""/>
                <h2 className="text-xl justify-center font-bold mb-2">University of California Berkeley</h2>
              </div>
              <p>Welcome back!</p>
              <p>Information about School</p>
              <p>Principal: John Doe</p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className='w-1/3 flex flex-col p-4'>
          {/* Subsection card that is 1/4 the height of the page */}
          <div className="bg-gray-200 rounded-3xl p-4 shadow-lg flex-grow">
            <h3 className="text-lg font-bold mb-2">Notifications</h3>
            <img src={postItImage} alt="Notes" className="w-full h-3/4 object-cover rounded-lg"/>
            <p>Upcoming events...</p>
          </div>
          {/* Other content below the card */}
          <div className="bg-gray-100 rounded-3xl p-4 shadow-lg mt-4 flex-grow">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <p>More content here...</p>
          </div>
        </div>
        {/* Spacing */}
        <div className='w-1/12'></div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
