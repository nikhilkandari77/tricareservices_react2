// import {
//   Chart,
//   PieSeries,
//   Title
// } from '@devexpress/dx-react-chart-material-ui';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
// import colors from 'src/theme/colors';

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, CircularProgress, Grid, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

// ChartJS.register(ArcElement, Tooltip, Legend);

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

CardTodayServices.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  completed: PropTypes.number,
  sx: PropTypes.object,
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  radius: '100%',
  position: 'relative',
  legend: {
    display: false, // Disable the legend
  },
};

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);




export default function CardTodayServices({ title, total, completed, icon, color, sx, ...other }) {

  // const chartRef = useRef(null);

  // useEffect(() => {
  //   const myChart = echarts.init(chartRef.current);

  //   const option = {
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center'
  //     },
  //     series: [
  //       {
  //         name: '',
  //         type: 'pie',
  //         radius: ['40%', '70%'],
  //         avoidLabelOverlap: true,
  //         itemStyle: {
  //           borderRadius: 5,
  //           borderColor: '#fff',
  //           borderWidth: 2
  //         },
  //         label: {
  //           show: false,
  //           position: 'center'
  //         },
  //         emphasis: {
  //           label: {
  //             show: false,
  //             fontSize: 20,
  //             fontWeight: 'normal'
  //           }
  //         },
  //         labelLine: {
  //           show: false
  //         },
  //         data: [
  //           { value: total, name: 'Pending' },
  //           // { value: 580, name: 'Email' },
  //           // { value: 484, name: 'Union Ads' },
  //           // { value: 300, name: 'Video Ads' }
  //         ]
  //       }
  //     ]
  //   };


  //   myChart.setOption(option);

  //   return () => {
  //     myChart.dispose();
  //   };
  // }, [total, completed]);

  const data = {
    labels: [`Completed `, `In Progress `],
    datasets: [
      {
        label: 'Services',
        data: [completed, total - completed],
        backgroundColor: [

          'rgb(46, 204, 32, 1)',
          'rgb(255,255,0)',
        ],
        borderColor: [

          'rgb(46, 204, 32, 1)',
          'rgb(255,255,0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card
      sx={{
        py: 2,
        px: 10,
        boxShadow: 10,
        textAlign: 'start',
        // color: (theme) => theme.palette[color].darker,
        // bgcolor: (theme) => theme.palette[color].lighter,
        width: '350px', // Specify the desired width
        height: '180px', // Specify the desired height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(255, 255, 255, 1)',
        bgcolor: 'rgba(0, 91, 167, 1)',
        ...sx,
      }}
      {...other}
    >

      {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        
      </div> */}

      <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>


        <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h3">Today</Typography>
          <Typography variant="h3">Services</Typography>
          <Typography variant="h3">{fShortenNumber(total)}</Typography>

        </Grid>

        <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', }}>
          {/* <div ref={chartRef} style={{ width: '100%', height: '100%' }} /> */}
        </Grid>

      </Grid>

      {/* <Typography variant="h3">Today</Typography>

      <Typography variant="h3">Services</Typography>

      <Typography variant="h3">{fShortenNumber(total)}</Typography> */}

      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography> */}

      {/* <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%',
      }}
      >
        
      </div> */}




    </Card>
  );
}
