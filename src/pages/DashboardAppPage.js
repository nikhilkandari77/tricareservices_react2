import React, { useRef, useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import DashboardTable from 'src/components/tables/DashboardTable';
// eslint-disable-next-line import/no-unresolved
import colors from 'src/theme/colors';



// @mui
import { useTheme} from '@mui/material/styles';

import { Card, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
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
  const [engineerWorkloadList, setEngineerWorkloadList] = useState([]);
  const hashMap = {};
  const pieParams = { height: 200, margin: { right: 5 } };
  const palette = ['red', 'blue', 'green'];

  useEffect(() => {

    console.log(`Token${token}`);
    fetch(`${baseUrl}/api/user/dashboard/admin/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(json => {

        setEngineerWorkloadList(json.data.complaintHistoryGroupByEngineer);
        setRows(json.data);

        console.log("data", json.data.complaintHistoryGroupByEngineer);

      });

  }, []);


  useEffect(() => {


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





  }, []);



  engineerWorkloadList.forEach(([key, value]) => {
    hashMap[key] = value;
  });
  if (rows.engineers !== undefined) {
    rows.engineers.forEach((engineer) => {
      if (hashMap[engineer] === undefined)
        hashMap[engineer] = 0
    });
  }
  const sizing = {
    legend: { hidden: true },
  };


  return (
    <>
      <Helmet>
        <title>Tricare Services</title>
      </Helmet>

      <div className="container-fluid mb-5">
        <Typography variant="h4" sx={{ mb: 5, color: colors.figmaBlue }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CardTodayServices title="" color="info" total={rows.todayService} completed={0} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardNextDayServices title="" total={rows.nextDayScheduled} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardBackLogServices title="" total={rows.backLog} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </div>


      <div className="container-fluid">

        <Grid container spacing={3}>

          <Grid item xs={12}>
            
            <DashboardTable token={token} />
          </Grid>
        </Grid>
      </div>
      <br />
      <div className="container-fluid">

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <PieChart
                series={[
                  {

                    data: [
                      { id: 0, value: rows.backLog, label: `Delayed `, color: "#dc3545" },
                      { id: 1, value: rows.closedService, label: `Completed `, color: "#198754" },
                      { id: 2, value: rows.activeService, label: `On-Going `, color: "#ffc107" },
                    ],
                  },
                ]}
                width="400"
                height={400}
                {...sizing}
              />
              <div className='comtainer'>
                <div className='row'>

                  <div className='col-sm-12' style={{ textAlign: "center" }}>
                    <span className="btn btn-dark">Total {rows.activeService + rows.closedService}</span>&nbsp;

                    <span className="btn btn-danger">Delayed {rows.backLog}</span>&nbsp;
                    <span className="btn btn-success">Completed {rows.closedService}</span>&nbsp;
                    <span className="btn btn-warning">On-Going {rows.activeService}</span>
                  </div>
                </div>
                <br />
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartEngineerWorkload
              title="Engineer WorkLoads"
              subheader=""
              chartLabels={Object.keys(hashMap)}
              chartData={[
                { name: 'numberofservices', data: Object.values(hashMap) }
              ]}
              width={'100%'}
              height={400} // You can adjust the height as needed
              options={{ maintainAspectRatio: false }} // Allow chart to adjust its aspect ratio
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
