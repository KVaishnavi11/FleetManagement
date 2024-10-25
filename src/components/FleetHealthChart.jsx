import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const FleetHealthChart = ({ vehicles }) => {
  const labels = vehicles.map((v, index) => `Vehicle ${index + 1}`);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Battery Health (%)',
        data: vehicles.map(v => v.battery),
        backgroundColor: 'rgba(75, 192, 167, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Fleet Battery Health',
      },
    },
  };

  return (
    <div className="mt-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default FleetHealthChart;
