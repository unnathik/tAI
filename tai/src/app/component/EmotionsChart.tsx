import React from 'react';

const EmotionsDisplay = ({ emotions }: { emotions: { emotion: string, intensity: number }[] }) => {
  return (
    <div className="flex flex-wrap">
      {emotions.map((emotionData, index) => (
        <div
          key={index}
          className="m-2 p-2 text-center text-white rounded-lg"
          style={{
            width: `${emotionData.intensity / 2}%`,
            backgroundColor: getColorForEmotion(emotionData.emotion),
            flexGrow: 1
          }}
        >
          {emotionData.emotion}
        </div>
      ))}
    </div>
  );
};

// Function to return a color based on the emotion
const getColorForEmotion = (emotion: string) => {
  switch (emotion) {
    case 'Happy':
      return 'rgba(75, 192, 192, 0.6)';
    case 'Focused':
      return 'rgba(54, 162, 235, 0.6)';
    case 'Anxious':
      return 'rgba(255, 99, 132, 0.6)';
    case 'Curious':
      return 'rgba(153, 102, 255, 0.6)';
    case 'Excited':
      return 'rgba(255, 159, 64, 0.6)';
    case 'Tired':
      return 'rgba(201, 203, 207, 0.6)';
    case 'Bored':
      return 'rgba(255, 205, 86, 0.6)';
    case 'Interested':
      return 'rgba(255, 99, 71, 0.8)';
    case 'Confused':
      return 'rgba(154,205,50,0.5)';
    case 'Confident':
      return 'rgba(245, 62, 238, 0.8)';
    case 'Nervous':
      return 'rgba(0, 0, 205, 0.6)';
    default:
      return 'rgba(201, 203, 207, 0.6)';
  }
};

export default EmotionsDisplay;
