import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TileProps {
  thumbnail: string;
  description: string;
}

const Tile: React.FC<TileProps> = ({ thumbnail, description }) => {
  const router = useRouter();
    const handlePerfNav = (classCode: string) => {
        router.push(`/taiPerformance/?code=${classCode}`);
    };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 m-2 flex flex-col justify-between">
      <img src={thumbnail} className="w-full h-32 object-cover" />
      <div className="p-4 text-align item-align">
        <p className="text-gray-600 text-med mt-2 text-align item-align">{description}</p>
        <button className="border-0 text-white rounded-md cursor-pointer bg-sky-400 hover:bg-sky-600 p-0.5"><p className = "text-sm" onClick={() => handlePerfNav(description)}>Review Performance</p></button>
      </div>
    </div>
  );
};

export default Tile;
