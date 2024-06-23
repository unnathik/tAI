import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SingleProgressChart = ({ data, subject }: { data: any, subject: string }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: subject,
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

const ProgressChart = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(data).map((subject) => (
        <div key={subject} className="h-64">
          <SingleProgressChart data={data[subject]} subject={subject} />
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;
