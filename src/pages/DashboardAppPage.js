import React, { useRef, useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import DashboardTable from 'src/components/tables/DashboardTable';
import { faker } from '@faker-js/faker';
// eslint-disable-next-line import/no-unresolved
import colors from 'src/theme/colors';


// @mui
import { useTheme } from '@mui/material/styles';
import { Card,CardContent, CardHeader, Box, Grid, Container, Typography } from '@mui/material';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';



// components
import Iconify from '../components/iconify';



import baseUrl from '../utils/baseUrl';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  CardBackLogServices,
  CardNextDayServices,
  CardTodayServices,
  AppCurrentSubject,
  AppConversionRates,
  ChartEngineerWorkload,
} from '../sections/@dashboard/app';


const token = localStorage.getItem('token');

echarts.use([GaugeChart, CanvasRenderer]);

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const [rows, setRows] = useState({});
  const [todayServiceCount, setServiceCount] = useState(0);
  const theme = useTheme();



  useEffect(() => {

    console.log(`Token${  token}`);
    fetch(`${baseUrl}/api/user/complaint/countData/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(json => {


        setRows(json.data);

        console.log(json.data);
      });

  }, []);

  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter(value) {
              if (value === 0.875) {
                return 'Completed';
              } if (value === 0.625) {
                return 'On Going';
              } if (value === 0.375) {
                return 'Delayed';
              } if (value === 0.125) {
                return 'Pending';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter(value) {
              return `${Math.round(value * 100)}`;
            },
            color: 'inherit'
          },
          data: [
            {
              value: 0.7,
              name: 'OverAll Progress'
            }
          ]
        }
      ]
    };


    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title> Tricare Services </title>
      </Helmet>

      <Container maxWidth="xl" sx={{ mb: 5 }}>

        <Typography variant="h4" sx={{ mb: 5, color: colors.figmaBlue }}>
          Dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CardTodayServices title="" color='info' total={rows.todayService !== 0 ? rows.todayService : "0"} completed={0} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardNextDayServices title="" total={0} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardBackLogServices title="" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>


      </Container>

      <Container maxWidth="xl">

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DashboardTable token={token} />
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth="xl">
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
                <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
            {/* <Card>
              <CardContent>
              </CardContent>
            </Card> */}
          </Grid>



          <Grid item xs={12} md={6}>
            <ChartEngineerWorkload
              title="Engineer WorkLoads"
              subheader=""
              chartLabels={[
                'Rohit', 'Rakesh', 'Sanjay', 'Nikhil', 'Sumit',
                'Rohan', 'Mukesh', 'Dilip', 'Karan'
              ]}
              chartData={[
                { name: 'numberofservices', data: [6, 3, 5, 1, 8, 2, 4, 7, 9] }
              ]}
            />
          </Grid>
        </Grid>
      </Container>



    </>
  );
}
