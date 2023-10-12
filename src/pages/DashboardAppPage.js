import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import DashboardTable from 'src/components/tables/DashboardTable';
// eslint-disable-next-line import/no-unresolved
import colors from 'src/theme/colors';



// @mui
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Card, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// 
import baseUrl from '../utils/baseUrl';
import Iconify from '../components/iconify';





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


echarts.use([GaugeChart, CanvasRenderer]);


// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const navigate = useNavigate();

  const [rows, setRows] = useState({});
  const [todayServiceCount, setServiceCount] = useState(0);
  const theme = useTheme();
  const [engineerWorkloadList, setEngineerWorkloadList] = useState([]);
  const hashMap = {};
  const pieParams = { height: 200, margin: { right: 5 } };
  const palette = ['red', 'blue', 'green'];
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const [totalComplaints, setTotalComplaints] = useState('0');
  const [totalComplaintsHigh, setTotalComplaintsHigh] = useState('0');
  const [totalComplaintsMedium, setTotalComplaintsMedium] = useState('0');
  const [totalComplaintsLow, setTotalComplaintsLow] = useState('0');

  const [todayVisits, setTodayVisits] = useState('0');
  const [todayVisitsHigh, setTodayVisitsHigh] = useState('0');
  const [todayVisitsMedium, setTodayVisitsMedium] = useState('0');
  const [todayVisitsLow, setTodayVisitsLow] = useState('0');

  const [backlogs, setBacklogs] = useState('0');
  const [backlogsHigh, setBacklogsHigh] = useState('0');
  const [backlogsMedium, setBacklogsMedium] = useState('0');
  const [backlogsLow, setBacklogsLow] = useState('0');

  const [isTotalServicesExpanded, setTotalServicesExpanded] = useState(false);
  const [isVisitsTodayExpanded, setVisitsTodayExpanded] = useState(false);
  const [isBackLogsExpanded, setBackLogsExpanded] = useState(false);

  const handleCardClick = (cardTitle) => {
    // Call the custom onClickHandler when the component is clicked
    if(cardTitle === "total complaints"){

      setTotalServicesExpanded(!isTotalServicesExpanded);
      if(isVisitsTodayExpanded){
        setVisitsTodayExpanded(!setVisitsTodayExpanded);
      }
      if (isBackLogsExpanded) {
        setBackLogsExpanded(!isBackLogsExpanded);
      }

    } else if(cardTitle === "visits today"){

      setVisitsTodayExpanded(!isVisitsTodayExpanded);
      if (isTotalServicesExpanded) {
        setTotalServicesExpanded(!isTotalServicesExpanded);
      }
      if (isBackLogsExpanded) {
        setBackLogsExpanded(!isBackLogsExpanded);
      }

    } else if(cardTitle === "backlog"){

      setBackLogsExpanded(!isBackLogsExpanded);
      if(isVisitsTodayExpanded){
        setVisitsTodayExpanded(!setVisitsTodayExpanded);
      }
      if (isTotalServicesExpanded) {
         setTotalServicesExpanded(!isTotalServicesExpanded);
      }

    }


  };

  useEffect(() => {
    setLoading(true);


    console.log(`Token ${token}`);
    fetch(`${baseUrl}/api/user/dashboard/admin/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
    .then((response) => {
      console.log("data", response);
      if (response.status === 403) {
        // Handle the case where the response is not OK (e.g., an error response)
        toast.error('Session Timed Out');
        // Clear the user's authentication token or session-related data
        localStorage.removeItem('token'); // Replace 'token' with the key used to store the token or session data
        localStorage.removeItem("isLoggedIn");
        localStorage.clear();
        // history.push('/login'); // Replace '/login' with the route for your login page
        navigate("/login");
      }
      if(!response.ok){
        
        toast.error('Something Went Wrong');
        
      }
      return response.json(); // Continue parsing the response
    })
      .then(json => {

        setEngineerWorkloadList(json.data.complaintGroupByEngineer);
        setRows(json.data);

        setTotalComplaints(json.data.activeService);
        setTotalComplaintsHigh(json.data.activeServiceGroupByPriority.high);
        setTotalComplaintsMedium(json.data.activeServiceGroupByPriority.medium);
        setTotalComplaintsLow(json.data.activeServiceGroupByPriority.low);

        setTodayVisits(json.data.todayService);
        setTodayVisitsHigh(json.data.todayServiceGroupByPriority.high);
        setTodayVisitsMedium(json.data.todayServiceGroupByPriority.medium);
        setTodayVisitsLow(json.data.todayServiceGroupByPriority.low);

        setBacklogs(json.data.backLog);
        setBacklogsHigh(json.data.backLogGroupByPriority.high);
        setBacklogsMedium(json.data.backLogGroupByPriority.medium);
        setBacklogsLow(json.data.backLogGroupByPriority.low);

        

      }).finally(() => {
        setLoading(false);
      });

  }, [navigate, token]);


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
        hashMap[engineer] = 0;
    });
  }
  const sizing = {
    legend: { hidden: true },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Tricare Services</title>
      </Helmet>

      <div className="container-fluid mb-4">
        <Typography variant="h4" sx={{ mb: 5, color: colors.figmaBlue }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>

            {/* <CardTodayServices title="" color="info" totalCompleted={rows.todayCompletedService} total={rows.todayService} completed={0} /> */}

            <Card

              sx={{
                py: 2,
                backgroundColor: 'rgba(0, 91, 167, 1)',
                color: 'rgba(255, 255, 255, 1)',
                textAlign: 'center',
                margin: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick("total complaints")}

            >

              <Typography variant="h3">Active Complaints</Typography>
              <Typography variant="h3">{totalComplaints !== 0 ? totalComplaints : "0"}</Typography>


            </Card>


          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {/* <CardNextDayServices title="" total={rows.nextDayScheduled} color="warning" icon={'ant-design:windows-filled'} /> */}
            <Card

              sx={{
                py: 2,
                backgroundColor: 'rgba(68, 147, 85, 1)',
                color: 'rgba(255, 255, 255, 1)',
                textAlign: 'center',
                margin: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick("visits today")}
            >

              <Typography variant="h3">Visits Today</Typography>
              <Typography variant="h3">{todayVisits !== 0 ? todayVisits : "0"}</Typography>


            </Card>


          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {/* <CardBackLogServices title="" total={rows.backLog} color="error" icon={'ant-design:bug-filled'} /> */}

            <Card

              sx={{
                py: 2,
                backgroundColor: 'rgba(0, 130, 148, 1)',
                color: 'rgba(255, 255, 255, 1)',
                textAlign: 'center',
                margin: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick("backlog")}
            >

              <Typography variant="h3">BackLogs</Typography>
              <Typography variant="h3">{backlogs !== 0 ? backlogs : "0"}</Typography>


            </Card>

          </Grid>
        </Grid>



      </div>



      {isTotalServicesExpanded && (
        <div className="container-fluid">

          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={12}>
              <Card
                sx={
                  {
                    py: 2,
                    backgroundColor: 'rgba(0, 91, 167, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: "center",
                    margin: "auto"
                  }
                }

              >

                <div className="container-fluid" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#ff0800' }}>High</Typography>
                      <Typography variant="h3">{totalComplaintsHigh !== 0 ? totalComplaintsHigh : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#fada5e' }}>Medium</Typography>
                      <Typography variant="h3">{totalComplaintsMedium !== 0 ? totalComplaintsMedium : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{color: '#00fa9a'}}>Low</Typography>
                      <Typography variant="h3">{totalComplaintsLow !== 0 ? totalComplaintsLow : "0"}</Typography>
                    </Grid>
                  </Grid>
                </div>


              </Card>
            </Grid>
          </Grid>
        </div>
      )}

      {/* Today Visits Details  */}
      {isVisitsTodayExpanded && (
        <div className="container-fluid">

          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={12}>
              <Card
                sx={
                  {
                    py: 2,
                    backgroundColor: 'rgba(68, 147, 85, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: "center",
                    margin: "auto"
                  }
                }

              >

                <div className="container-fluid" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#ff0800' }}>High</Typography>
                      <Typography variant="h3">{todayVisitsHigh !== 0 ? todayVisitsHigh : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#fada5e' }}>Medium</Typography>
                      <Typography variant="h3">{todayVisitsMedium !== 0 ? todayVisitsMedium : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{color: '#00fa9a'}}>Low</Typography>
                      <Typography variant="h3">{todayVisitsLow !== 0 ? todayVisitsLow : "0"}</Typography>
                    </Grid>
                  </Grid>
                </div>


              </Card>
            </Grid>
          </Grid>
        </div>
      )}


      {/* Backlogs Details  */}
      {isBackLogsExpanded && (
        <div className="container-fluid">

          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={12}>
              <Card
                sx={
                  {
                    py: 2,
                    backgroundColor: 'rgba(0, 130, 148, 1)',
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: "center",
                    margin: "auto"
                  }
                }

              >

                <div className="container-fluid" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#ff0800' }}>High</Typography>
                      <Typography variant="h3">{backlogsHigh !== 0 ? backlogsHigh : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{ color: '#fada5e' }}>Medium</Typography>
                      <Typography variant="h3">{backlogsMedium !== 0 ? backlogsMedium : "0"}</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={4} justifyContent="center" item xs={12} sm={6} md={4}>
                    <Grid>
                      <Typography variant="h3" style={{color: '#00fa9a'}}>Low</Typography>
                      <Typography variant="h3">{backlogsLow !== 0 ? backlogsLow : "0"}</Typography>
                    </Grid>
                  </Grid>
                </div>


              </Card>
            </Grid>
          </Grid>
        </div>
      )}


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
                outerRadius={2}
                innerRadius={1}
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

      <br />

      <div className="container-fluid">

        <Grid container spacing={3}>

          <Grid item xs={12}>

            <DashboardTable token={token} />
          </Grid>
        </Grid>
      </div>

    </>
  );
}
