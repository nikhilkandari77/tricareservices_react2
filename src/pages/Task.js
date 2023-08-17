/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS file for styling



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate, useNavigate } from 'react-router-dom';
import { Pending } from '@mui/icons-material';

import Iconify from '../components/iconify';

import baseUrl from '../utils/baseUrl';
import Label from '../components/label/Label';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


// const createRows = () => {
//   for(let i =0;i<users.length;++1){
//     let rows = [
//       createData(users[i].id,users[i].name,users[i].city,users[i].contact,users[i].email,"100")
//     ]
//   }
//   return rows
// }



export default function Task() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name, setName] = useState('');
    const [contactno, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [message, setMessage] = useState('');

    const [areapin, setAreapin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(true);

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const [tasktype, setTasktype] = React.useState('');
    const [status, setStatus] = useState('');

    const [date, setDate] = useState('');






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
    };
    const handleClickClose1 = () => {
        setUserOpen(false);
    };
    const handleClickOpen1 = () => {
        setUserOpen(false);
    };



    const handleChange3 = (event) => {

        setStatus(event.target.value);


    };


    const [datas, setData] = useState([]);

    const columns = [
        { id: "sr", label: 'S.No', minWidth: 10 },
        { id: 'id', label: 'ComplaintId',align: 'center', minWidth: 30 },
        {
            id: 'productCustomer',
            subId: 'productName',
            label: 'Product',
            minWidth: 70,
            align: 'center',
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'problem',
            label: 'Complaint',
            minWidth: 170,
            align: 'center',
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'customerName',
            label: 'Customer',
            minWidth: 70,
            align: 'center',
            // format: (value) => value.toFixed(2),
        },
        { id: 'createdDateTime', label: 'Complaint Time', align: 'center', minWidth: 120 },
        { id: 'engineerName', label: 'Engineer', align: 'center', minWidth: 70 },
        { id: 'estimatedDate', label: 'Estimated End Time', align: 'center', minWidth: 120 },
        { id: 'complaintStatus', label: 'Status', align: 'center', minWidth: 70 },
        { id: 'priority', label: 'Priority', align: 'center', minWidth: 70 },
        { id: 'action', label: 'Action', align: 'center', minWidth: 70 },
    ];

    // const columns = [
    //     { id: 'id', label: 'Complaint Id', minWidth: 100 },
    //     { id: 'customerName', label: 'Customer Name', minWidth: 200 },
    //     { id: 'problem', label: 'Problem', minWidth: 190 },
    //     { id: 'engineerName', label: 'Engineer Assigned', minWidth: 200 },
    //     { id: 'complaintStatus', label: 'status', minWidth: 180 },
    //     { id: 'createdDateTime', label: 'created time', minWidth: 190 },
    //     {
    //         id: 'city',
    //         label: 'City',
    //         minWidth: 190,
    //         align: 'left',
    //         // format: (value) => value.toLocaleString('en-US'),
    //     },
    //     {
    //         id: 'area',
    //         label: 'Area',
    //         minWidth: 130,
    //         align: 'left',

    //         // format: (value) => value.toLocaleString('en-US'),
    //     },
    //     {
    //         id: 'priority',
    //         label: 'Priority',
    //         minWidth: 130,
    //         align: 'left',

    //         // format: (value) => value.toLocaleString('en-US'),
    //     },
    //     {
    //         id: 'complaintStatus',
    //         label: 'Status',
    //         minWidth: 100,
    //         align: 'left',

    //         // format: (value) => value.toLocaleString('en-US'),
    //     },
    //     {
    //         id: 'button',
    //         label: 'Action',
    //         minWidth: 100,
    //         align: 'center',




    //         // format: (value) => value.toFixed(2),
    //     },
    // ];

    const token = localStorage.getItem('token');

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();



        const formData = {
            name,
            adminId: 1,
            contact: contactno,
            password,
            areaPin: areapin,
            city,
            state,
            email,
            address,
            role: {
                id: 3,
            },
        };

        // Convert form data object to JSON
        const requestBody = JSON.stringify(formData);

        console.log(formData);
        console.log(token);

        const response = await fetch('https://6ff9-2405-201-4003-794e-3549-9421-abad-6afe.ngrok-free.app/api/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: requestBody,
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {

            // Save the token to local storage or state for future API requests
            // localStorage.setItem('token', data.token);
            // setMessage('Login successful');
        } else {
            setMessage(data.message);
        }


        console.log('Form data submitted:', formData);
        // Now you can close the form.
        setIsFormOpen(false);







    };











    const routeChange = () => {
        window.location.href = "/Pages/Task";
    };
    const routeChange1 = (id) => {
        navigate("/Dashboard/Taskdetail", { state: { taskId: id } });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/api/user/complaint/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })

            .then(response => response.json())
            .then(json => {
                console.log("Fetched data:", json.data); // This line will print the data to the console
                setRows(json.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
        marginLeft: 0,
        width: '100%',
        color: 'gray',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        color: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    function formatDate(dateString) {
        const options = {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        };
      
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
      }
      
      function formatDateTime(dateString) {
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
        <div >
            <Grid >
                <Box sx={{ flexGrow: 6 }}>
                    <AppBar style={{ backgroundColor: '#449355' }} position="static">
                        <Toolbar variant="dense">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Tasks
                            </Typography>


                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 170, backgroundColor: 'white', borderRadius: '5px', height: '75%', width: '4%' }} size="small">
                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Status</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={status}
                                        label="Status"
                                        onChange={handleChange3}
                                    >

                                        <MenuItem value={10}>Completed </MenuItem>
                                        <MenuItem value={20}>Pending</MenuItem>
                                        <MenuItem value={30}>Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 170, backgroundColor: 'white', borderRadius: '5px', height: '75%', width: '4%' }} size="small">
                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Date</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={date}
                                        label="Date"
                                        onChange={handleChange3}
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Today </MenuItem>
                                        <MenuItem value={20}>Last 2 day</MenuItem>
                                        <MenuItem value={30}>Last 7 day</MenuItem>
                                        <MenuItem value={30}>Last 30 day</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>


                        </Toolbar>
                    </AppBar>
                </Box>












                <Grid item xs={12} >
                    <Item>
                        <Card >


                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                                <TableContainer sx={{ maxHeight: 500 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell

                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                rows
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                                            {columns.map((column) => {

                                                                const value = column.id === "productCustomer" ? row[column.id][column.subId] : row[column.id];

                                                                if (column.id === 'sr') {
                                                                    sr += 1;
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {value === null ? '' : String(sr)}
                                                                        </TableCell>
                                                                    );
                                                                }

                                                                if (column.id === 'compaintStatus') {
                                                                    // console.log(value);
                                                                    let labelColor;

                                                                    if (value === 'Pending Assign') {
                                                                        labelColor = 'error';
                                                                    } else if (value === 'Engineer Assigned') {
                                                                        labelColor = 'warning';
                                                                    } else if (value === 'Completed') {
                                                                        labelColor = 'success';
                                                                    } else {
                                                                        labelColor = 'default';
                                                                    }

                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            <Label color={labelColor}>{value === null ? '' : String(value)}</Label>
                                                                        </TableCell>
                                                                    );
                                                                }

                                                                if (column.id === 'priority') {
                                                                    // console.log(value);
                                                                    let labelColor;

                                                                    if (value === 'High') {
                                                                        labelColor = 'error';
                                                                    } else if (value === 'Normal') {
                                                                        labelColor = 'warning';
                                                                    } else if (value === 'Low') {
                                                                        labelColor = 'success';
                                                                    } else {
                                                                        labelColor = 'default';
                                                                    }

                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            <Label color={labelColor}>{value === null ? '' : String(value)}</Label>
                                                                        </TableCell>
                                                                    );
                                                                }
                                                                if (column.id === 'action') {
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            <Button onClick={() => routeChange1(row.id)} variant="contained">Details</Button>
                                                                        </TableCell>
                                                                    );
                                                                }

                                                                if (column.id === 'engineerName') {

                                                                    // console.log(`Desired Value ${  value}`);
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {value !== null ? value : 'Pending Assign'}
                                                                        </TableCell>
                                                                    );

                                                                }

                                                                if (column.id === 'estimatedDate') {

                                                                    console.log(`Desired Value ${value}`);
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {value !== null ? formatDate(value) : 'Pending Assign'}
                                                                        </TableCell>
                                                                    );

                                                                }

                                                                if (column.id === 'createdDateTime') {

                                                                    console.log(`Desired Value ${value}`);
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {value !== null ? formatDateTime(value) : ''}
                                                                        </TableCell>
                                                                    );

                                                                }


                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {value === null ? '' : String(value)}
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

                        </Card>


                    </Item>
                </Grid>












            </Grid>

        </div>

    );

}