import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = (props) => {
  // Define your chart data
  const data = {
    labels: props.data.engineer,
    datasets: [
      {
        label: 'Remote-Free',
        data: props.data['Remote Support_Free'],
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
      {
        label: 'Remote-Paid',
        data: props.data['Remote Support_Paid'],
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
      },
      {
        label: 'Onsite-Free',
        data: props.data['On Site Visit_Free'],
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
      {
        label: 'Onsite-Paid',
        data: props.data['On Site Visit_Paid'],
        backgroundColor: '#C0392B',
      },
    ],
  };

  // Define your chart configuration
  const options = {
    indexAxis: 'y', // Set index axis to 'y' for horizontal bar chart
    elements: {
      bar: {
        borderWidth: 2,
        // Adjust the bar thickness to increase height
        barThickness: 50, // You can experiment with this value
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ minHeight: '20rem' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StackedBarChart;