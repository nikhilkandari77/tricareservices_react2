import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Doughnut } from 'react-chartjs-2';


import DashboardTable from '../components/tables/DashboardTable';




    const InProgressChart = (props) => {
        const total = [30, 40, 30];
        console.log("props",  props);
        if (props.data) {
            total[0] =
                (props.data.remoteFree ? props.data.remoteFree[0] : 0) +
                (props.data.onsiteFree ? props.data.onsiteFree[0] : 0) +
                (props.data.remotePaid ? props.data.remotePaid[0] : 0) +
                (props.data.onsitePaid ? props.data.onsitePaid[0] : 0);

            total[1] =
                (props.data.remoteFree ? props.data.remoteFree[1] : 0) +
                (props.data.onsiteFree ? props.data.onsiteFree[1] : 0) +
                (props.data.remotePaid ? props.data.remotePaid[1] : 0) +
                (props.data.onsitePaid ? props.data.onsitePaid[1] : 0);

            total[2] =
                (props.data.remoteFree ? props.data.remoteFree[2] : 0) +
                (props.data.onsiteFree ? props.data.onsiteFree[2] : 0) +
                (props.data.remotePaid ? props.data.remotePaid[2] : 0) +
                (props.data.onsitePaid ? props.data.onsitePaid[2] : 0);
        }

        // const totalValue = props.data !== null
        // ? props.data.map((obj) => obj.value).reduce((v1, v2) => v1 + v2, 0)
        // : 0;

        // Use an effect to update the `rows` state when `data` prop changes
        // useEffect(() => {
        //     setTotalSum(total);
        // }, [total]);

        const [chartData, setChartData] = useState({
        labels: props.data.label,
        datasets: [
        {
            data: total, // Initial data
            backgroundColor: ['#FF5733', '#FFC300', '#36A2EB'],
        },
        ],
    });

  const [workTypes, setWorkTypes] = useState([]); // Default 'remote' is selected
  const [totalSum, setTotalSum] = useState(0); // State for total sum

  const handleCheckboxChangeInProgress = (event) => {
    const selectedWorkType = event.target.value;
    const updatedWorkTypes = workTypes.includes(selectedWorkType)
      ? workTypes.filter((type) => type !== selectedWorkType)
      : [...workTypes, selectedWorkType];
    setWorkTypes(updatedWorkTypes);
    updateChart(updatedWorkTypes);
    updateAssignedTasksData(updatedWorkTypes);
  };

  const updateAssignedTasksData = (selectedWorkTypes) => {
    if (props.data && props.data.assignedTasksData) {
      // Filter and update assigned tasks data based on selected work types
      const updatedAssignedTasksData = props.data.assignedTasksData.filter((task) =>
        selectedWorkTypes.includes(task.workType)
      );
      setAssignedTaskData(updatedAssignedTasksData);
    }
  };
  










  const updateChart = (selectedWorkTypes) => {
    const workTypeData = {
      remotefree: props.data.remoteFree,
      onsitefree: props.data.onsiteFree,
      remotepaid: props.data.remotePaid,
      onsitepaid: props.data.onsitePaid,
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

    // Calculate the total sum
    let sum = 0;
    selectedWorkTypes.forEach((selectedType) => {
      workTypeData[selectedType].forEach((value) => {
        sum += value;
      });
    });

    setTotalSum(sum);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [assignedTasksData, setAssignedTaskData] = useState([]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };


  // show total data

  useEffect(() => {
    if (props.data) {
      const initialTotal = total.reduce((acc, value, index) => {
        return acc + total[index];
      }, 0);
      setTotalSum(initialTotal);
    }
  }, [props.data]);





  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '200px', height: '180px' }}>
      <Doughnut data={chartData}  />
      </div>
      <div style={{ marginTop: '20px',  textAlign:"center",alignItems:"center",margin:"auto"}}>
      <label htmlFor="onsitefree" style={{ marginRight: '20px', fontSize: '14px'}} >
          <input
            type="checkbox"
            name="workType"
            value="remotefree"
            checked={workTypes.includes('remotefree')}
            onChange={handleCheckboxChangeInProgress}
            style={{ marginRight: '5px' }}
          />
          Remote-Free
        </label>
        <label htmlFor="onsitefree" style={{ marginRight: '20px', fontSize: '14px'}} >
          <input
            type="checkbox"
            // id="onsite"
            name="workType"
            value="remotepaid"
            checked={workTypes.includes('remotepaid')}
            onChange={handleCheckboxChangeInProgress}
            style={{ marginRight: '5px' }}
          />
          Remote-Paid
        </label>
        <label htmlFor="onsitefree" style={{ marginRight: '20px', fontSize: '14px'}} >
          <input
            type="checkbox"
            // id="free"
            name="workType"
            value="onsitefree"
            checked={workTypes.includes('onsitefree')}
            onChange={handleCheckboxChangeInProgress}
            style={{ marginRight: '5px' }}
          />
          Onsite-Free
        </label>
        <label htmlFor="onsitefree" style={{ marginRight: '20px', fontSize: '14px'}} >
          <input
            type="checkbox"
            // id="paid"
            name="workType"
            value="onsitepaid"
            checked={workTypes.includes('onsitepaid')}
            onChange={handleCheckboxChangeInProgress}
            style={{ marginRight: '5px' }}
          />
          Onsite-Paid
        </label>      </div>
      <div>
        <Button 
        // onClick={() => setIsModalOpen(true)} 
        style={{color:'black'}}>Total: {totalSum}</Button>
      </div>
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
          <DashboardTable data={assignedTasksData} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleClose} style={{color:'red'}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>






    </div>
  );
};

export default InProgressChart;
