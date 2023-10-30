import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
// eslint-disable-next-line import/no-unresolved
import DashboardTable from 'src/components/tables/DashboardTable';
// eslint-disable-next-line import/no-unresolved
import colors from 'src/theme/colors';
import CardContent from '@mui/material/CardContent';

// @mui
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Card, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// 
// eslint-disable-next-line import/no-unresolved
import UnassignedTasksTable from 'src/components/tables/UnassignedTasksTable';

import Donutchart from './Donutchart';
import DonutchartBacklock from './DonutchartBacklock';

// import PieChartActivity from "./PieChartActivity";
import StackedBarChart from "./EngginerChart";
import ComplaintChart from "./ComplaintAnalysis";
import PriorityChart from "./PieChartActivity";
import InProgressChart from './InProgress';

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

  const [inProgress, setInProgess] = useState(null);
  const [todayVisit, setTodayVisit] = useState(null);
  const [backlog, setBacklog] = useState(null);
  const [serviceData, setServiceData] = useState(null);

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

  const [unassignedTasksData, setUnassignedTaskData] = useState([]);
  const [assignedTasksData, setAssignedTaskData] = useState([]);
  const [engineerWorkload, setEngineerWorkload] = useState(null);
  const [onHold, setOnHold] = useState(null);

  const handleCardClick = (cardTitle) => {
    // Call the custom onClickHandler when the component is clicked
    if (cardTitle === "total complaints") {

      setTotalServicesExpanded(!isTotalServicesExpanded);
      if (isVisitsTodayExpanded) {
        setVisitsTodayExpanded(!setVisitsTodayExpanded);
      }
      if (isBackLogsExpanded) {
        setBackLogsExpanded(!isBackLogsExpanded);
      }

    } else if (cardTitle === "visits today") {

      setVisitsTodayExpanded(!isVisitsTodayExpanded);
      if (isTotalServicesExpanded) {
        setTotalServicesExpanded(!isTotalServicesExpanded);
      }
      if (isBackLogsExpanded) {
        setBackLogsExpanded(!isBackLogsExpanded);
      }

    } else if (cardTitle === "backlog") {

      setBackLogsExpanded(!isBackLogsExpanded);
      if (isVisitsTodayExpanded) {
        setVisitsTodayExpanded(!setVisitsTodayExpanded);
      }
      if (isTotalServicesExpanded) {
        setTotalServicesExpanded(!isTotalServicesExpanded);
      }

    }


  };


  useEffect(() => {


    fetch(`${baseUrl}/api/user/complaint/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          // Handle non-OK responses (e.g., 404 Not Found, 500 Internal Server Error)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        // Handle successful response and update state
        const dataTemp = json.data;
        const unAssignedFilteredData = dataTemp.filter(item => item.engineerId === null);
        const assignedFilteredData = dataTemp.filter(item => item.engineerId !== null);
        setUnassignedTaskData(unAssignedFilteredData);
        setAssignedTaskData(assignedFilteredData);

        // setRows(dataTemp);
      })
      .catch(error => {
        // Handle errors that occurred during the fetch
        console.error('Error during fetch:', error);
        toast.error('Services not available ');
      });

  }, [token]);

  // new Api


  useEffect(() => {
    getVisitToday();
    getInProgress();
    getbacklog();
    getEngineerWorkload();
    getOnHoldData();
    fetch(`${baseUrl}/api/user/dashboard/admin/service`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setServiceData(json.data);

        // Calculate the total value for Free and Paid

        // Display total value at the top

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [])




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

  // nwe api

  const getOnHoldData = () => {

    fetch(`${baseUrl}/api/user/dashboard/admin/on-hold`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setOnHold(json.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const getVisitToday = () => {

    fetch(`${baseUrl}/api/user/dashboard/admin/today-visit`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setTodayVisit(json.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getbacklog = () => {

    fetch(`${baseUrl}/api/user/dashboard/admin/backlog`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setBacklog(json.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const getInProgress = () => {

    fetch(`${baseUrl}/api/user/dashboard/admin/in-progress`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setInProgess(json.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }



  const getEngineerWorkload = () => {

    fetch(`${baseUrl}/api/user/dashboard/admin/engineer-workload`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.data);
        setEngineerWorkload(json.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }





  return (
    <>
      <Helmet>
        <title>Tricare Services</title>
      </Helmet>

      <div className="container-fluid mb-4">
        {/* <Typography variant="h4" sx={{ mb: 5, color: colors.figmaBlue }}>
          Dashboard
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ minWidth: 180, height: 365, margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      Service Complaints
                    </Typography>

                    <div>

                      {
                        serviceData !== null ? <Donutchart data={serviceData} /> : ""

                      }

                    </div>



                  </Grid>



                </Grid>




              </CardContent>
            </Card>
          </Grid>





          <Grid item xs={12} sm={6} md={4}>





            <Card sx={{ minWidth: 200, height: 365, margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      Visit Today
                    </Typography>
                  </Grid>


                  <Grid item xs={12} sm={6} md={12}>


                    <div>
                      {
                        todayVisit != null ? <InProgressChart data={todayVisit} /> : ""

                      }

                    </div>


                  </Grid>
                </Grid>




              </CardContent>
            </Card>



          </Grid>




          <Grid item xs={12} sm={6} md={4}>

            <Card sx={{ minWidth: 200, height: 365, margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      In Progress
                    </Typography>
                  </Grid>


                  <Grid item xs={12} sm={6} md={12}>


                    <div>
                      {
                        inProgress !== null ? <InProgressChart data={inProgress} /> : ""

                      }
                    </div>

                  </Grid>
                </Grid>




              </CardContent>
            </Card>

          </Grid>


          <Grid item xs={12} sm={6} md={4}>

            {/* <CardTodayServices title="" color="info" totalCompleted={rows.todayCompletedService} total={rows.todayService} completed={0} /> */}

            <Card sx={{ minWidth: 190, height: 460, margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      Delayed
                    </Typography>
                  </Grid>


                  <Grid item xs={12} sm={6} md={12}>


                    <div>
                      {
                        backlog !== null ? <InProgressChart data={backlog} /> : ""
                      }
                    </div>






                  </Grid>

                </Grid>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Card sx={{ width: '100%', minHeight: "40vh", margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      Engineer WorkLoads
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      {
                        engineerWorkload !== null ?
                          <StackedBarChart data={engineerWorkload} /> : ""
                      }
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>

            {/* <CardTodayServices title="" color="info" totalCompleted={rows.todayCompletedService} total={rows.todayService} completed={0} /> */}

            <Card sx={{ minWidth: 190, height: 408, margin: '0 auto 20px', backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'center' }} color="text.secondary" gutterBottom>
                      On Hold
                    </Typography>
                  </Grid>


                  <Grid item xs={12} sm={6} md={12}>


                    <div>
                      {
                        onHold !== null ? <InProgressChart data={onHold} /> : ""
                      }
                    </div>





                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12} sm={6} md={8}>
            <Card sx={{ width: '100%', minheight: "60vh", backgroundColor: 'white' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Typography sx={{ fontSize: 14, color: 'black', textAlign: 'Left' }} color="text.secondary" gutterBottom>
                      Overall Activity
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ width: '100%' }}>
                      <ComplaintChart />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

        </Grid>


















      </div>










      <div className="container-fluid">

        <Grid container spacing={3}>

          <Grid item xs={12}>

            <UnassignedTasksTable data={unassignedTasksData} />

          </Grid>
        </Grid>
      </div><br />

      <div className="container-fluid">

        <Grid container spacing={3}>

          <Grid item xs={12}>

            <DashboardTable data={assignedTasksData} />

          </Grid>
        </Grid>
      </div>

    </>
  );
}
