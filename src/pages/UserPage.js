

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import baseUrl from '../utils/baseUrl';


import Iconify from '../components/iconify';



const columns = [
  { id: 'srno', label: 'Sr.No', minWidth: 55, align: 'center' },
  { id: 'name', label: 'Customer Name', minWidth: 85, align: 'center' },
  { id: 'city', label: 'City', minWidth: 140, align: 'center' },
  { id: 'areaPin', label: 'Area Pin', minWidth: 100, align: 'center' },
  {
    id: 'contact',
    label: 'Contact No',
    minWidth: 140,
    align: 'center',
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




export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactno, setContactno] = useState('');
  const [search, setSearch] = useState('');

  const [message, setMessage] = useState('');

  const [areaPin, setAreaPin] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [password, setPassword] = useState('');
  // const [confirmpassword, setConfirmpassword] = useState('');

  const [formData, setFormData] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }



  };



  const handleCloseForm = () => {
    setIsFormSubmitted('false');
    handleClickClose1();
  };


  const searchItem = rows.filter(row => {
    return (search === '') || columns.map((column) => row[column.id] !== undefined
      && row[column.id].toString().toLowerCase().includes(search.toLocaleLowerCase())).reduce((x, y) => x || y)
      ? row : null;
  });






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


  useEffect(() => {
    // Check if all required fields are valid
    const isValid =
      name !== '' &&
      contact.length === 10 &&
      email !== '' &&
      areaPin !== '' &&
      address !== '' &&
      city !== '' &&
      state !== '' &&
      emailError === '' &&
      passwordError === '' &&
      contactError !== '';

    setIsFormValid(isValid);
  }, [name, contact, email, areaPin, address, city, state, emailError, passwordError, contactError]);








  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validateContact = (contact) => {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // You can adjust the minimum length as needed
  };







  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail === '' || validateEmail(newEmail)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword === '' || validatePassword(newPassword)) {
      setPasswordError('');
    } else {
      setPasswordError('Password must be at least 6 characters long');
    }
  };




  const handleContactChange = (e) => {
    const newContact = e.target.value;

    if (/^\d{0,10}$/.test(newContact)) {
      setContact(newContact);
      setContactError(newContact.length === 10 ? '' : 'Contact number must be exactly 10 digits');
    } else {
      setContactError('Contact number must be up to 10 digits');
    }
  };









  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const adminId1 = localStorage.getItem('adminId');


    const formData = {
      name,
      adminId: adminId1,
      contact,
      password,
      areaPin,
      city,
      state,
      email,
      address,
      role: {
        id: 2,
      },
    };

    // Convert form data object to JSON
    const requestBody = JSON.stringify(formData);

    console.log(formData);
    console.log(token);
    try {
      setBtnLoading(true);
      const response = await fetch(`${baseUrl}/api/user/`, {
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
        setUserOpen(false);
        toast.success('Form submitted successfully');
        window.location.reload();
      } else {
        toast.error('sorry! already exist user id & email id');
        setMessage(data.message);

      }

    } catch (error) {
      console.error('An error occurred:', error);

      window.alert('An error occurred while submitting the form.');
      // Handle the error here, such as displaying an alert or setting an error state
      setMessage('An error occurred while submitting the form.');
    } finally {
      setBtnLoading(false);
    }

    console.log('Form data submitted:', formData);
    // Now you can close the form.
    setIsFormOpen(false);







  };



  // const routeChange = () => {
  //   window.location.href = "/dashboard/customerdetail";
  // }


  const routeChange4 = (id) => {



    navigate("/dashboard/customerdetail/", { state: { userId: id } });


  };











  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch(`${baseUrl}/api/user/hasRole/2`, {
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>





              {/* <Grid >
                            <Search> */}&nbsp;
              <div>
                <Button className='responsive-button' onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black', }} >
                  <Iconify icon="eva:plus-fill" />
                </Button>
              </div>


              <Dialog
                open={openUser}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ height: 'auto', maxWidth: '100%' }} // Adjusted height and maxWidth for responsiveness
              >
                <DialogTitle id="alert-dialog-title">
                  {"Add Customer"}
                </DialogTitle>
                <DialogContent>
                  <Container maxWidth="md"> {/* Adjusted maxWidth for responsiveness */}
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>

                        <Grid item xs={12}>
                          <div style={{ textAlign: 'center', marginBottom: '15px', position: 'relative' }}>
                            {/* <input
                              type="file"
                              id="imageUpload"
                              style={{ display: 'none' }}
                              accept="image/*" // Restrict to image files,
                              onChange={handleImageChange} // Define your image change handler
                            /> */}
                            <InputLabel htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'block' }}>
                              <Button
                                component="span"
                                style={{
                                  width: 75,
                                  height: 100,
                                  cursor: 'pointer',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundImage: selectedImage ? `url(${selectedImage})` : `url("/image1/images.jpg")`, // Use selected image or default image

                                }}
                              >
                                {/* Content of the button */}
                              </Button>
                              <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>Add Image</p>
                            </InputLabel>

                          </div>
                        </Grid>


                        {/* Left side fields */}
                        {/* Your Name, Contact No, Email, and Area pin fields */}

                        <Grid item xs={12} md={6}> {/* Adjusted the Grid layout for responsiveness */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-8px' }}>
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
                              value={contact}
                              onChange={handleContactChange}
                              fullWidth
                              required
                              type="tel"
                              // style={{ padding: '7px', width: '250px' }}
                              sx={{ m: 1, width: '250px' }}
                              error={contactError !== ''}
                              helperText={contactError}

                            />


                            <TextField
                              label="Email"
                              value={email}
                              onChange={handleEmailChange}
                              name="email"
                              fullWidth
                              required
                              type="email"
                              sx={{ m: 1, width: '250px' }}
                              error={emailError !== ''}
                              helperText={emailError}
                            />


                            <TextField
                              label="Area pin"
                              value={areaPin}
                              onChange={(e) => setAreaPin(e.target.value)}
                              fullWidth
                              required
                              // style={{ padding: '7px', width: '250px' }}
                              sx={{ m: 1, width: '250px' }}

                            />


                          </div>


                        </Grid>
                        <Grid item xs={12} md={6}> {/* Adjusted the Grid layout for responsiveness */}
                          {/* Right side fields */}
                          {/* Your Address, City, Password, and Confirm Password fields */}

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-8px' }}>

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
                              label="State"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              fullWidth
                              multilin
                              rows={4}
                              required
                              // style={{ padding: '7px', width: '250px', height: '120px' }}
                              sx={{ m: 1, width: '250px' }}
                            />


                            <TextField
                              label="Password"
                              value={password}
                              onChange={handlePasswordChange}
                              name="password"
                              fullWidth
                              required
                              type="password"
                              sx={{ m: 1, width: '250px' }}
                              error={passwordError !== ''}
                              helperText={passwordError}
                            />
                            {/* <TextField
                              label="Confirm Password"
                              value={confirmpassword}
                              onChange={(e) => setConfirmpassword(e.target.value)}
                              fullWidth
                              required
                              type="password"
                              // style={{ padding: '7px', width: '250px' }}
                              sx={{ m: 1, width: '250px' }}
                            /> */}


                          </div>



                        </Grid>
                      </Grid>
                      <div style={{ marginTop: '20px' }}>
                        {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                          Submit
                        </Button>
                        <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red' }}>
                          Close
                        </Button> */}

                        <div>
                          {/* Conditionally render the button or loading circle */}
                          {btnLoading ? (
                            <CircularProgress size={24} /> // Adjust the size as needed
                          ) : (
                            <>
                              <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                                Submit
                              </Button>
                              <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }}>
                                Close
                              </Button>
                            </>
                          )}
                        </div>

                        {/* <>
                          <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                            Submit
                          </Button>
                          <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }}>
                            Close
                          </Button>
                        </> */}

                      </div>
                    </form>
                  </Container>
                </DialogContent>
              </Dialog>

              {/* // </Search>

// </Grid> */}









            </Toolbar>
          </AppBar>
        </Box>






        {/* <Grid item className="grid-el" xs={12} md={12}>





        </Grid> */}




        <Grid item xs={12} style={{ marginTop: '2%' }}>
          <Item>
            <Card >


              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                      {searchItem
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
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