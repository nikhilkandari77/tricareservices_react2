import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import AppBar from '@mui/material/AppBar';
import { Carousel } from 'react-material-ui-carousel';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Toolbar from '@mui/material/Toolbar';

import { format } from 'date-fns'; // make sure to have date-fns installed
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";


import Chip from '@mui/material/Chip';
import { Button, Card, TextField, Typography, Grid, DialogContent, DialogContentText } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
// import Input from '@mui/joy/Input';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useNavigate, useLocation } from 'react-router-dom';


import baseUrl from '../utils/baseUrl';


const override = css`
  display: block;
  margin: 0 auto;
`;

// table column
const columns = [

    { id: 'srno', label: 'Sr.No', minWidth: 10, align: 'center' },
    { id: 'remark', label: 'Activity', minWidth: 50, align: 'center' },
    { id: 'username', label: 'User', minWidth: 100, align: 'center' },
    { id: 'message', label: 'Message', minWidth: 140, align: 'center' },
    { id: 'activityDatetime', label: 'TimeStamp', minWidth: 100, align: 'center' },

];


export default function TaskHistoryDetail() {
    const [openImage, setOpenImage] = useState(false);
    const [image, setImage] = useState(null);
    const location = useLocation();
    const taskId = location.state?.taskId;
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);

    const [serviceType, setServiceType] = React.useState('');
    const [complaintType, setComplaintType] = React.useState('');
    const [engineer, setEngineer] = React.useState('');
    const [engineerId, setEngineerId] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const [productImages, setProductImages] = useState('');
    const [task, setTask] = useState({}); /* sets complaint details */
    const [customer, setCustomer] = useState({}); /* gets customer's details */
    const [engineers, setEngineers] = useState([]); /* gets engineer list */

    const token = localStorage.getItem('token');

    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const formattedDate = format(dateTime, 'yyyy-MM-dd');
        const formattedTime = format(dateTime, 'HH:mm');

        return { formattedDate, formattedTime };
    }

    const [estimatedTime, setSelectedTime] = useState(null);
    const [estimatedDate, setSelectedDate] = useState(null);
    const [visitTime, setVisitTime] = useState(null);
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

    // const getProduct = (productId) => {
    //     console.log(productId)
    //     fetch(`${baseUrl}/api/user/product-master/${productId}`, {

    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },

    //     }).then(response => response.json()).then(data => {
    //         setProductImages(data.data.imageName.toString().split(","));
    //         console.log("product", data.data.imageName)
    //     }).catch(error => console.log(error));
    // }



    useEffect(() => {


        try {
            setIsTaskLoading(true);

            fetch(`${baseUrl}/api/user/complaint-history/${taskId}`, {

                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then(response => {
                    if (!response.ok) {
                        toast.error("Something Went Wrong");
                        // Clear the user's authentication token or session-related data
                        // localStorage.removeItem('token'); // Replace 'token' with the key used to store the token or session data
                        // localStorage.removeItem("isLoggedIn");
                        // localStorage.clear();
                        // // history.push('/login'); // Replace '/login' with the route for your login page
                        // navigate("/login");

                    }
                    return response.json();
                })
                .then(json => {


                    setTask(json.data);
                    // getProduct(json.data.productCustomer.productId);
                    // console.log(`Task Data ${JSON.stringify(json)}`);
                    // if (json.data.engineerId !== null && json.data.engineerId !== undefined && json.data.engineerId !== 'null') {
                    //     toast.success("Engineer Already Assigned");
                    // }

                    setProductImages(json.data.productCustomer.productImageName.toString().split(","));

                    setComplaintType(json.data.complaintType);
                    setServiceType(json.data.serviceType);
                    setPriority(json.data.priority);
                    setEngineerId(json.data.engineerId);
                    setEngineer(json.data.engineerName);

                    const { formattedDate, formattedTime } = formatDateTime(json.data.closeDateTime);
                    // console.log(`Estimated End Date ${  formattedDate}`);
                    // console.log(`Estimated End Time ${  formattedTime}`);
                    if (json.data.closeDateTime === null) {

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

                    console.log(formattedDate2);
                    showCustomer(json.data.customerId, token);

                });
        } catch (error) {
            console.error("Error:", error);
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

    }, [location.state.taskId, taskId, token]);



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

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    function formatTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const formattedTime = format(dateTime, 'HH:mm');
        return formattedTime;
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
    };
    const toggleZoom = () => {
        setZoomedIn(!zoomedIn);
    };
    const [zoomedIn, setZoomedIn] = useState(false);

    // table API

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoading(false);
        fetch(`${baseUrl}/api/user/task-activity/${taskId}`, {
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
                setIsLoading(false);
            });
    }, [taskId]);

    function formatMonthDateTime(dateString) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }

    let sr = 0;




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
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh', borderRadius: "3px" }} position="static">


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
                                    <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                                        <Typography variant="h6" gutterBottom>
                                            Customer Profile
                                        </Typography>
                                        <Card style={{ height: '97%', maxWidth: '100%', marginBottom: '2px' }}>
                                            <CardMedia
                                                component="img"
                                                alt="/assets/images/avatars/avatar_15.jpg"
                                                image="/assets/images/avatars/avatar_15.jpg"
                                                style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '1px' }}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" style={{ marginTop: '1%' }}>
                                                    {customer.name}
                                                </Typography>
                                                <Typography variant="subtitle1" style={{ marginTop: '10%' }}>
                                                    Phone No.
                                                </Typography>
                                                <Typography variant="body1">{task.contact}</Typography>
                                                <Typography variant="subtitle1">Email Id.</Typography>
                                                <Typography variant="body1">{customer.email}</Typography>

                                                <Typography variant="h5" >
                                                    Address:
                                                </Typography>

                                                <div style={{ overflowWrap: 'break-word', maxWidth: "10rem" }}>
                                                    <Typography variant="body1"><b>Building No:</b> {task.buildingNo}</Typography>
                                                    <Typography variant="body1"><b>Area: </b>{task.area}</Typography>
                                                    <Typography variant="body1"><b>City: </b>{task.city}</Typography>
                                                    <Typography variant="body1"><b>AreaPin: </b>{task.pinCode}</Typography>
                                                    {/* <Typography variant="body1"><b>State: </b>{customer.state}</Typography> */}
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

                                        <Card style={{ width: '100%', height: '100%', border: '2px solid red', borderRadius: '8px', marginBottom: '10%' }}>
                                            <CardContent>
                                                <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '2%' }}>
                                                    {task.problem}<br />
                                                </Typography>
                                                {/* <Typography variant="body1" style={{ textAlign: 'center' }}>
                                                    {task.problemDescription}
                                                </Typography> */}
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

                                        {/* <FormControl sx={{ width: '100%', marginBottom: '10%' }} size="small">
                                            <InputLabel id="labelServiceType">Service Type</InputLabel>
                                            <Select
                                                labelId="labelServiceType"
                                                id="selectServiceType"
                                                value={serviceType}
                                                label="Service Type"
                                                onChange={handleChangeServiceType}
                                                disabled

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
                                                disabled
                                            >

                                                <MenuItem value="Remote Support">Remote Support</MenuItem>
                                                <MenuItem value="On Site Visit">On Site Visit</MenuItem>
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
                                                disabled
                                            >


                                                {Object.keys(engineers).length === 0 ? null : (
                                                    engineers.map(engineer0 => (
                                                        <MenuItem key={engineer0.id} value={engineer0.id}>
                                                            {engineer0.name}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Select>
                                        </FormControl> */}

                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Service Type :   </b>{task.serviceType}</div>
                                        </FormControl>

                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Complaint Type :   </b>{task.complaintType}</div>
                                        </FormControl>

                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Service Engineer :   </b>{task.engineerName || 'Not Assigned'}</div>
                                        </FormControl>

                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Closed Date : </b>{formatMonthDateTime(task.closeDateTime)}</div>
                                        </FormControl>

                                        {/* <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">

                                            <div><b>Closed Time : </b>{estimatedTime}</div>
                                        </FormControl> */}

                                        {/* <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Visit Date : </b>{visitDate}</div>
                                        </FormControl>
                                        <FormControl variant="outlined" sx={{ width: '100%', marginBottom: '5%' }} size="small">
                                            <div><b>Visit Time : </b>{visitTime}</div>

                                        </FormControl> */}
                                        <FormControl sx={{ width: '100%', marginBottom: '2%' }} size="small">

                                            <div><b>Priority : </b>{priority}</div>

                                        </FormControl>





                                    </CardContent>

                                </Card>
                            </Paper>


                        </Grid>

                        <Grid item xs={12} style={{ marginTop: '0%' }}>
                            {/* <Item> */}
                            {/* <Card > */}
                            <Typography variant="subtitle1" style={{ marginRight: '90%' }}>
                                Activity
                            </Typography>


                            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1%' }}>
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

                                                            if (column.id === 'srno') {
                                                                sr += 1;
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {value === null ? '' : String(sr)}
                                                                    </TableCell>
                                                                );
                                                            }


                                                            if (column.id === 'activityDatetime') {
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {/* <Button onClick={() => routeChange4(row.id)} variant="contained"> Details </Button> */}
                                                                        {formatDate(value)}  {formatTime(value)}
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