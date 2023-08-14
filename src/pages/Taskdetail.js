import React, { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, Input, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Input from '@mui/joy/Input';

import { Navigate, useNavigate,useLocation } from 'react-router-dom';

import Iconify from '../components/iconify';

import baseUrl from '../utils/baseUrl';


const columnsCompt = [
    { id: 'customername', label: 'Rapid Pod', minWidth: 85 },
    { id: 'area', label: 'Make', minWidth: 140 },
    { id: 'noofproduct', label: 'Warranty', minWidth: 100 },
    {
        id: 'contactno',
        label: 'Start Warranty',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'joindate',
        label: 'End Warranty',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'button',
        label: 'view Details',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toFixed(2),
    },
];

const token = localStorage.getItem('token');


const columns = [
    { id: 'customername', label: 'Products', minWidth: 85 },
    { id: 'area', label: 'Complaints', minWidth: 140 },
    { id: 'noofproduct', label: 'Ticket Id', minWidth: 100 },
    {
        id: 'contactno',
        label: 'Complaint Date',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //     id: 'joindate',
    //     label: 'Action',
    //     minWidth: 140,
    //     align: 'right',
    //     // format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'button',
        label: 'Action',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toFixed(2),
    },
];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const postComplaintDetails=async (data)=>{
        
    const response = await fetch(`${baseUrl}/api/user/complaint/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
           Authorization: `Bearer ${token}`
        },
  
        body: JSON.stringify(data),
      });
        console.log(response);

}









export default function Taskdetail() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const location=useLocation();

    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate=useNavigate();
    const [value, setValue] = React.useState('1');

    const [freeservice, setFreeservice] = React.useState('')
    const [tasktype, setTasktype] = React.useState('');
    const [engineer, setEngineer] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const [data,setData]=useState({})


    const [date, setEstimateDate] = useState('');

    const[task,setTask]=useState({});
    const[customer,setCustomer]=useState({});
    const[engineers,setEngineers]=useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [open, setOpen] = React.useState(false);
    const [openUser, setUserOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenUserPopup = () => {
        setUserOpen(true);
    }
    const handleClickClose1 = () => {
        setUserOpen(false);
    }
    const handleClickOpen1 = () => {
        setUserOpen(false);
    }

    const handleSubmit2=(e)=>{
        
        e.preventDefault();
        const d={
            id:`${location.state.taskId}`,
            complaintStatus:"Closed",
            ticketStatus:"De-activated"
        }
        postComplaintDetails(d);
        toast.warn("Complaint has been rejected")
        setTimeout(() => {
            navigate("/");
          }, 2000);
        
         
    }


    // Form submission handler
    const handleSubmit1 = (e) => {
        console.log(e);
        e.preventDefault();

       const formattedDate=new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString().substring(0,10);
       const d={
        engineerId:`${engineer}`,
        estimatedDate:`${formattedDate}`,
        serviceType:`${tasktype}`,
        priority:`${priority}`,
        id:`${location.state.taskId}`,
        complaintStatus:"Engineer Assigned"


    }

    console.log(JSON.stringify(d));
    postComplaintDetails(d);
        toast.success("Engineer has been assigned")
      setTimeout(() => {
        navigate("/");
      }, 2000);

    };


 


    const routeChange1 = () => {
        window.location.href = "/Taskdetail";
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    const handleChange3 = (event) => {
        console.log(event)
        setFreeservice(event.target.value);


    };

    const handleChange2 = (event) => {

        setTasktype(event.target.value);


    };

    const handleChange1 = (event) => {
        console.log(event.target.value);

        setEngineer(event.target.value);


    };
    const handleChange4 = (event) => {

        setPriority(event.target.value);


    };


    const handleDateChange = (date) => {
        
        
        setEstimateDate(date);
    };

    useEffect(() => {
        
         fetch(`${baseUrl}/api/user/complaint/${location.state.taskId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },
    
        })
            .then(response => response.json())
            .then(json => {
                
                  console.log(json.data);   
                  setTask(json.data);
                  if(task.engineerName!==null){
                    toast.success("Engineer Already Assigned")
                  }
                  showCustomer(json.data.customerId,token);
                    
        
                    
                  
            })

            fetch(`${baseUrl}/api/user/hasRole/3`, {
               method: 'GET',
               mode: 'cors',
               headers: {
                   Authorization: `Bearer ${token}`
               },
       
           })
               .then(response => response.json())
               .then(json => {
                   
                     console.log(json.data);   
                     setEngineers(json.data);
               
                     
               })
      
    }, []);


 const showCustomer = (customerId,token) => {

      fetch(`${baseUrl}/api/user/${customerId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => response.json())
        .then(json => {
            
              
              console.log(json.data);
              
              setCustomer(json.data);
              
              
        })
       


    };





    return (



        <div>
            <Box>
      <AppBar style={{backgroundColor:'#007F6D',padding:'1vh'}}  position="static">
        <Toolbar >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <div>
                
                <div>
                    <a><b>Task-Id : </b> {task.id} </a>&nbsp;&nbsp;&nbsp;
                    <a><b>Date : </b> {task.estimatedDate} </a>
                </div>
                <div>
                    <a><b>Problem : {task.problem}</b></a>
                </div>
            </div>
          </Typography>

          <br/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >Status : &nbsp;
            {task.ticketStatus==="De-activated"?(<a>Completed</a>):(<a>In-Progress</a>)}
            
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
            <Grid container spacing={0.75} >






                <Grid item xs={3} >
                    {
                        Object.keys(customer).length===0?"":(
                    <Item style={{ height: '705px', fontSize: '24px' }}>
                        Profile

                        <img style={{ width: 150, height: 150, marginLeft: '30%', paddingBottom: '65px', marginTop: '38px', color: 'white' }} alt="Bx bxs lock alt" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQmcqzN9KSMx-hxPJfiB3yt59uQhN9R4IqjisfUEitJv9lbQVN14QYLsUfmgiH-AoH2VgTFMdRBaTWa9XXpU9aMV1fveYnRgRsf4peaqt_rCR_qyQ483NgjHHdhfYpOr8axyGWhk3DHw5lAUQkXl6NGMugPS7k6Apw7CUjqRMgwAv01i2_AXyRumuBfw/w680/blank-profile-picture-hd-images-photo.JPG" />
                        <p style={{ fontSize: '25px', marginTop: '-25px' }}>Name:{customer.name}</p>
                        <p style={{ fontSize: '19px', marginTop: '0px' }}>Email:{customer.email}</p>
                        <p style={{ fontSize: '19px', marginTop: '-15px' }}>Contact:{customer.contact}</p>
                        <p style={{ fontSize: '19px', marginTop: '18px' }}>AreaPin:{customer.areaPin}</p>
                        <p style={{ fontSize: '19px', marginTop: '-12px' }}>City:{customer.city}</p>
                        <p style={{ fontSize: '19px', marginTop: '19px' }}>State:{customer.state}</p>
                        <p style={{ fontSize: '19px', marginTop: '-12px' }}>Address:{customer.address}</p>
                    </Item>
                        )
                    }




                </Grid>

                <Grid item xs={6} >
                    {
                     (Object.keys(task).length===0)?"":(
                    <Item style={{ height: '705px', }}>
                        <div style={{ padding: '20px', }}>

                            {/* <img style={{ width: 125, height: 95, marginLeft: '80px' }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" /> */}
                            <p style={{ fontWeight:'bold',fontSize: '38px', marginRight: '138px', marginTop: '-10px' }}>{task.productCustomer.productName}</p>
                            <Grid container spacing={9}>
                                <Grid item xs={5.5}>

                                    <ul style={{lineHeight:'2', listStyleType: 'none',fontSize: '15px',textAlign:'left' }}>
                                        <li > Complaint Id  </li>
                                        <li> Serial no  </li>
                                        <li>Product </li>
                                        <li> Date of Manufacturing</li>
                                        <li> Date of installation </li>
                                        <li> Complaint Register At</li>
                                        <li> Product Type</li>
                                        <li> Purchase Date</li>
                                        <li> Warranty Period</li>
                                        <li>Customer Contact</li>
                                        <li>Problem</li>
                                        <li>Complaint Status</li>
                                        <li>Engineer Name </li>
                                        <li>Customer City</li>
                                        <li> Pincode </li>
                                        <li>Address</li>
                                    </ul>
                                </Grid>

                                <Grid item xs={4}>
                                    <ul style={{ lineHeight:'2',listStyleType: 'none',fontSize: '15px',textAlign:'left',width:'100vh' }}>
                                    {task.id}
                                        <li>{task.productCustomer.serialNo} </li>
                                        <li>{task.productCustomer.productName}</li>
                                        <li >{task.productCustomer.manufacturingDate}</li>
                                        <li >{task.productCustomer.installationDate}</li>
                                        <li >{new Date(task.createdDateTime).toLocaleDateString()}</li>
                                        <li >{task.productCustomer.productType}</li>
                                        <li > {task.productCustomer.purchaseDate}</li>
                                        <li >{task.productCustomer.warrantyPeriod}</li>
                                        <li>{task.contact}</li>
                                        <li >{task.problem}</li>
                                        <li > {task.complaintStatus}</li>
                                        <li>{task.engineerName}</li>
                                        <li > {task.city}</li>
                                        <li > {task.pinCode}</li>
                                        <li > {task.area}</li>

                                    </ul>



                                </Grid>
                            </Grid>



                        </div>

                    </Item>
                    )
                    }




                </Grid>

                <Grid item xs={3} >
                    {
                        task.ticketStatus!=="active"?"":(
                        
                    <Item style={{ height: '705px', }}>
                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Free Service</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={freeservice}
                                label="Select Engineer"
                                onChange={handleChange3}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                               
                                <MenuItem value="Free"><em>Free</em> </MenuItem>
                                <MenuItem value="Paid"><em>Paid</em></MenuItem>
                            </Select>
                        </FormControl>
                            
                           
                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">{task.complaintType}</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={tasktype}
                                label="Select Engineer"
                                onChange={handleChange2}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem > </MenuItem>
                                <MenuItem value="Remote"><em>Remote</em></MenuItem>
                                <MenuItem value="Onsite"><em>Onsite</em></MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">{
                                  task.engineerName===null?
                                    (<MenuItem value=""><em><b>Engineer</b></em></MenuItem>)
                                    :(<MenuItem ><em><b>{task.engineerName}</b></em></MenuItem>)
                               
                                }</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={engineer}
                                label="Select Engineer"
                                defaultValue='hello'
                                onChange={handleChange1}
                              
                            >
                               
                                <MenuItem value=""><em>None</em></MenuItem>
                                {
                                Object.keys(engineers).length===0?"":(
                                    engineers.map(engineer0=>
                                <MenuItem value={engineer0.id}>{engineer0.name} </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>


                        <div>
                            <h3>Select Estimated Time</h3>
                            <DatePicker

                                id="datepicker"
                                
                                selected={date}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                            // You can add more props and configurations as needed
                            />
                        </div>


                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label"><b>{task.priority} </b></InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={priority}
                                label="Priority"
                            
                                onChange={handleChange4}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="High">High </MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                            
                           </FormControl>

                           {/* <select className="form-select" aria-label="Default select example">
                             <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </select> */}
                           
                            
                    


                        <button style={{ backgroundColor: '#00764D', width: '77%', height: '6%', marginLeft: '5%', marginTop: '5%', color: 'white', borderRadius: '16px' }}
                        onClick={handleSubmit1}
                        >Task Assign / Re-assign</button>
                        <button style={{ backgroundColor: 'Red', width: '77%', height: '6%', marginLeft: '5%', marginTop: '5%', color: 'white', borderRadius: '16px' }}
                        onClick={handleSubmit2}
                        >Reject</button>

                    

                    </Item>

                        )
                    }



                </Grid>












                {/* <Grid item xs={9}> */}

                {/* </Grid> */}






            </Grid>

      </div>
    );

}