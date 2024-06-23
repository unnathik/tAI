// src/app/component/Navbar.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavBarProps {
  student: boolean;
}
const Navbar: React.FC<NavBarProps> = ({ student}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="py-4">
      <div className="w-11/12 mx-auto flex items-center justify-between rounded-3xl shadow-lg bg-blue-800 p-4">
        <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
            <Image 
                src="/assets/robo.png" 
                alt="Logo" 
                width={60} 
                height={60} 
                className="rounded-full" 
            />
            <span className="ml-2 text-white font-bold text-xl">tAI: Your Personal Teaching Assistant</span>
        </div>
        <div className="flex space-x-4">
          {student && (
              <>
                <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/studentDashboard')}>Dashboard</button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md" onClick={() => handleNavigation('/studentProfile')}>Profile</button>
          <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/studentLogin')}>Logout</button>
              </>
            )}
          {!student && (
              <>
                <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/teacherDashboard')}>Dashboard</button>
                <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/teacherLogin')}>Logout</button>
              </>
            )}
          <Image 
                src="/assets/pfp.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="rounded-full" 
            />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
