"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import ProgressChart from '../component/ProgressChart';
import ImprovementChart from '../component/ImprovementChart';
import ActivityChart from '../component/ActivityChart';
import EmotionsDisplay from '../component/EmotionsChart';

const StudentProfile = () => {
  const router = useRouter();

  // Dummy data for testing
  const data = {
    name: "John Doe",
    progress: {
      Confident: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [0.21, 0.27, 0.31, 0.35]
      },
      Focussed: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [0.6, 0.65, 0.7, 0.75]
      },
      Curious: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [0.5, 0.56, 0.59, 0.63]
      },
      Interested: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [0.8, 0.82, 0.85, 0.88]
      }
    },
    improvement: {
      labels: ["Math", "Science", "History", "Language"],
      values: [15, 10, 22, 12]
    },
    activity: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [10, 12, 8, 9]
    },
    emotions: {
      Math: [
        { emotion: "Happy", intensity: 90 },
        { emotion: "Focused", intensity: 70 },
        { emotion: "Anxious", intensity: 50 }
      ],
      Science: [
        { emotion: "Curious", intensity: 85 },
        { emotion: "Excited", intensity: 80 },
        { emotion: "Tired", intensity: 40 }
      ],
      History: [
        { emotion: "Bored", intensity: 60 },
        { emotion: "Interested", intensity: 75 },
        { emotion: "Confused", intensity: 55 }
      ],
      Language: [
        { emotion: "Confident", intensity: 95 },
        { emotion: "Nervous", intensity: 60 },
        { emotion: "Happy", intensity: 85 }
      ]
    }
  };

  const [studentData, setStudentData] = useState<any>(data);

  useEffect(() => {
    setStudentData(data);
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-teal-100 overflow-hidden">
      <Navbar student={true}/>
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col px-4 py-4">
          <div className="bg-four rounded-3xl w-11/12 mx-auto shadow-lg bg-white p-4">
            <h1 className="text-2xl font-bold mb-4">{studentData.name}'s Dashboard</h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Aggregate Statistics</h2>
              <div className="w-full">
                <ProgressChart data={studentData.progress} />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Areas of Improvement</h2>
              <div className="w-full">
                <ImprovementChart data={studentData.improvement} />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Weekly Activity</h2>
              <div className="w-full">
                <ActivityChart data={studentData.activity} />
              </div>
            </div>
            {Object.keys(studentData.emotions).map((subject: string, index: number) => (
              <div key={index} className="mb-4">
                <h2 className="text-xl font-semibold">{subject} Emotions</h2>
                <div className="w-full">
                  <EmotionsDisplay emotions={studentData.emotions[subject]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
