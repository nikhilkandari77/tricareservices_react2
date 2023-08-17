/* eslint-disable react/jsx-key */


import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';



import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

import Iconify from '../components/iconify';



const columns = [
  { id: 'id', label: 'Sr.No', minWidth: 55 },
  { id: 'name', label: 'Customer Name', minWidth: 85 },
  { id: 'city', label: 'City', minWidth: 140 },
  { id: 'areaPin', label: 'Area Pin', minWidth: 100 },
  {
    id: 'contact',
    label: 'Contact No',
    minWidth: 140,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Email Id',
    minWidth: 140,
    align: 'center',

    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'button',
    label: 'Action',
    minWidth: 140,
    align: 'center',
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








export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactno, setContactno] = useState('');


  const [message, setMessage] = useState('');

  const [areapin, setAreapin] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();












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



  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');


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

    const response = await fetch('https://tricareservice.onrender.com/api/user/', {
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






  // const routeChange = () => {
  //   window.location.href = "/dashboard/customerdetail";
  // }


  const routeChange4 = (id) => {



    navigate("/dashboard/customerdetail/", { state: { userId: id } });


  };










  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch("https://tricareservice.onrender.com/api/user/hasRole/2", {
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


let sr = 0;







  return (



    <div>
      <Grid container spacing={0} >
        <Box sx={{ flexGrow: 6 }}>
          <AppBar style={{ backgroundColor: '#007F6D' }} position="static">
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Customer
              </Typography>


              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>


              <Grid >
                <Search>
                  <search>

                    <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black', }} >
                      New Customer
                    </Button>
                  </search>

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
                                  sx={{ m: 1, width: '250px' }}
                                  onChange={(e) => setName(e.target.value)}
                                  fullWidth
                                  required
                                // style={{ padding: '7px', width: '250px' }}
                                />



                                <TextField
                                  label="Contact No"
                                  value={contactNo}
                                  onChange={(e) => setContactNo(e.target.value)}
                                  fullWidth
                                  required
                                  // style={{ padding: '7px', width: '250px' }}
                                  sx={{ m: 1, width: '250px' }}

                                />
                                <TextField
                                  label="Area pin"
                                  value={areapin}
                                  onChange={(e) => setAreapin(e.target.value)}
                                  fullWidth
                                  required
                                  // style={{ padding: '7px', width: '250px' }}
                                  sx={{ m: 1, width: '250px' }}

                                />
                                <TextField
                                  label="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  fullWidth
                                  required
                                  // style={{ padding: '7px', width: '250px' }}
                                  sx={{ m: 1, width: '250px' }}

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
                                  // style={{ padding: '7px', width: '250px' }}
                                  sx={{ m: 1, width: '250px' }}
                                />

                                <TextField
                                  label="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  fullWidth
                                  multilin
                                  rows={4}
                                  required
                                  // style={{ padding: '7px', width: '250px', height: '120px' }}
                                  sx={{ m: 1, width: '250px' }}
                                />

                                <TextField
                                  label="City"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  fullWidth
                                  multilin
                                  rows={4}
                                  required
                                  // style={{ padding: '7px', width: '250px', height: '120px' }}
                                  sx={{ m: 1, width: '250px' }}
                                />
                                <TextField
                                  label="Confirm Password"
                                  value={password}
                                  onChange={(e) => setState(e.target.value)}
                                  fullWidth
                                  required
                                  type="password"
                                  // style={{ padding: '7px', width: '250px' }}
                                  sx={{ m: 1, width: '250px' }}
                                />
                              </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '30px', paddingTop: '-3px', marginLeft: '438px' }}>
                              Submit
                            </Button>
                            <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '339PX', marginTop: '-60px' }} >Close</Button>
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
                </Search>

              </Grid>









            </Toolbar>
          </AppBar>
        </Box>






        <Grid item className="grid-el" xs={12} md={12}>




          {/* <Item style={{ backgroundColor: '#007F6D', height: '72%', marginTop: '-2%' }}> */}
          {/* <Grid item xs={3}>

              <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '90%', fontSize: '140%', marginTop: '9%' }}>
                Customers
              </Typography>
            </Grid> */}

          {/* <Grid item xs={3}>

              <TextField
                id="search"
                type="search"
                label="Search"
                size="small"

                sx={{ width: '80%', marginLeft: '180%', marginTop: '-17%', paddingBottom: '2%', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'white' }}

              />
            </Grid> */}

          {/* <Grid item xs={3}>
              <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black', marginTop: '-44%', marginLeft: '270%' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button>

            </Grid> */}



          {/* </Item> */}
        </Grid>




        <Grid item xs={12} style={{ marginTop: '2%' }}>
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
                        .map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];


                                if (column.id === 'id') {
                                  sr += 1;
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {value === null ? '' : String(sr)}
                                    </TableCell>
                                  );
                                }


                                if (column.id === 'button') {
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      <Button onClick={() => routeChange4(row.id)} variant="contained"> Details </Button>
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