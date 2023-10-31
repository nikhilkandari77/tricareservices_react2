import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import baseUrl from '../utils/baseUrl';

const ComplaintChart = () => {
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${baseUrl}/api/user/dashboard/admin/activity`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log('Fetched data:', json.data);
        setData(json.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Sample data (replace with your actual data)
  const chartData = {
    labels: data.label,
    datasets: [
      {
        label: 'Active Complaints',
        data: data.active,
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Closed Complaints',
        data: data.closed,
        borderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  return (
    <div>
      <div style={{ width: '100%', minHeight: '20rem' }}>
        <Line
          data={chartData}
          options={{
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Prevent maintaining a fixed aspect ratio
            scales: {
              x: [
                {
                  type: 'time',
                  time: {
                    unit: 'year',
                  },
                },
              ],
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ComplaintChart;