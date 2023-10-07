import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import AppBar from '@mui/material/AppBar';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { Carousel } from 'react-material-ui-carousel';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { format } from 'date-fns'; // make sure to have date-fns installed
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import CloseIcon from '@material-ui/icons/Close';

import Chip from '@mui/material/Chip';
import { Button, Card, TextField, Typography, Grid, DialogContent } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Box from '@mui/material/Box';
// import Input from '@mui/joy/Input';

// import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


import { useNavigate, useLocation } from 'react-router-dom';


import baseUrl from '../utils/baseUrl';




const columns = [
    { id: 'srno', label: 'Sr.No', minWidth: 75, align: 'center' },
    { id: 'remark', label: 'Remark', minWidth: 100, align: 'center' },
    { id: 'username', label: 'Engineer', minWidth: 140, align: 'center' },
    { id: 'activityDatetime', label: 'Time', minWidth: 100, align: 'center', },
  
];





const override = css`
  display: block;
  margin: 0 auto;
`;








export default function Taskdetail() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [zoomedIn, setZoomedIn] = useState(false);

    const location = useLocation();
    const taskId = location.state?.taskId;
    const { state } = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [loading,setLoading]=useState(false);
    const [serviceType, setServiceType] = React.useState("Free");
    const [complaintType, setComplaintType] = React.useState("Remote");
    const [engineer, setEngineer] = React.useState('');
    const [engineerId, setEngineerId] = React.useState('');
    const [priority, setPriority] = React.useState('');


    const [productImages, setProductImages] = useState('')
    const [task, setTask] = useState({}); /* sets complaint details */
    const [customer, setCustomer] = useState({}); /* gets customer's details */
    const [engineers, setEngineers] = useState([]); /* gets engineer list */

    const token = localStorage.getItem('token');

    const postComplaintDetails = async (data) => {

        setIsLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/user/complaint/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(data),
            });
            console.log(response);

            if (response.ok) {
                toast.success("Complaint has been updated");
                setIsLoading(true)
                setTimeout(() => {
                    navigate("/dashboard/task");
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong");
            setIsLoading(false); // Stop loading
            // Handle error if needed
        } finally {
            // setIsLoading(false); // Stop loading
        }


    };

    const btnRejectTask = (e) => {

        e.preventDefault();
        const d = {
            id: `${taskId}`,
            complaintStatus: "Closed",
            ticketStatus: "Closed"
        };
        postComplaintDetails(d);
        toast.warn("Complaint has been closed sucessfully");
        setTimeout(() => {
            navigate("/dashboard/task");

        }, 2000);


    };


    // Form submission handler
    const btnAssignTask = (e) => {


        console.log(e);
        //  e.preventDefault();

        // const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        //     .toISOString().substring(0, 10);
        const d = {

            id: `${taskId}`,
            engineerId: `${engineerId}`,
            estimatedDateTime: `${`${estimatedDate} ${estimatedTime}:00`}`,
            complaintType: `${complaintType}`,
            serviceType: `${serviceType}`,
            priority: `${priority}`,
            visitDatetime: `${`${visitDate} ${visitTime}:00`}`,
            complaintStatus: "Engineer Assigned"

        };

        console.log(JSON.stringify(d));
       postComplaintDetails(d);
        // toast.success("Engineer has been assigned");
        // setTimeout(() => {
        //     navigate("/");
        // }, 4000);

    };



    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
       
        const formattedDate = format(dateTime, 'yyyy-MM-dd');
        const formattedTime = format(dateTime, 'HH:mm');

        return { formattedDate, formattedTime };
    }

    const [openImage, setOpenImage] = useState(false);
    const [image, setImage] = useState(null);
    const [estimatedTime, setSelectedTime] = useState(null);
    const [estimatedDate, setSelectedDate] = useState(null);
    const [visitTime, setVisitTime] = useState(new Date());
    const [visitDate, setVisitDate] = useState(null);
    const [product, Images] = useState('');
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleChangeServiceType = (event) => {
        // console.log(event.target.value);
        setServiceType(event.target.value);
    };

    const handleChangeComplaintType = (event) => {
        setComplaintType(event.target.value);
    };

    const handleChangeEngineer = (event) => {

        setEngineer(event.target.textContent);
        setEngineerId(event.target.value);

    };
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getProduct = (productId) => {
        console.log(productId)
        fetch(`${baseUrl}/api/user/product-master/${productId}`, {

            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then(response => response.json()).then(data => {
            setProductImages(data.data.imageName.toString().split(","));
            console.log("product", data.data.imageName)
        }).catch(error => console.log(error));
    }



    useEffect(() => {
        console.log("state is :", state)

        try {
            setIsTaskLoading(true);

            fetch(`${baseUrl}/api/user/complaint/${taskId}`, {

                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then(response => {
                    if (!response.ok) {
                        toast.error("Something Went Wrong");

                    }
                    return response.json();
                })
                .then(json => {


                    setTask(json.data);
                    getProduct(json.data.productCustomer.productId);
                    // console.log(`Task Data ${JSON.stringify(json)}`);
                    // if (json.data.engineerId !== null && json.data.engineerId !== undefined && json.data.engineerId !== 'null') {
                    //     toast.success("Engineer Already Assigned");
                    // }

                    setComplaintType(json.data.complaintType);
                    setServiceType(json.data.serviceType);
                    setPriority(json.data.priority);
                    setEngineerId(json.data.engineerId);
                    setEngineer(json.data.engineerName);

                    const { formattedDate, formattedTime } = formatDateTime(json.data.estimatedDateTime);
                    // console.log(`Estimated End Date ${  formattedDate}`);
                    // console.log(`Estimated End Time ${  formattedTime}`);
                    if (json.data.estimatedDateTime === null) {

                        setSelectedDate("");
                        setSelectedTime("");

                    } else {
                        setSelectedDate(formattedDate);
                        setSelectedTime(formattedTime);

                    }
                    const visitDatetime = new Date(json.data.visitDatetime);

                    const formattedDate2 = format(visitDatetime, 'yyyy-MM-dd');
                    const formattedTime2 = format(visitDatetime, 'HH:mm');
                    // console.log(`Estimated End Date ${  formattedDate}`);
                    // console.log(`Estimated End Time ${  formattedTime}`);
                    if (json.data.visitDatetime === null) {

                        setVisitTime("");
                        setVisitDate("");

                    } else {
                        setVisitDate(formattedDate2);
                        setVisitTime(formattedTime2);
                    }

                    console.log(formattedDate2)
                    showCustomer(json.data.customerId, token);

                });
        } catch (error) {
            console.error("Error:", error);
            navigate("dashboard/task")
        } finally {
            setIsTaskLoading(false);
        }

        try {
            fetch(`${baseUrl}/api/user/hasRole/3`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then(response => response.json())
                .then(json => {

                    // console.log(`Engineer Data ${  json.data}`);
                    setEngineers(json.data);

                });
        } catch (error) {
            console.error("Error:", error);
        }

    }, [taskId]);



    const showCustomer = (customerId, token) => {

        try {
            setIsCustomerLoading(true);
            fetch(`${baseUrl}/api/user/${customerId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then(response => response.json())
                .then(json => {

                    // console.log(`Customer Data ${  json.data}`);

                    setCustomer(json.data);

                });

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsCustomerLoading(false);
        }

    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/task-activity/`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`
          },
    
        })
    
          .then(response => response.json())
          .then(json => {
            console.log("Fetched data:", json); // This line will print the data to the console
            // setUsers(json);
            setRows(json.data);
    
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }


    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    const statusColors = {
        'Completed': 'success', // Green color
        'Submitted': 'warning',  // Yellow color
        'Engineer Assigned': 'warning',  // Yellow color
        // Add more status-color pairs as needed
    };
    const handleOpenImage = (e) => {
        setImage(e.target.src);
        setOpenImage(true);
    }
    const toggleZoom = () => {
        setZoomedIn(!zoomedIn);
    };

    return (

        <div>
            {isLoading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <ClipLoader
                        color={"#007F6D"}
                        loading={isLoading}
                        css={override}
                        size={50}
                    />
                </div>
            ) : (



                <div>
                    <Box>
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh' }} position="static">


                            {Object.keys(task).length === 0 ? (
                                // If task data is not available
                                // <Paper style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="subtitle1" style={{ fontSize: '15px' }}>
                                    No data available
                                </Typography>
                                // </Paper>
                            ) : (
                                <Toolbar>
                                    <div style={{ flexGrow: 1 }}>
                                        <div>
                                            <Typography variant="subtitle1" noWrap>
                                                <b>Complaint-Id:  </b> {task.id} &nbsp;&nbsp;&nbsp;
                                            </Typography>
                                            <Typography variant="subtitle1" noWrap>
                                                <b>Complaint Date:  </b> {formatDate(task.createdDateTime)}
                                            </Typography>

                                        </div>
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1" noWrap>
                                            <Chip
                                                label={task.complaintStatus}
                                                sx={{
                                                    backgroundColor: 'white', // White background
                                                    color: 'black', // Black text color
                                                    marginRight: '10px', // Add spacing between chip and text
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: statusColors[task.complaintStatus],
                                                        position: 'absolute'
                                                    }}
                                                />
                                            </Chip>
                                        </Typography>
                                    </div>

                                    {isLoading ? (
                                        <ClipLoader color={"#007F6D"} loading={isLoading} css={override} size={50} />
                                    ) : (
                                        /* Your existing JSX code here */
                                        <div />
                                    )}

                                </Toolbar>
                            )
                            }



                        </AppBar>




                    </Box>


                    <Grid container spacing={0}>

                        <Grid item xs={12} md={3}>
                            {
                                Object.keys(customer).length === 0 ? (
                                    // If customer data is not available
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            marginTop: '10%'
                                        }}
                                    >
                                        <ClipLoader
                                            color={"#007F6D"}
                                            loading
                                            css={override}
                                            size={30}
                                        />
                                    </div>
                                ) : (
                                    // If customer data is available
                                    <Paper style={{ height: '100%', alignItems: 'center', padding: 20, margin: "auto" }}>

                                        <Typography variant="h6" gutterBottom>
                                            Customer Profile
                                        </Typography>
                                        <Card style={{ height: '97%', maxWidth: '100%', margin: 'auto' }}>
                                            <CardMedia
                                                component="img"
                                                alt="/assets/images/avatars/avatar_15.jpg"
                                                image="/assets/images/avatars/avatar_15.jpg"
                                                style={{ maxWidth: '50%', maxHeight: '50%', margin: 'auto' }}
                                            />
                                            <CardContent style={{ width: "100%", margin: "auto" }}>
                                                <Typography variant="h5" style={{ marginTop: '1%' }}>
                                                    {customer.name}
                                                </Typography><br />
                                                <Typography variant="subtitle1" >
                                                    <b> Phone No.:</b>
                                                </Typography>
                                                <Typography variant="body1">{customer.contact}</Typography>
                                                <Typography variant="subtitle1"><b>Email Id:</b></Typography>
                                                <Typography variant="body1">{customer.email}</Typography>

                                                <Typography variant="h5" >
                                                    Address:
                                                </Typography>

                                                <div style={{ overflowWrap: 'break-word', maxWidth: "10rem" }}>
                                                    <Typography variant="body1"><b>Building No:</b> {task.buildingNo}</Typography>
                                                    <Typography variant="body1"><b>Area: </b>{task.area}</Typography>
                                                    <Typography variant="body1"><b>City: </b>{customer.city}</Typography>
                                                    <Typography variant="body1"><b>AreaPin: </b>{customer.areaPin}</Typography>
                                                    <Typography variant="body1"><b>State: </b>{customer.state}</Typography>
                                                </div>
                                            </CardContent>
                                        </Card>

                                    </Paper>
                                )
                            }
                        </Grid>


                        <Grid item xs={12} md={6}>
                            {
                                Object.keys(task).length === 0 ? (
                                    // If task data is not available
                                    // <Paper style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    //     <Typography variant="subtitle1" style={{ fontSize: '15px' }}>
                                    //         No task data available
                                    //     </Typography>
                                    // </Paper>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            marginTop: '10%'
                                        }}
                                    >
                                        <ClipLoader
                                            color={"#007F6D"}
                                            loading
                                            css={override}
                                            size={30}
                                        />
                                    </div>

                                ) : (
                                    // If task data is available
                                    <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center' }}>
                                        <Typography variant="h6" gutterBottom>
                                            {task.productCustomer.productName}
                                        </Typography>

                                        {
                                            productImages[0] === undefined ? "" :
                                                <img
                                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '2px' }}
                                                    alt="Customer Profile"
                                                    src={`${baseUrl}/resources/products/${task.productCustomer.productId}/${productImages[0]}`}
                                                />
                                        }

                                        <div style={{ display: 'flex', marginTop: '2%', flexDirection: 'column', height: '100%' }}>
                                            <div style={{ width: '100%', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <Typography variant="subtitle1">Asset Id:</Typography>
                                                        <Typography variant="subtitle1">Serial no:</Typography>
                                                        <Typography variant="subtitle1">Product Type:</Typography>
                                                        <Typography variant="subtitle1">Construction Type:</Typography>
                                                        <Typography variant="subtitle1">Installation Date:</Typography>
                                                        <Typography variant="subtitle1">Manufacturing Date:</Typography>
                                                        <Typography variant="subtitle1">Purchase Date:</Typography>
                                                        <Typography variant="subtitle1">Dispatch Date:</Typography>
                                                    </div>
                                                    <div style={{ marginLeft: '20px' }}>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{task.productCustomer.id}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{task.productCustomer.serialNo}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{task.productCustomer.productType}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{task.productCustomer.constructionType}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{formatDate(task.productCustomer.installationDate)}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{formatDate(task.productCustomer.manufacturingDate)}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{formatDate(task.productCustomer.purchaseDate)}</Typography>
                                                        <Typography variant="subtitle1" style={{ color: '#817C7A' }}>{formatDate(task.productCustomer.dispatchDate)}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div style={{ display: 'flex', marginTop: '2%', flexDirection: 'column', height: '100%', minWidth: '100%' }}>
                                        
                                            <div style={{ display: 'flex', marginTop: '2%' }}>
                                                <Card style={{ flex: 1, minHeight: 200, minWidth: '50%', marginRight: '10px', border: '2px solid black', borderRadius: '8px' }}>
                                                    <CardContent>
                                                      
                                                        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                            Work Performed
                                                        </Typography>
                                                    </CardContent>
                                                </Card>


                                                <Card style={{ flex: 1, minHeight: 200, minWidth: '50%', border: '2px solid black', borderRadius: '8px' }}>
                                                    <CardContent>
                                                   
                                                        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '2%', borderBottom: '2px solid red' }}>
                                                            Signature
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div> */}

                                        <div style={{ display: 'flex', marginTop: '2%', minWidth: '100%', flexDirection: 'column', height: '100%' }}>
                                            {/* Horizontal Cards */}
                                            <div style={{ display: 'flex', minWidth: '100%', marginTop: '2%' }}>


                                                <Card style={{ flex: 1, minHeight: 200, minWidth: '100%', border: '2px solid black', borderRadius: '8px' }}>
                                                    <CardContent>
                                                        {/* Card content for the second card */}
                                                        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                            Images
                                                        </Typography>
                                                        <Grid item xs={12} >



                                                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                                <div style={{ width: '100%' }}>

                                                                    {

                                                                        task.imageList === null || task.imageList === undefined || task.imageList.length === 0 ? " " :
                                                                            task.imageList.map(image =>
                                                                                <Button
                                                                                    value={`${baseUrl}${image}`}
                                                                                    onClick={handleOpenImage}
                                                                                    style={{ padding: 0 }}
                                                                                >
                                                                                    <img style={{ width: 200, padding: "20px" }}
                                                                                        align="left"
                                                                                        alt="Complaint images"
                                                                                        src={`${baseUrl}${image}`}
                                                                                    />
                                                                                </Button>
                                                                            )

                                                                    }
                                                                    <Dialog open={openImage} maxWidth="xl" position='relative'>
                                                                        <DialogContent style={{ position: 'relative', padding: 0, width: "100%" }}>
                                                                            <div style={{ position: 'relative', padding: 0, width: "100%" }}>
                                                                                <Button
                                                                                    edge="end"
                                                                                    color="inherit"
                                                                                    onClick={() => setOpenImage(false)}
                                                                                    aria-label="close"
                                                                                    style={{ background: "white", position: 'absolute', zIndex: "3245353", right: "20px", top: "20px" }}
                                                                                >
                                                                                    <CloseIcon />
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={toggleZoom}
                                                                                >
                                                                                    <img
                                                                                        alt="Complaint"
                                                                                        src={image}

                                                                                        style={{
                                                                                            width: zoomedIn ? '100%' : '50%',
                                                                                            height: zoomedIn ? '50%' : '100%',
                                                                                            cursor: 'pointer',
                                                                                        }}

                                                                                    />
                                                                                </Button>
                                                                            </div>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                                {
                                                                    console.log(task)
                                                                }

                                                            </Paper>


                                                        </Grid>
                                                    </CardContent>
                                                </Card>


                                            </div>
                                        </div>

                                    </Paper>
                                )
                            }


                        </Grid>



                        <Grid item xs={12} md={3}>
                            {/* {
                                Object.keys(task).length === 0  ? null : (
                                    
                                )
                            } */}
                           
                            <Paper style={{ height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                <Card style={{ width: '100%', height: '100%' }}>
                                    <CardContent>
                                    <form onSubmit={btnAssignTask}>
                                        <Card style={{ width: '100%', height: '100%', border: '2px solid red', borderRadius: '8px', marginBottom: '10%' }}>
                                            <CardContent>
                                                <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                    {task.problem}<br />
                                                </Typography>
                                                
                                                {

                                                    Object.keys(task).length !== 0 ? (
                                                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                                                            {task.problemDescription}
                                                        </Typography>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                marginTop: '10%'
                                                            }}
                                                        >
                                                            <ClipLoader
                                                                color={"#007F6D"}
                                                                loading
                                                                css={override}
                                                                size={10}
                                                            />
                                                        </div>
                                                    )

                                                }
                                            </CardContent>
                                        </Card>

                                        <FormControl sx={{ width: '100%', marginBottom: '10%' }} size="small">
                                            <InputLabel id="labelServiceType">Service Type</InputLabel>
                                            <Select
                                                labelId="labelServiceType"
                                                id="selectServiceType"
                                                value={serviceType}
                                                label="Service Type"
                                                onChange={handleChangeServiceType}
                                                required
                                            >

                                                <MenuItem value="Free">Free</MenuItem>
                                                <MenuItem value="Paid">Paid</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl sx={{ width: '100%', marginBottom: '10%' }} size="small">
                                            <InputLabel id="demo-select-small-label">Task Type</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={complaintType}
                                                label="Task Type"
                                                onChange={handleChangeComplaintType}
                                                required
                                            >

                                                <MenuItem value="Remote">Remote Support</MenuItem>
                                                <MenuItem value="Onsite">On Site Visit</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl sx={{ width: '100%', marginBottom: '10%' }} size="small">
                                            <InputLabel id="slectEngineerLabel">
                                                Select Engineer
                                            </InputLabel>
                                            <Select
                                                labelId="slectEngineerLabel"
                                                id="slectEngineer"
                                                value={engineerId}
                                                label="Select Engineer"
                                                onChange={handleChangeEngineer}
                                                required
                                            >


                                                {Object.keys(engineers).length === 0 ? null : (
                                                    engineers.map(engineer0 => (
                                                        <MenuItem key={engineer0.id} value={engineer0.id}>
                                                            {engineer0.name}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                        </FormControl>
                                        <InputLabel id="estimated-time-label" sx={{ width: '100%', marginBottom: '2%' }}>
                                            <Typography variant="subtitle1" style={{ fontSize: '15px' }}>
                                                Select Visit Date And Time
                                            </Typography>
                                        </InputLabel>
                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <TextField
                                                id="datepicker"
                                                variant="outlined"
                                                value={visitDate}
                                                onChange={(e) => setVisitDate(e.target.value)}
                                                type="date" // Use type "date" for date picker
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    // Set placeholder value here
                                                    min: new Date().toISOString().split('T')[0],
                                                }}
                                                required
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">

                                            <TextField
                                                id="timepicker"
                                                variant="outlined"
                                                value={visitTime}
                                                onChange={(e) => setVisitTime(e.target.value)}
                                                type="time" // Use type "time" for date picker
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                            />

                                        </FormControl>

                                        <InputLabel id="estimated-time-label" sx={{ width: '100%', marginBottom: '2%' }}>
                                            <Typography variant="subtitle1" style={{ fontSize: '15px' }}>
                                                Select Estimated Date And Time
                                            </Typography>
                                        </InputLabel>


                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <TextField
                                                id="datepicker"
                                                variant="outlined"
                                                value={estimatedDate}
                                                onChange={handleDateChange}
                                                type="date" // Use type "date" for date picker
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    // Set placeholder value here
                                                    min: new Date().toISOString().split('T')[0],
                                                }}
                                                required
                                            />


                                        </FormControl>

                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <TextField
                                                id="timepicker"
                                                variant="outlined"
                                                value={estimatedTime}
                                                onChange={handleTimeChange}
                                                type="time" // Use type "time" for date picker
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                renderInput={(params) => <TextField {...params} variant="standard" />}

                                                required
                                            />

                                        </FormControl>
                                       

                                        <FormControl sx={{ width: '100%', marginBottom: '2%' }} size="small">
                                            <InputLabel id="demo-select-small-label">
                                                Select Priority
                                            </InputLabel>
                                            <Select
                                                labelId="selectPriorityLabel"
                                                id="selectPriority"
                                                value={priority}
                                                label="Select Priority"
                                                onChange={handleChangePriority}
                                                required
                                            >

                                                <MenuItem value="High">High</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="Low">Low</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Button
                                            variant="contained"
                                            type='submit'
                                            sx={{
                                                backgroundColor: '#00764D',
                                                width: '100%',
                                                height: '10%',
                                                margin: '5% auto', // Horizontally centers the button
                                                borderRadius: '10px',
                                                color: 'white',
                                            }}
                                            
                                        >
                                            {task.engineerId !== null ? (
                                                task.ticketStatus === 'Closed' ? 'Re-Assign' : 'Update'
                                            ) : (
                                                'Assign'
                                            )}
                                        </Button>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'red',
                                                width: '100%',
                                                height: '10%',
                                                margin: '5% auto', // Horizontally centers the button
                                                borderRadius: '10px',
                                                color: 'white',
                                            }}
                                            onClick={btnRejectTask}
                                        >
                                            {task.engineerId !== null ? (
                                                'Close'
                                            ) : (
                                                'Reject'
                                            )}
                                        </Button>
                                        </form>
                                    </CardContent>




                                </Card>

                            </Paper>
                          


                        </Grid>

                        <Grid item xs={12} style={{ marginTop: '0%' }}>
                            {/* <Item> */}
                                {/* <Card > */}
                                <Typography variant="subtitle1" style={{ marginRight:'90%' }}>
                                                Activity
                                            </Typography>


                                <Paper sx={{ width: '100%', overflow: 'hidden',marginTop:'1%' }}>
                                    <TableContainer sx={{ height: "65vh" }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}

                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                {columns.map((column) => {
                                                                    const value = row[column.id];

                                                                   


                                                                    if (column.id === 'activityDatetime') {
                                                                        return (
                                                                            <TableCell key={column.id} align={column.align}>
                                                                                {/* <Button onClick={() => routeChange4(row.id)} variant="contained"> Details </Button> */}
                                                                                {formatDate(task.createdDateTime)}
                                                                            </TableCell>

                                                                        );


                                                                    }


                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {value}
                                                                        </TableCell>

                                                                    );
                                                                })}
                                                            </TableRow>

                                                        ))}
                                            </TableBody>



                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}

                                    />
                                </Paper>

                                {/* </Card> */}


                            {/* </Item> */}
                        </Grid>




                    </Grid>


                </div>

            )}


        </div>

    );

}