import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutchartBacklock = () => {
  // Data for the chart
  const options = {
    labels: ['Remote-free', 'On-site - free', 'Remote-paid', 'Onsite-paid'],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    dataLabels: {
      enabled: true,
      formatter:  (val)=> {
        return val.toFixed(0); // Display values as digits (rounded to 0 decimal places)
      }
    },
    
  };

  const series = [25, 30, 15, 30]; // Actual values for each segment

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="245" // Adjust the height as needed
      />
    </div>
  );
};

export default DonutchartBacklock;