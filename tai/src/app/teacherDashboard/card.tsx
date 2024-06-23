import React from 'react';

interface NewsCardProps {
  category: string;
  title: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ category, title }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg mb-2 mt-2 bg-white">
      <div className="px-6 py-4">
        <div className="font-semibold text-xs mb-2 text-gray-700">{category}</div>
        <p className="text-gray-700 text-base">
          {title}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;