import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ImprovementChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Areas of Improvement',
        data: data.values,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={chartData} />;
};

export default ImprovementChart;
