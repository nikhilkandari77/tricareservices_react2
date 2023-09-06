import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import AppBar from '@mui/material/AppBar';
import { Carousel } from 'react-material-ui-carousel';

import Toolbar from '@mui/material/Toolbar';

import { format } from 'date-fns'; // make sure to have date-fns installed
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";


import Chip from '@mui/material/Chip';
import { Button, Card, TextField, Typography, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Box from '@mui/material/Box';
// import Input from '@mui/joy/Input';

import { useNavigate, useLocation } from 'react-router-dom';


import baseUrl from '../utils/baseUrl';



const token = localStorage.getItem('token');

const override = css`
  display: block;
  margin: 0 auto;
`;








export default function Taskdetail() {
    const location = useLocation();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isCustomerLoading, setIsCustomerLoading] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);

    const [serviceType, setServiceType] = React.useState('');
    const [complaintType, setComplaintType] = React.useState('');
    const [engineer, setEngineer] = React.useState('');
    const [engineerId, setEngineerId] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const [productImages, setProductImages] = useState('')
    const [task, setTask] = useState({}); /* sets complaint details */
    const [customer, setCustomer] = useState({}); /* gets customer's details */
    const [engineers, setEngineers] = useState([]); /* gets engineer list */

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
                setTimeout(() => {
                    navigate("/dashboard/task");
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong");
            // Handle error if needed
        } finally {
            setIsLoading(false); // Stop loading
        }


    };

    const btnRejectTask = (e) => {

        e.preventDefault();
        const d = {
            id: `${location.state.taskId}`,
            complaintStatus: "Closed",
            ticketStatus: "Closed"
        };
        postComplaintDetails(d);
        toast.warn("Complaint has been rejected sucessfully");
        setTimeout(() => {
            navigate("/dashboard/task");

        }, 2000);


    };


    // Form submission handler
    const btnAssignTask = (e) => {


        console.log(e);
        e.preventDefault();

        // const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        //     .toISOString().substring(0, 10);
        const d = {

            id: `${location.state.taskId}`,
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
        // }, 2000);

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
        const taskId=location.state.taskId

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

    }, [location.state.taskId]);



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

    const statusColors = {
        'Completed': 'success', // Green color
        'Submitted': 'warning',  // Yellow color
        'Engineer Assigned': 'warning',  // Yellow color
        // Add more status-color pairs as needed
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
                                    <Paper style={{ height: '100%', alignItems: 'center',padding:20,margin:"auto"}}>
                                        <Typography variant="h6" gutterBottom>
                                            Customer Profile
                                        </Typography>
                                        <Card style={{ height: '100%', maxWidth: '100%', margin: 'auto' }}>
                                            <CardMedia
                                                component="img"
                                                alt="/assets/images/avatars/avatar_15.jpg"
                                                image="/assets/images/avatars/avatar_15.jpg"
                                                style={{ maxWidth: '50%', maxHeight: '50%', margin: 'auto' }}
                                            />
                                            <CardContent style={{ width:"100%",margin:"auto"}}>
                                                <Typography variant="h5" style={{ marginTop: '1%' }}>
                                                    {customer.name}
                                                </Typography>
                                                <Typography variant="subtitle1" style={{ marginTop: '10%' }}>
                                                    Phone No.:
                                                </Typography>
                                                <Typography variant="body1">{customer.contact}</Typography>
                                                <Typography variant="subtitle1">Email Id:</Typography>
                                                <Typography variant="body1">{customer.email}</Typography>
                                                <Typography variant="subtitle1" style={{ marginTop: '10%' }}>
                                                    Address:
                                                </Typography>
                                                <Typography variant="body1">Building No: {task.buildingNo}</Typography>
                                                <Typography variant="body1">Area: {task.area}</Typography>
                                                <Typography variant="body1">City: {customer.city}</Typography>
                                                <Typography variant="body1">AreaPin: {customer.areaPin}</Typography>
                                                <Typography variant="body1">State: {customer.state}</Typography>
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
                                                                <div style={{ height: "20vh", width: '100%' }}>

                                                                    {
                                                                        task.images !== "" && task.images !== null && task.images !== undefined ?
                                                                            task.images.toString().split(",").map(image =>
                                                                                <img style={{ width: 200 }}
                                                                                    align="left"
                                                                                    alt="Complaint images"
                                                                                    src={`${baseUrl}/resources/complaintImages/${task.id}/${image}`}
                                                                                />
                                                                            ) : ""

                                                                    }
                                                                </div>
                                                                {
                                                                    console.log(task.images)
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
                                                    {task.problem}<br/>
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

                                        <FormControl sx={{ width: '100%', marginBottom: '10%' }} size="small">
                                            <InputLabel id="labelServiceType">Service Type</InputLabel>
                                            <Select
                                                labelId="labelServiceType"
                                                id="selectServiceType"
                                                value={serviceType}
                                                label="Service Type"
                                                onChange={handleChangeServiceType}
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
                                                Select Estimated DateTime
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
                                            />
                                        </FormControl>
                                        <InputLabel id="estimated-time-label" sx={{ width: '100%', marginBottom: '2%' }}>
                                            <Typography variant="subtitle1" style={{ fontSize: '15px' }}>
                                                Select Visit Datetime
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
                                            >

                                                <MenuItem value="High">High</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="Low">Low</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#00764D',
                                                width: '100%',
                                                height: '10%',
                                                margin: '5% auto', // Horizontally centers the button
                                                borderRadius: '10px',
                                                color: 'white',
                                            }}
                                            onClick={btnAssignTask}
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

                                    </CardContent>

                                </Card>
                            </Paper>


                        </Grid>


                    </Grid>

                </div>

            )}
        </div>
    );

}