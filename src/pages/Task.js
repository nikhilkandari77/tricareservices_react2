import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


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
    const navigate=useNavigate();
    const [rows,setRows]=useState([])
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

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const [tasktype, setTasktype] = React.useState('');
    const [status, setStatus] = useState('');

   const[date, setDate] = useState('');






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



    const handleChange3 = (event) => {

        setStatus(event.target.value);


    };


    const [datas,setData]=useState([])

    const columns = [
        { id: 'id', label: 'Complaint Id', minWidth: 20 },
        { id: 'customerName', label: 'Customer Name', minWidth: 200 },
        { id: 'problem', label: 'Problem', minWidth: 190 },
        { id: 'engineerName', label: 'Engineer Assigned', minWidth: 200 },
        { id: 'complaintStatus', label: 'status', minWidth: 180 },
        { id: 'createdDateTime', label: 'created time', minWidth: 190 },
        {
            id: 'city',
            label: 'City',
            minWidth: 190,
            align: 'left',
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'area',
            label: 'Area',
            minWidth: 130,
            align: 'left',
    
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'priority',
            label: 'Priority',
            minWidth: 130,
            align: 'left',
    
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'complaintStatus',
            label: 'Status',
            minWidth: 100,
            align: 'left',
    
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'button',
            label: 'Action',
            minWidth: 100,
            align: 'center',
    
    
    
    
            // format: (value) => value.toFixed(2),
        },
    ];

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

    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };

    // if (!isFormOpen) {
    //   return <div>Form closed. You can use the form data elsewhere.</div>;
    // }

   









    const routeChange = () => {
        window.location.href = "/Pages/Task";
    }
    const routeChange1 = (id) => {
        navigate("/Dashboard/Taskdetail",{state:{taskId:id}});
    }


    // useEffect(() => {
    //   setLoading(true)
    //   fetch("https://6ff9-2405-201-4003-794e-3549-9421-abad-6afe.ngrok-free.app/api/user/")
    //     .then(response => response.json())
    //     .then(json => setUsers(json))
    //     .finally(() => {
    //       setLoading(false)
    //     })
    // }, [])

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











    return (



        <div>
        <Grid container spacing={0}>
            {/* <Grid item xs={12}>
      <Item>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customer
          </Typography>
        </Stack>


      </Item>
    </Grid> */}
            <Grid item xs={12} >




                <Item style={{ backgroundColor: '#007F6D', height: '60%', marginTop: '-2%' }}>
                <Grid item xs={3}>
                    <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '70%', fontSize: '18px', marginTop: '9px' }}>
                        Tasks
                    </Typography>
                    </Grid>

                    <Grid item xs={3}>
                    <TextField
                        id="search"
                        type="search"
                        label="Search"
                        size="small"

                        sx={{ width: '80%', marginLeft: '118%', marginTop: '-14%', paddingBottom: '2%', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'white' }}

                    />
                    </Grid>

                    <Grid item xs={3}>
                    
                    <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black', marginTop: '-35%', marginLeft: '210%' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button>
                    </Grid>
                   <div>
                   <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 170, backgroundColor: 'white', marginTop: '-28%', marginRight: '-475%', borderRadius: '5px', height: '75%', width: '4%' }} size="small">
                        <InputLabel id="demo-select-small-label" style={{color:'black'}}>Status</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={status}
                            label="Status"
                            onChange={handleChange3}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Completed </MenuItem>
                            <MenuItem value={20}>Pending</MenuItem>
                            <MenuItem value={30}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    </div>




                    <div>
                    <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 170, backgroundColor: 'white', marginTop: '-34%', marginLeft:'328%', borderRadius: '5px', height: '75%', width: '1%' }} size="small">
                        <InputLabel id="demo-select-small-label" style={{color:'black'}}>Date</InputLabel>
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
                    </div>

                  






                    {/* 
        <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ width: '19%', height: '71%', marginLeft: '77%', backgroundColor: 'white', color: 'black', marginTop: '-12%', marginRight: '-2%', }} startIcon={<Iconify icon="eva:plus-fill" />}>
          New Customer
        </Button> */}

                    <Dialog
                        open={openUser}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        style={{ height: '550px' }}
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Add Customer"}
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                <img style={{ width: 75, height: 110, marginLeft: '230px', paddingBottom: '65px', marginTop: '-6px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                            </div>
                            <div>
                                <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px', marginTop: '-48px' }}>Add Image</p>
                            </div>
                            <DialogContentText>

                                <Container maxWidth="sm">
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={6}>

                                                <TextField
                                                    label="Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}

                                                    fullWidth
                                                    required
                                                    style={{ padding: '7px', width: '250px' }}
                                                />
                                                <TextField
                                                    label="Contact No"
                                                    value={contactno}
                                                    onChange={(e) => setContactNo(e.target.value)}
                                                    fullWidth
                                                    required
                                                    style={{ padding: '7px', width: '250px' }}

                                                />
                                                <TextField
                                                    label="Area Pin"
                                                    value={areapin}
                                                    onChange={(e) => setAreapin(e.target.value)}
                                                    fullWidth
                                                    required
                                                    style={{ padding: '7px', width: '250px' }}

                                                />
                                                    {/* <TextField
                            label="Role"
                            value={address}
                            onChange={(e) => setRole(e.target.value)}
                            fullWidth
                            multilin
                            rows={2}
                            required
                            style={{ padding: '7px', width: '250px', }}
                          /> */}

                                                    {/* <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Role</InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={role}
                              label="Role"
                              onChange={handleChange1}
                              style={{width:'238px',height:'55px'}}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Admin </MenuItem>
                              <MenuItem value={20}>Customer</MenuItem>
                              <MenuItem value={30}>Engineer</MenuItem>
                            </Select>
                          </FormControl> */}

                                                    <TextField
                                                        label="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        fullWidth
                                                        required
                                                        style={{ padding: '7px', width: '250px' }}

                                                    />


                                                </Grid>

                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        fullWidth
                                                        required
                                                        type="email"
                                                        style={{ padding: '7px', width: '250px' }}
                                                    />
                                                    <TextField
                                                        label="State"
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                        fullWidth
                                                        required

                                                        style={{ padding: '7px', width: '250px' }}
                                                    />
                                                    <TextField
                                                        label="Address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        fullWidth
                                                        multilin
                                                        rows={4}
                                                        required
                                                        style={{ padding: '7px', width: '250px', height: '0px' }}
                                                    />

                                                    <TextField
                                                        label="City"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        fullWidth
                                                        required
                                                        style={{ padding: '7px', width: '250px', marginTop: '20%' }}

                                                    />

                                                </Grid>
                                            </Grid>
                                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '18px', paddingTop: '-3px', marginLeft: '423px' }}>
                                                Submit
                                            </Button>
                                            <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '327PX', marginTop: '-63px' }} >Close</Button>
                                        </form>
                                    </Container>




                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {/* <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', paddingBottom: '0px', marginBottom: '0px' }} >Close</Button>
                <Button type="submit" onClick={handleSubmit} autoFocus style={{ paddingRight: '33px', paddingTop: '11px' }}>
                  Submit
                </Button> */}
                            </DialogActions>
                        </Dialog>



                    </Item>
                </Grid>





                <Grid item xs={12} style={{ marginTop: '-2%' }}>
                    <Item>
                        <Card >


                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
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
                                                .map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];


                                                                if (column.id === 'button') {
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            <Button onClick={() => routeChange1(row.id)} variant="contained"> Show Details </Button>
                                                                            <Dialog
                                                                                open={open}
                                                                                onClose={handleClose}
                                                                                aria-labelledby="alert-dialog-title"
                                                                                aria-describedby="alert-dialog-description"

                                                                            >
                                                                                <DialogTitle id="alert-dialog-title">
                                                                                    {"View Details"}
                                                                                </DialogTitle>
                                                                                <DialogContent>
                                                                                    <DialogContentText>

                                                                                        <div>
                                                                                            <Container>
                                                                                                <Grid container spacing={2}>
                                                                                                    <Grid item xs={10}>
                                                                                                        <Item>xs=8</Item>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={10}>
                                                                                                        <Item>xs=4</Item>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={4}>
                                                                                                        <Item>xs=4</Item>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={8}>
                                                                                                        <Item>xs=8</Item>
                                                                                                    </Grid>
                                                                                                </Grid>

                                                                                            </Container>
                                                                                        </div>




                                                                                    </DialogContentText>
                                                                                </DialogContent>
                                                                                <DialogActions>
                                                                                    <Button onClick={handleClose} style={{ color: 'red' }} >Close</Button>
                                                                                    <Button onClick={handleClose} autoFocus>
                                                                                        Accept
                                                                                    </Button>
                                                                                </DialogActions>
                                                                            </Dialog>
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

                                                    );
                                                })}
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