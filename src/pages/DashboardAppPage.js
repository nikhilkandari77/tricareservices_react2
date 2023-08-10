import React,{ useState,useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import DashboardTable from 'src/components/tables/DashboardTable';
import { faker } from '@faker-js/faker';
// eslint-disable-next-line import/no-unresolved
import colors from 'src/theme/colors';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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



// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const [rows,setRows]=useState({});
  const[todayServiceCount,setServiceCount]=useState(0)
  const theme = useTheme();

  useEffect(() => {
        
    
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
          
          
          console.log(rows);
    })
  
  }, []);
    
  return (
    <>
      <Helmet>
        <title> Tricare Services </title>
      </Helmet>

      <Container maxWidth="xl" sx={{ mb: 5 }}>

        <Typography variant="h4" sx={{ mb: 5, color: colors.figmaBlue}}>
          Dashboard
        </Typography>

        <Grid container spacing={5}>

          <Grid item xs={3} sm={6} md={4}>
            <CardTodayServices title="" color = 'info' total={rows.todayService!==0?rows.todayService:"0"} completed={6} />
          </Grid>

          <Grid item xs={3} sm={6} md={4}>
            <CardNextDayServices title="" total={rows.nextDayScheduled!==0?rows.nextDayScheduled:"0"} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={3} sm={6} md={4}>
            <CardBackLogServices title="" total={rows.backLog!==0?rows.backLog:"0"} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          </Grid>

        </Container>

        <Container maxWidth="xl">

            <Grid>
            
                
              <DashboardTable token={token}/>
               
            </Grid>

        </Container>

      <Container maxWidth="xl">
        
        <Grid container spacing={3}>
        
          <Grid item xs={12} md={6} lg={8}>
            <ChartEngineerWorkload
              title="Engineer WorkLoads"
              subheader="" 
              chartLabels={[
                'Tengen Uzui',
                'Shinobu Kocho',
                'Kyojuro Rengoku',
                'Mitsuri Kanroji',
                'Obanai Iguro',
                'Muichiro Tokito',
                'Giyu Tomioka',
                'Sanemi Shinazugawa',
                'Gyomei Himejima',
              ]}
              chartData={[
                {
                  name: "numberofservices",
                  data: [6, 3, 5, 1, 8, 2, 4, 7, 9]
                }
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          
        
        </Grid>
      </Container>

      
    </>
  );
}
