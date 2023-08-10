import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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



import Iconify from '../components/iconify';




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

function createData(customername, area, noofproduct, contactno, button) {
    // const density = asset / serialno;
    return { customername, area, noofproduct, contactno, button };
}

function createData1(customername, area, noofproduct, contactno, joindate, button) {
    // const density = asset / serialno;
    return { customername, area, noofproduct, contactno, joindate, button };
}

const rows = [
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
    // createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),

];





const rowsCompt = [
    createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
    createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
    createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
    createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
    createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),

    // createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),

];




export default function Complaintdetail() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);



    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [value, setValue] = React.useState('1');

    const [freeservice, setFreeservice] = React.useState('')
    const [tasktype, setTasktype] = React.useState('');
    const [engineer, setEngineer] = React.useState('');
    const [priority, setPriority] = React.useState('');



    const [selectedDate, setSelectedDate] = useState(null);




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



    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform actions with form data, e.g., validation or sending data to a server
        // Example: console.log(name, contactNo, email, address);

        // Reset form fields
        setName('');
        setContactNo('');
        setEmail('');
        setAddress('');
    };

    const routeChange = () => {
        window.location.href = "/complaintdetail";
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





    const handleChange3 = (event) => {

        setFreeservice(event.target.value);


    };

    const handleChange2 = (event) => {

        setTasktype(event.target.value);


    };

    const handleChange1 = (event) => {

        setEngineer(event.target.value);


    };
    const handleChange4 = (event) => {

        setPriority(event.target.value);


    };



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };








    return (



        <div>
            <Grid container spacing={0.75} >


                <Grid item xs={12} >




                    <Item style={{ backgroundColor: '#007F6D', height: '78px' }}>
                        <p style={{ color: 'white', fontSize: '22px', marginLeft: '-900px' }}>Task</p>









                    </Item>

                </Grid>




                <Grid item xs={3} >

                    <Item style={{ height: '705px', fontSize: '24px' }}>
                        Profile

                        <img style={{ width: 85, height: 120, marginLeft: '30%', paddingBottom: '65px', marginTop: '38px', color: 'white' }} alt="Bx bxs lock alt" src="/image1/software-engineer-portrait-smiling-young-vietnamese-69422682.webp" />
                        <p style={{ fontSize: '19px', marginTop: '-25px' }}>Sumit Kumar</p>
                        <p style={{ fontSize: '16px', marginTop: '0px' }}>Address</p>
                        <p style={{ fontSize: '13px', marginTop: '-15px' }}>Sector-7 Noida</p>
                        <p style={{ fontSize: '16px', marginTop: '18px' }}>Contact No</p>
                        <p style={{ fontSize: '12px', marginTop: '-12px' }}>8789898888</p>
                        <p style={{ fontSize: '16px', marginTop: '19px' }}>Email Id</p>
                        <p style={{ fontSize: '14px', marginTop: '-12px' }}>sumit@gmail.com</p>
                    </Item>





                </Grid>

                <Grid item xs={6} >

                    <Item style={{ height: '705px', }}>
                        <div style={{ padding: '20px', }}>

                            <img style={{ width: 125, height: 95, marginLeft: '80px' }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />
                            <p style={{ fontSize: '18px', marginRight: '138px', marginTop: '-10px' }}>Rapid Pod</p>
                            <Grid container spacing={5}>
                                <Grid item xs={4}>

                                    <ul>
                                        <li > Asset id  </li>
                                        <li> Serial no  </li>
                                        <li>SLA        </li>
                                        <li> Date of Manufacturing</li>
                                        <li> Date of installation </li>
                                        <li> Next shadule maintanance</li>
                                        <li> Controller  </li>
                                        <li> Meter   </li>
                                        <li>RCD     </li>
                                        <li>MCB     </li>
                                        <li>Connector</li>
                                        <li>Display  </li>
                                        <li>LED      </li>
                                        <li style={{ marginTop: '15%' }}> Latitude </li>
                                        <li>Longitude</li>
                                    </ul>
                                </Grid>

                                <Grid item xs={4}>
                                    <ul style={{ textDecoration: 'center' }}>
                                        <li >Rapid Pod</li>
                                        <li>Rapid Pod TRI01 </li>
                                        <li>24hrs</li>
                                        <li style={{ marginTop: '10px' }}>19/8/2023</li>
                                        <li style={{ marginTop: '10px' }}>15/2/2023</li>
                                        <li style={{ marginTop: '19%' }}>05/22023</li>
                                        <li style={{ marginTop: '20px' }}>Railbit</li>
                                        <li style={{ marginTop: '-1px' }}> Schneider</li>
                                        <li style={{ marginTop: '2px' }}>Siemens</li>
                                        <li style={{ marginTop: '5%' }}>Havells</li>
                                        <li style={{ marginTop: '2%' }}>Phoneix</li>
                                        <li style={{ marginTop: '2%' }}> NP</li>
                                        <li style={{ marginTop: '-2%' }}> Railbit</li>
                                        <li style={{ marginTop: '8%' }}> 27.78777</li>
                                        <li style={{ marginTop: '3px' }}> 77.89877</li>

                                    </ul>



                                </Grid>
                            </Grid>



                        </div>

                    </Item>





                </Grid>

                <Grid item xs={3} >

                    <Item style={{ height: '705px', }}>
                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Free Service</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={tasktype}
                                label="Select Engineer"
                                onChange={handleChange3}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Empty </MenuItem>
                                <MenuItem value={20}>Empty</MenuItem>
                                <MenuItem value={30}>Empty</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Remote Task</InputLabel>
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
                                <MenuItem value={10}>Empty </MenuItem>
                                <MenuItem value={20}>Empty</MenuItem>
                                <MenuItem value={30}>Empty</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Engineer</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={engineer}
                                label="Select Engineer"
                                onChange={handleChange1}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Sumit </MenuItem>
                                <MenuItem value={20}>Mohit</MenuItem>
                                <MenuItem value={30}>Rohit</MenuItem>
                            </Select>
                        </FormControl>


                        <div>
                            <h3>Select Estimated Time</h3>
                            <DatePicker

                                id="datepicker"
                                
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                            // You can add more props and configurations as needed
                            />
                        </div>


                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Priority</InputLabel>
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
                                <MenuItem value={10}>High </MenuItem>
                                <MenuItem value={20}>Medium</MenuItem>
                                <MenuItem value={30}>Low</MenuItem>
                            </Select>
                        </FormControl>


                        <button style={{ backgroundColor: '#00764D', width: '77%', height: '6%', marginLeft: '5%', marginTop: '5%', color: 'white', borderRadius: '16px' }}>Task Assign</button>
                        <button style={{ backgroundColor: 'Red', width: '77%', height: '6%', marginLeft: '5%', marginTop: '5%', color: 'white', borderRadius: '16px' }}>Reject</button>



                    </Item>





                </Grid>












                {/* <Grid item xs={9}> */}

                {/* </Grid> */}






            </Grid>

        </div>
    );

}