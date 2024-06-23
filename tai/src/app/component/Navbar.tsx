// src/app/component/Navbar.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="py-4">
      <div className="w-11/12 mx-auto flex items-center justify-between rounded-3xl shadow-lg bg-blue-800 p-4">
        <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
            <Image 
                src="/assets/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="rounded-full" 
            />
            <span className="ml-2 text-white font-bold text-xl">AI Tutor</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/studentDashboard')}>Dashboard</button>
          <button className="px-4 py-2 bg-blue-800 text-sky-50 rounded-md" onClick={() => handleNavigation('/studentLogin')}>Logout</button>
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
