import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const PriorityChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [10, 20, 30], // Initial data
        backgroundColor: ['#FF5733', '#FFC300', '#36A2EB'],
      },
    ],
  });

  const [workTypes, setWorkTypes] = useState(['remote']); // Default 'remote' is selected

  const handleCheckboxChange = (event) => {
    debugger; // eslint-disable-line
    const selectedWorkType = event.target.value;
    const updatedWorkTypes = workTypes.includes(selectedWorkType)
      ? workTypes.filter((type) => type !== selectedWorkType)
      : [...workTypes, selectedWorkType];
    setWorkTypes(updatedWorkTypes);
    updateChart(updatedWorkTypes);
  };

  const updateChart = (selectedWorkTypes) => {
    const workTypeData = {
      remote: [1, 5, 10],
      onsite: [9, 15, 20],
      free: [2, 12, 25],
      paid: [8, 8, 5],
    };

    const newData = [0, 0, 0];

    selectedWorkTypes.forEach((selectedType) => {
      newData.forEach((value, index) => {
        newData[index] += workTypeData[selectedType][index];
      });
    });

    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: newData,
        },
      ],
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <Doughnut data={chartData} />
      </div>
      <div style={{ marginTop: '40px' }}>
        <label htmlFor="remote">
          <input
            type="checkbox"
            id="remote"
            name="workType"
            value="remote"
            checked={workTypes.includes('remote')}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          Remote-Free
        </label>
        <label htmlFor="onsite">
          <input
            type="checkbox"
            id="onsite"
            name="workType"
            value="onsite"
            checked={workTypes.includes('onsite')}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          Remote-Paid
        </label>
        <label htmlFor="free">
          <input
            type="checkbox"
            id="free"
            name="workType"
            value="free"
            checked={workTypes.includes('free')}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          Onsite-Free
        </label>
        <label htmlFor="paid">
          <input
            type="checkbox"
            id="paid"
            name="workType"
            value="paid"
            checked={workTypes.includes('paid')}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          Onsite-Paid
        </label>
      </div>
    </div>
  );
};

export default PriorityChart;
