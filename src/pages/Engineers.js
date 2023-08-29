
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
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
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import baseUrl from '../utils/baseUrl';

import Iconify from '../components/iconify';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));






export default function Engineers() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const [name, setName] = useState('');
    // const [contactNo, setContactNo] = useState('');
    // const [email, setEmail] = useState('');
    // const [address, setAddress] = useState('');


    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [areaPin, setAreaPin] = useState('');

    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');


    const [row, setRow] = useState('');

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate();



    const [selectedImage, setSelectedImage] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [message, setMessage] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };







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

    const handleCloseForm = () => {
        setIsFormSubmitted('false');
        handleClickClose1();
    };










    // Form submission handler
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Perform actions with form data, e.g., validation or sending data to a server
    //     // Example: console.log(name, contactNo, email, address);

    //     // Reset form fields
    //     setName('');
    //     setContactNo('');
    //     setEmail('');
    //     setAddress('');
    // };

    const routeChange = () => {
        window.location.href = "/Engineers";

    }

    // const routeChange1 = () => {
    //     window.location.href = "/dashboard/Engineersdetail ";
    // }

    const routeChange1 = (id) => {



        navigate("/dashboard/Engineersdetail/", { state: { userId: id } });


    }

    //   const searchItem = rows.filter(row => {
    //    return (search === '')|| columns.map((column)=>row[column.id]!==undefined
    //    &&row[column.id].toString().toLowerCase().includes(search.toLocaleLowerCase())).reduce((x,y)=>x||y)
    //    ||(row.category.name.toLowerCase().includes(search.toLowerCase()))
    //    ?row:null;
    //   })





    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );


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


    useEffect(() => {
        // Check if all required fields are valid
        const isValid =
            name !== '' &&
            contact !== '' &&
            email !== '' &&
            areaPin !== '' &&
            address !== '' &&
            city !== '' &&
            state !== '' &&
            emailError === '' &&
            passwordError === ''&&
            contactError !== '';

        setIsFormValid(isValid);
    }, [name, contact, email, areaPin, address, city, state, emailError, passwordError,contactError]);








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
                id: 3,
            },
        };

        // Convert form data object to JSON
        const requestBody = JSON.stringify(formData);

        console.log(formData);
        console.log(token);

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
            alert('Form submitted successfuly');
            window.location.reload();

        } else {
            setMessage(data.message);
        }


        console.log('Form data submitted:', formData);
        // Now you can close the form.
        setIsFormOpen(false);







    };






    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/hasRole/3`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })

            .then(response => response.json())
            .then(json => {
                console.log("Fetched data:", json.data); // This line will print the data to the console
                // setUsers(json);
                setData(json.data)



            })
            .finally(() => {
                setLoading(false);
            });

        // handleChange7();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


















    return (



        <div>
            <Grid container spacing={1}>









                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 6 }}>
                        <AppBar style={{ backgroundColor: '#007F6D' }} position="static">
                            <Toolbar variant="dense">


                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                >
                                    Service Engineer
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



                                &nbsp;

                                <div>

                                    <Button className='responsive-button' onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black', }} >
                                        {<Iconify icon="eva:plus-fill" />}
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
                                        {"Add Engineer"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <Container maxWidth="md"> {/* Adjusted maxWidth for responsiveness */}
                                        <form onSubmit={handleSubmit}>
                                                <Grid container spacing={3}>

                                                    <Grid item xs={12}>
                                                        <div style={{ textAlign: 'center', marginBottom: '15px', position: 'relative' }}>
                                                            <input
                                                                type="file"
                                                                id="imageUpload"
                                                                style={{ display: 'none' }}
                                                                onChange={handleImageChange} // Define your image change handler
                                                            />
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

                                                    {isFormSubmitted ? (
                                                        <>
                                                            <p>Form submitted successfully!</p>
                                                            <Button onClick={handleCloseForm} style={{ float: 'right' }}>
                                                                Close
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button type="submit" variant="contained" color="primary"  style={{ float: 'right', marginRight: '-5px' }}>
                                                                Submit
                                                            </Button>
                                                            <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red',marginRight:'4%' }}  >
                                                                Close
                                                            </Button>
                                                        </>
                                                    )}











                                                </div>
                                            </form>
                                        </Container>
                                    </DialogContent>
                                </Dialog>












                            </Toolbar>
                        </AppBar>
                    </Box>



                </Grid>


                <div className='container-fluid'>
                    <div className='row'>

                        {data.map(item => (
                            <div key={item.id} className='col-md-3 col-sm-6'>

                                <Item>
                                    <Card style={{ backgroundColor: '#007F6D' }}>
                                        <CardContent>
                                            <Typography style={{ marginTop: '-5%', color: 'white' }}>
                                                Junior Engineer
                                            </Typography>

                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                                <img style={{ width: '50%', height: 'auto', color: '#131313' }} alt="Profile" src="/assets/images/avatars/avatar_5.jpg" />
                                            </div>
                                            <Typography style={{ fontSize: '130%', color: 'white' }}>
                                                {item.name}
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '100%' }}>
                                                In Progress {item.activeTasks === null || item.activeTasks === undefined ? 0 : item.activeTasks}
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '100%' }}>
                                                Completed {item.closedTasks === null || item.closedTasks === undefined ? 0 : item.closedTasks}
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '100%' }}>
                                                Service Engineer
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                            <Button onClick={() => routeChange1(item.id)} style={{ color: '#131313', backgroundColor: 'white' }}>
                                                View Profile
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Item>
                            </div>
                        ))}

                    </div>
                </div>






































            </Grid>

        </div>
    );

}