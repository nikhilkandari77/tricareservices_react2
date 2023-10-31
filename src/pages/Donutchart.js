
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UnassignedTasksTable from '../components/tables/UnassignedTasksTable';
import baseUrl from '../utils/baseUrl';

const DonutChart = (props) => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState(props.data);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [unassignedTasksData, setUnassignedTaskData] = useState([]);



  useEffect(() => {
    const myChart = echarts.init(document.getElementById('donut-chart'));
    const totalValue = data !== null ? data.map(obj => obj.value).reduce((v1, v2) => v1 + v2) : 0;

    const option = {
      series: [
        {
          type: 'pie',
          radius: '70%',
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}: {c}',
          },
          itemStyle: {
            color: (params) => {
              const colorList = ['#FF6384', '#36A2EB'];
              return colorList[params.dataIndex];
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold',
            },
          },
          data: data.map((item, index) => ({
            value: item.value,
            name: item.name,
            emphasis: {
              focus: 'self',
            },
            events: {
              onclick: (params) => {
                // Dummy onClick function for the entire series
                // You can replace it with your actual logic
                setIsModalOpen(true);
                console.log('Clicked on', params);
              },
            },
          })),
        },
      ],
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['Free', 'Paid'],
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '90%',
          style: {
            text: `Total: ${totalValue}`,
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'blue'
          },
          // onclick: () => {
          //   setIsModalOpen(true);
          // },
        },
      ],

    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
      myChart.resize();
    });

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', () => {
        myChart.resize();
      });
    };
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div>
      <div id="donut-chart" style={{ width: '100%', height: '300px' }} />

      {/* <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
    Open responsive dialog
  </Button> */}

      <Dialog
        fullScreen={fullScreen}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg" // Set the width of the dialog (lg for large)
      >
        <DialogTitle id="responsive-dialog-title">
          {/* {"Use Google's location service?"} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

            <UnassignedTasksTable data={unassignedTasksData} />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
        Disagree
      </Button> */}
          <Button onClick={handleClose} style={{ color: 'red' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DonutChart;



