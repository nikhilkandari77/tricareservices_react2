// import {
//   Chart,
//   PieSeries,
//   Title
// } from '@devexpress/dx-react-chart-material-ui';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
// import colors from 'src/theme/colors';

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, CircularProgress, Grid, Typography } from '@mui/material';
import DonutChart from 'react-donut-chart';

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




export default function CardTodayServices({ title, total, completed, icon, color, sx, ...other }) {


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
    <div className='container-fluid' style={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(0, 91, 167, 1)', borderRadius: '12px' }}>
      <div className='row'>
        <div className='col-md-3 col-sm-4 col-3'>
          <div style={{ textAlign: "center", margin: "10% 0 0 20%", backgroundColor: "white", color: "black", borderRadius: "3rem" }}>
            <b style={{ color: "red", lineHeight: 1 }}>{new Date().toLocaleString('en-EN', { weekday: "long" }).substring(0, 3).toUpperCase()}</b>
            <h3 style={{ lineHeight: 1 }}>{new Date().getDate()}</h3>
          </div><br/>
         <div style={{margin:"15%"}} >
         <DonutChart  className='donutchart'
         label={{
          fill: 'white',
          fontSize: '10px'
     }}
        
          formatValues={(values, total) =>"5"}
          color="white"
          for
            width={65}
            height={65}
            innerRadius={.6}
            outerRadius={1}
            colors={['green','white']}
            labels={ ["Blue", "Green", "Red"]}
            onClick={false}
            legend={false}
            colorFunction={(colors, index) => colors[(index % colors.length)]}
            data={[
              {
               label:"`",
                value: 0,
                color: "green",
                isEmpty:true
              },
              {
         
                value: 65,
                color: "white"
              },
              {
      
                value: 25,
                color: "green"
              }
            ]}
            
          />
         </div>
        </div>
        <div className='col-md-9 col-sm-8 col-9'>
          <Card
            sx={{
              py: 2,
              backgroundColor: 'rgba(0, 91, 167, 1)',
              color: 'rgba(255, 255, 255, 1)',
              // color: (theme) => theme.palette[color].darker,
              // bgcolor: (theme) => theme.palette[color].lighter,


              textAlign: "center",
              margin: "auto"
            }}
          >
            <Grid style={{ alignItems: 'center', }}>


              <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h3">Today</Typography>
                <Typography variant="h3">Services </Typography>
                <Typography variant="h3">{total !== 0 ? total : "0"}</Typography>

              </Grid>

            </Grid>


          </Card>
        </div>
      </div>
      
    </div>
  );
}