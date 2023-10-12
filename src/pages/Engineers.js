
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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import { toast } from 'react-toastify';
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
    const [designation, setDesignation] = useState('');

    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');


    const [row, setRow] = useState('');

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate();

    const [btnLoading, setBtnLoading] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [message, setMessage] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
        resetpassword();
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



        navigate("/admin/engineers/details/", { state: { userId: id } });


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

    const handleconfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmpassword(newConfirmPassword);
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

        if (password !== confirmpassword) {
            // Set an error message and return
            toast.error('Passwords do not match');
            return;
        }

        if (password === '' || password.length < 6) {
            // Set an error message for password validation
            toast.error('Password must be at least 6 characters long');
            return;
        }

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
            designation,
            address,
            role: {
                id: 3,
            },
        };

        try {
            setBtnLoading(true);
            // Convert form data object to JSON

            const requestBody = JSON.stringify(formData);

            console.log(formData);
            console.log(token);

            const response = await fetch(`${baseUrl}/api/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
                setMessage(data.message);
                console.log(data)
                toast.error(data.message); // Display the error message in an alert
            }
            setBtnLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);
            // Display a generic error alert
            alert('An error occurred while submitting the form.');
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


    const handleChangestate = (event) => {
        setState(event.target.value);
    };

    const resetpassword = (e) => {


        setPassword('');
        setName('');
        setContact('');
        setEmail('');
        setAddress('');
        setAreaPin('');
        setCity('');
        setState('');
        setConfirmpassword('');
        setDesignation();

    }











    return (



        <div>
            <Grid container spacing={1}>


                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 6 }}>
                        <AppBar style={{ backgroundColor: '#007F6D', borderRadius: '5px' }} position="static">
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
                                                            {/* <input
                                                                type="file"
                                                                id="imageUpload"
                                                                style={{ display: 'none' }}
                                                                onChange={handleImageChange} // Define your image change handler
                                                            /> */}
                                                            <InputLabel htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'block' }}>
                                                                <Button
                                                                    component="span"
                                                                    style={{
                                                                        width: 92,
                                                                        height: 85,
                                                                        cursor: 'pointer',
                                                                        backgroundSize: 'cover',
                                                                        backgroundPosition: 'center',
                                                                        backgroundImage: selectedImage
                                                                            ? `url(${selectedImage})`
                                                                            : `url("/image1/Vector.png")`, // Use selected image or default image
                                                                        borderRadius: '50%'
                                                                    }}
                                                                >
                                                                    {/* Content of the button */}
                                                                </Button>
                                                                {/* <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>Add Image</p> */}
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
                                                                inputProps={{ maxLength: 20 }}
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
                                                                inputProps={{ maxLength: 10 }}
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
                                                                inputProps={{ maxLength: 50 }}
                                                            />


                                                            <TextField
                                                                label="Area pin"
                                                                value={areaPin}
                                                                onChange={(e) => setAreaPin(e.target.value)}
                                                                fullWidth
                                                                required
                                                                // style={{ padding: '7px', width: '250px' }}
                                                                sx={{ m: 1, width: '250px' }}
                                                                inputProps={{ maxLength: 6 }}

                                                            />

                                                            <TextField
                                                                label="New Password"
                                                                type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                                                                value={password}
                                                                onChange={handlePasswordChange}
                                                                fullWidth
                                                                required
                                                                sx={{ m: 1, width: '250px' }}
                                                                error={passwordError !== ''}
                                                                helperText={passwordError}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />


                                                        </div>














                                                    </Grid>
                                                    <Grid item xs={12} md={6}> {/* Adjusted the Grid layout for responsiveness */}


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
                                                                inputProps={{ maxLength: 50 }}
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
                                                                inputProps={{ maxLength: 50 }}
                                                            />
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <FormControl sx={{ m: 2, width: '250px' }} size="small" fullWidth>
                                                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>
                                                                        State
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="demo-select-small-label"
                                                                        id="demo-select-small"
                                                                        value={state}
                                                                        label="State"
                                                                        required
                                                                        onChange={handleChangestate}
                                                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                                                    >
                                                                        <MenuItem value="AndhraPradesh">Andhra Pradesh</MenuItem>
                                                                        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                                                        <MenuItem value="Assam">Assam</MenuItem>
                                                                        <MenuItem value=" Bihar"> Bihar</MenuItem>
                                                                        <MenuItem value="AndhraPradesh">Chhattisgarh</MenuItem>
                                                                        <MenuItem value="Goa"> Goa</MenuItem>
                                                                        <MenuItem value="Gujarat"> Gujarat</MenuItem>
                                                                        <MenuItem value="Haryana"> Haryana</MenuItem>
                                                                        <MenuItem value="Himachal Pradesh"> Himachal Pradesh</MenuItem>
                                                                        <MenuItem value="Jharkhand"> Jharkhand</MenuItem>
                                                                        <MenuItem value="Karnataka"> Karnataka</MenuItem>
                                                                        <MenuItem value="Kerala"> Kerala</MenuItem>
                                                                        <MenuItem value="Madhya Pradesh"> Madhya Pradesh</MenuItem>
                                                                        <MenuItem value="Maharashtra"> Maharashtra</MenuItem>
                                                                        <MenuItem value="Manipur"> Manipur</MenuItem>
                                                                        <MenuItem value="Meghalaya"> Meghalaya</MenuItem>
                                                                        <MenuItem value="Mizoram"> Mizoram</MenuItem>
                                                                        <MenuItem value="Nagaland"> Nagaland</MenuItem>
                                                                        <MenuItem value="Odish"> Odisha</MenuItem>
                                                                        <MenuItem value="Punjab"> Punjab</MenuItem>
                                                                        <MenuItem value="Rajasthan"> Rajasthan</MenuItem>
                                                                        <MenuItem value="Sikkim"> Sikkim</MenuItem>
                                                                        <MenuItem value="TamilNadu"> Tamil Nadu</MenuItem>
                                                                        <MenuItem value="Telangana">Telangana</MenuItem>

                                                                        <MenuItem value="Tripura"> Tripura</MenuItem>
                                                                        <MenuItem value="Uttar Pradesh"> Uttar Pradesh</MenuItem>
                                                                        <MenuItem value="Uttarakhand"> Uttarakhand</MenuItem>
                                                                        <MenuItem value=" West Bengal"> West Bengal</MenuItem>
                                                                        <MenuItem value=" JammuandKashmir(Union Territory)"> Jammu and Kashmir (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Chandigarh(Union Territory)"> Chandigarh (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Andaman and Nicobar Islands(Union Territory)"> Andaman and Nicobar Islands (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Delhi(Union Territory)"> Delhi (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Lakshadweep(Union Territory)"> Lakshadweep (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Puducherry(Union Territory)"> Puducherry (Union Territory)</MenuItem>
                                                                        <MenuItem value=" Dadra and Nagar Haveli and Daman and Diu(Union Territory)"> Dadra and Nagar Haveli and Daman and Diu (Union Territory)</MenuItem>
                                                                        <MenuItem value="Ladakh(Union Territory)"> Ladakh (Union Territory)</MenuItem>

                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                            <TextField
                                                                label="Skill"
                                                                value={designation}
                                                                onChange={(e) => setDesignation(e.target.value)}
                                                                fullWidth
                                                                required
                                                                // style={{ padding: '7px', width: '250px' }}
                                                                sx={{ m: 1, width: '250px' }}
                                                                inputProps={{ maxLength: 20 }}

                                                            />


                                                            <TextField
                                                                label="Confirm Password"
                                                                value={confirmpassword}
                                                                onChange={handleconfirmPasswordChange}
                                                                name="password"
                                                                fullWidth
                                                                required
                                                                type="password"
                                                                sx={{ m: 1, width: '250px' }}

                                                            />





                                                        </div>



                                                    </Grid>
                                                </Grid>
                                                <div style={{ marginBottom: '5%' }}>


                                                    <Button

                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ float: 'right' }}
                                                        disabled={btnLoading} // Disable the button when loading is true
                                                    >
                                                        {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                    </Button>

                                                    <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }}  >
                                                        Close
                                                    </Button>


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

                        {data.length === 0 ? (
                            <Typography
                                variant="p"
                                component="div"
                                style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                            >
                                No Data Available
                            </Typography>
                        ) :

                            data.map(item => (

                                <div key={item.id} className='col-md-3 col-sm-6'>

                                    <Item>
                                        <Card style={{ backgroundColor: '#007F6D' }}>

                                            <CardContent className="d-flex flex-column align-items-center">

                                                <div style={{ overflowWrap: 'break-word', maxWidth: '10rem' }}>



                                                    <Typography style={{ marginTop: '-5%', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.designation}
                                                    </Typography>




                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                                        <img style={{ width: '50%', height: 'auto', color: '#131313', position: 'relative' }} alt="Profile" src="/image1/Vector.png" />
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: '15px', // Adjust the top position as needed
                                                                right: '10px', // Adjust the right position as needed
                                                                width: '10px',
                                                                height: '10px',
                                                                borderRadius: '50%',
                                                                backgroundColor: item.status ? '#90EE90' : 'red',
                                                            }}
                                                        >
                                                            {/* aa */}
                                                        </div>
                                                    </div>


                                                    <Typography style={{ fontSize: '130%', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.name}
                                                    </Typography>

                                                    <Typography style={{ color: 'white', fontSize: '100%' }}>
                                                        In Progress {item.activeTasks === null || item.activeTasks === undefined ? 0 : item.activeTasks}
                                                    </Typography>

                                                    <Typography style={{ color: 'white', fontSize: '100%' }}>
                                                        Completed {item.closedTasks === null || item.closedTasks === undefined ? 0 : item.closedTasks}
                                                    </Typography>
                                                </div>

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