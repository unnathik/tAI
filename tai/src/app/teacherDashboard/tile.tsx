import React from 'react';

interface TileProps {
  thumbnail: string;
  description: string;
}

const Tile: React.FC<TileProps> = ({ thumbnail, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 m-2 flex flex-col justify-between">
      <img src={thumbnail} className="w-full h-32 object-cover" />
      <div className="p-4">
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Tile;
