
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';

// import { useLocation, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

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
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, EditableInputs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


// import EditableInputs from './EditableInputs';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';


import { Category } from '@mui/icons-material';
import Iconify from '../components/iconify';
import baseUrl from '../utils/baseUrl';





const columns = [
    { id: 'sr', label: 'Sr.No', minWidth: 14, align: 'center' },
    { id: 'problem', label: 'Problem', minWidth: 140, align: 'center' },
    { id: 'customerName', label: 'Customer Name', minWidth: 140, align: 'center' },
    { id: 'city', label: 'City', minWidth: 100, align: 'center' },
    // {
    //     id: 'areapin',
    //     label: 'Areapin',
    //     minWidth: 140,
    //     align: 'center',
    //     // format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'complaintStatus',
        label: 'Status',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'priority',
        label: 'Priority',
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


const columnscurrent = [
    { id: 'sr', label: 'Sr.No', minWidth: 14, align: 'center' },
    { id: 'problem', label: 'Problem', minWidth: 140, align: 'center' },
    { id: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
    { id: 'city', label: 'City', minWidth: 100, align: 'center' },
    // {
    //     id: 'areapin',
    //     label: 'Areapin',
    //     minWidth: 140,
    //     align: 'center',
    //     // format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'complaintStatus',
        label: 'Status',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'priority',
        label: 'Priority',
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




export default function Customerdetail() {

    const location = useLocation();
    // Accessing the userId from the location.state object
    const userId = location.state?.userId;



    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const customerId = searchParams.get('id');

    // console.log("customerId: ");
    // console.log(customerId);

    const initialFormData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
    };







    const [rowscurrent, setRowscurrent] = useState([])
    const [rowsCompt, setRowsCompt] = useState([])
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { id } = useParams();
    const navigate = useNavigate();



    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [areaPin, setAreaPin] = useState('');

    const [areapin, setAreapin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [contactno, setContactno] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('')

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(true);

    const [isFormValid, setIsFormValid] = useState(false);
    const [contactError, setContactError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const [meter, setMeter] = useState('');
    const [rcd, setRcd] = useState('');
    const [mcb, setMcb] = useState('');
    const [sla, setSla] = useState('');
    const [connector, setConnector] = useState('');
    const [led, setLed] = useState('');
    const [purchasedate, setPurchasedate] = useState('');
    const [warrantyperiod, setWarrantyperiod] = useState('');

    const [dateofmanufacturing, setManufacturing] = useState('');
    const [dateofinstallation, setInstallation] = useState('');
    const [nextsheduledmaintenance, setNextsheduledmaintenance] = useState('');
    const [controller, setController] = useState('');
    const [task, settask] = useState('');
    const [Params, setParams] = useState('');
    const [designation, setDesignation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmpassword, setShowconfirmpassword] = useState(false);

    const [value, setValue] = React.useState('1');

    const [formData, setformData] = useState([]);
    const [isEditable, setIsEditable] = useState(false);

    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
    const [openProduct, setOpenProduct] = React.useState(false);
    const [openProductUser, setUserOpenProduct] = React.useState(false);

    // const [isEditable, setIsEditable] = useState(false);

    // const [label, setLabel] = useState('');




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenUserPopup = (user) => {
        setName(user.name);
        setContact(user.contact);
        setEmail(user.email);
        setAreaPin(user.areaPin);
        setDesignation(user.designation);
        setAddress(user.address);
        setCity(user.city);
        setState(user.state);

        setUserOpen(true);
    }

    const handleClickClose1 = () => {
        setUserOpen(false);
    }
    const handleClickOpen1 = () => {
        setUserOpen(false);
    }



    const handleClickOpen2 = () => {
        setOpenProduct(true);
    };

    const handleClose2 = () => {
        setOpenProduct(false);
    };
    const handleClickOpenUserPopup2 = () => {
        setUserOpenProduct(true);
    }


    const resetpassword = (e) => {

        setConfirmpassword(null);
        setPassword(null);

    }

    const handleClickClose2 = () => {
        setUserOpenProduct(false);
        resetpassword();
    }
    const handleClickOpen3 = () => {
        setUserOpenProduct(false);
    }



    const handleSubmit2 = (e) => {
        e.preventDefault();

        // Perform actions with form data, e.g., validation or sending data to a server
        // Example: console.log(name, contactNo, email, address);

        // Reset form fields
        setName('');
        setContactNo('');
        setSla('');
        setManufacturing('');
        setMeter('');
        setRcd('');
        setMcb('');
        setConnector('');
        setLed('');
        setPurchasedate('');
        setWarrantyperiod('');
        setInstallation('');
        setNextsheduledmaintenance('');
        setController('');
    };


    const handleChange7 = (event) => {

        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/complaint/engineer/${userId}`, {
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
                setRowscurrent(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
                console.log("rowdata", rowscurrent)


            })
            .finally(() => {
                setLoading(false);
            });


    };






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

    // const routeChange = () => {
    //     window.location.href = "/pages/Customerdetail";
    // }
    // const routeChange = () => {
    //     window.location.href = "/dashboard/Complaintdetail";
    // }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // const handleToggleEdit = () => {
    //     setIsEditable(!isEditable);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveClick = () => {
        // Here, you can perform any action you want with the updated formData.
        // For this example, let's just log it to the console.
        console.log(formData);
        setIsEditable(false);
    };


    const handleChange3 = (event) => {

        setCategory(event.target.value);


    };


    const handleChange6 = (event) => {

        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/complaint-history/engineer/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then(response => {

                if (!response.ok) {
                    // toast.error("Something Went Wrong");


                }
                return response.json();
            })
            .then(json => {
                console.log("Fetched data:", json.data); // This line will print the data to the console
                // setUsers(json);
                setRows(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
                console.log("rowdata", rows)



            })
            .finally(() => {
                setLoading(false);
            });


    };


    // const handleSubmit1 = async (e) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem('token');


    // const formData = {

    //     //   adminId: 1,
    //     id: userId,
    //     name,
    //     contact,
    //     email,
    //     areaPin,
    //     address,
    //     city,
    //     state,
    //     // password,
    //     // confirmpassword,




    //     role: {
    //         id: 3,
    //     },
    // };

    //     // Convert form data object to JSON
    //     const requestBody = JSON.stringify(formData);

    //     console.log(formData);
    //     console.log(token);

    //     const response = await fetch(`${baseUrl}/api/user/`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: requestBody,
    //     });

    //     const data = await response.json();
    //     console.log(data);

    //     if (response.ok) {
    //         setUserOpenProduct(false);
    //         alert('Form submitted successfuly');
    //         window.location.reload();

    //     } else {
    //         setMessage(data.message);
    //     }


    //     console.log('Form data submitted:', formData);
    //     // Now you can close the form.
    //     setIsFormOpen(false);







    // };



    const handleSubmit1 = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const token = localStorage.getItem('token');


            const formData = {

                //   adminId: 1,
                id: userId,
                name,
                contact,
                email,
                designation,
                areaPin,
                address,
                city,
                state,
                // password,
                // confirmpassword,

                role: {
                    id: 3,
                },
            };

            const requestBody = JSON.stringify(formData);

            console.log(formData);
            console.log(token);

            const response = await fetch(`${baseUrl}/api/user/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: requestBody,
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUserOpenProduct(false);
                toast.success('Engineer Updated successfully');
                window.location.reload();
            } else {
                setMessage(data.message);
                toast.error('sorry! already exist user id & email id');
            }

            console.log('Form data submitted:', formData);
            setIsFormOpen(false);
            setLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error here, show a user-friendly message, etc.
        }
    };






    const routeChange1 = (id) => {


        console.log(id)

        navigate("/admin/task-history/details", { state: { taskId: id } });


    }

    const routeChange2 = (id) => {

        console.log(id)

        navigate("/admin/task/details", { state: { taskId: id } });

    }






    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);

        try {
            fetch(`${baseUrl}/api/user/${userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        toast.error('No data available');
                    }
                    return response.json();
                })
                .then(json => {
                    console.log("Fetched data:", json.data); // This line will print the data to the console
                    setUser(json.data);
                    handleChange6();
                    handleChange7();
                })
                .catch(error => {
                    console.error("An error occurred during fetch:", error);
                    // Handle the error as needed (e.g., set an error state)
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error("An error occurred:", error);
            // Handle the error as needed (e.g., set an error state)
            setLoading(false);
        }
    }, []);


    // 11/9/2023 change start

    const handlePasswordChange10 = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword === '' || validatePassword(newPassword)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be at least 6 characters long');
        }

    };

    const handleConfirmPasswordChange12 = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmpassword(newConfirmPassword);
    };

   

    const handleSubmit4 = async () => {
        try {
            if (password === '' || confirmpassword === '') {
                // Set an error message for empty fields
                toast.error('Empty password fields');
                return;
            }

            if (password !== confirmpassword) {
                // Set an error message and return
                toast.error('Passwords do not match');
                return;
            }

            if (password.length < 6) {
                // Set an error message for password validation
                toast.error('Password must be at least 6 characters long');
                return;
            }

            setBtnLoading(true); // Set loading to true when the submission starts

            // Assuming updateUser is an async function
            if (isFormOpen) {
                await updateUser();
            }

            // After submission is complete (success), check if the form is still open before updating
            if (isFormOpen) {
                setBtnLoading(false);
                setIsFormOpen(false);
            }
        } catch (error) {
            // Handle errors if needed
            setBtnLoading(false);
            console.error('Error:', error); // Log the error
            // Optionally, you can display an error message or perform other error handling here
            toast.error('An error occurred during submission');
        }
    };


    const updateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = {
                id: userId, // Assuming userId is defined elsewhere
                password,
            };

            const requestBody = JSON.stringify(formData);

            const response = await fetch(`${baseUrl}/api/user/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: requestBody,
            });

            const data = await response.json();

            if (response.ok) {

                // Password updated successfully
                setUserOpen(false);
                toast.success('Form submitted successfully');
                window.location.reload();
                // Clear the password fields
                setPassword('');
                setConfirmpassword('');

            } else {
                // Display the error message using toast.error
                toast.error(data.message || 'An error occurred', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            // Reset the form
            // setIsFormOpen(false); // You can handle this as needed
        } catch (error) {
            console.error('An error occurred:', error);
            // Display an error message to the user using toast.error
            toast.error('An error occurred while updating. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    // 11/9/2023 change end 




    let sr = 0;


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
       
    };
    const togglePasswordVisibility1 = () => {

        setShowconfirmpassword(!showconfirmpassword);
    };




    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>

                    <Box>
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh',borderRadius:'3px' }} position="static">

                            <Toolbar >
                                <Typography
                                    variant="h6"

                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: '3', sm: 'block' } }}
                                >

                                    <div className='container emp-profile'><br />
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <div className='profile-img'>
                                                    <img style={{ width: "8rem", height: "8rem", borderRadius: "100px" }} src="/image1/Vector.png" alt='customer' />

                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='profile-head'><br />
                                                    <div style={{ overflowWrap: 'break-word', maxWidth: "22rem" }}>
                                                        <h5>{user.name}</h5><br />

                                                        <h6 style={{ marginTop: '-6%' }}>Address: {user.address}</h6>
                                                        <h6>City: {user.city}</h6>
                                                        <h6>Area pin: {user.areaPin}</h6>
                                                        <h6>State: {user.state}</h6>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3'><br />
                                                <div><Button onClick={() => handleClickOpenUserPopup(user)} variant="contained" style={{ color: 'black', backgroundColor: 'white', width: '100%' }}>edit profile</Button></div><br />

                                                {/*
       11/9/2023 change start
      */}

                                                <Button onClick={handleClickOpenUserPopup2} variant="contained" style={{ backgroundColor: 'white', color: 'black', width: '100%' }} >
                                                    Reset Password
                                                </Button>


                                                <Dialog
                                                    open={openProductUser}
                                                    onClose={handleClickClose2} // Close the dialog when the close button is clicked
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    style={{ height: 'auto', maxWidth: '100%' }}
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Reset Password"}</DialogTitle>
                                                    <DialogContent>
                                                        <Container maxWidth="md">
                                                            <form>
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                                                            <TextField
                                                                                label="Confirm New Password"
                                                                                type={showconfirmpassword ? 'text' : 'password'}
                                                                                value={confirmpassword}
                                                                                onChange={handleConfirmPasswordChange12}
                                                                                fullWidth
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                InputProps={{
                                                                                    endAdornment: (
                                                                                        <InputAdornment position="end">
                                                                                            <IconButton onClick={togglePasswordVisibility1} edge="end">
                                                                                                {showconfirmpassword ? <Visibility /> : <VisibilityOff />}
                                                                                            </IconButton>
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                }}
                                                                            />

                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <div style={{ marginTop: '20px' }}>
                                                                    <Button
                                                                        onClick={handleSubmit4}
                                                                        type="button"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right' }}
                                                                        disabled={btnLoading} // Disable the button when loading is true
                                                                    >
                                                                        {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                                    </Button>
                                                                    <Button onClick={handleClickClose2} style={{ float: 'right', color: 'red', marginRight: '3%' }}>
                                                                        Close
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Container>
                                                    </DialogContent>
                                                </Dialog>

                                                {/*
       11/9/2023 change end
      */}





                                                <Dialog
                                                    open={openUser}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    style={{ height: 'auto', maxWidth: '100%' }} // Adjusted height and maxWidth for responsiveness
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Edit"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <Container maxWidth="md"> {/* Adjusted maxWidth for responsiveness */}
                                                            <form onSubmit={handleSubmit1}>
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
                                                                                type="text"
                                                                                name="name"
                                                                                value={name}
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 20) {
                                                                                        setName(e.target.value);
                                                                                    }
                                                                                }}
                                                                                fullWidth
                                                                                required
                                                                                inputProps={{ maxLength: 20 }}
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
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 50) {
                                                                                        handleEmailChange(e); // Call your email change handler
                                                                                    }
                                                                                }}
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
                                                                                label="Designation"
                                                                                value={designation}
                                                                                onChange={(e) => setDesignation(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                // style={{ padding: '7px', width: '250px' }}
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                inputProps={{ maxLength: 20 }}

                                                                            />

                                                                            <TextField
                                                                                label="Area Pin"
                                                                                value={areaPin}
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 6) {
                                                                                        setAreaPin(e.target.value);
                                                                                    }
                                                                                }}
                                                                                name="areaPin"
                                                                                fullWidth
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                inputProps={{ maxLength: 6 }}
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
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 50) {
                                                                                        setAddress(e.target.value);
                                                                                    }
                                                                                }}
                                                                                name="address"
                                                                                fullWidth
                                                                                multiline // Use the correct 'multiline' prop
                                                                                rows={4}
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                inputProps={{ maxLength: 50 }}
                                                                            />

                                                                            <TextField
                                                                                label="City"
                                                                                value={city}
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 35) {
                                                                                        setCity(e.target.value);
                                                                                    }
                                                                                }}
                                                                                name="city"
                                                                                fullWidth
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                inputProps={{ maxLength: 35 }}
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
                                                                                        onChange={(e) => setState(e.target.value)}
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


                                                                            {/* <TextField
                                                                                label="Password"
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                // style={{ padding: '7px', width: '250px' }}
                                                                                sx={{ m: 1, width: '250px' }}

                                                                            />
                                                                            <TextField
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
                                                                <div >
                                                                    <Button
                                                                        onClick={handleSaveClick}
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right', }}
                                                                        disabled={loading} // Disable the button when loading is true
                                                                    >
                                                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                                                                    </Button>
                                                                    <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }}>
                                                                        Close
                                                                    </Button><br />
                                                                </div>








                                                            </form>
                                                        </Container>
                                                    </DialogContent>
                                                </Dialog>




                                            </div>

                                        </div>



                                        <br />
                                        <div className='row'>
                                            <div className="col-md-3">

                                                <div className="profile-head">
                                                    <div style={{ overflowWrap: 'break-word', maxWidth: "10rem" }}>
                                                        <h6>Mail-Id:</h6>
                                                        <h6>{user.email}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3'>
                                                <h6>Contact:</h6>
                                                <h6>{user.contact}</h6>


                                            </div>

                                            {/* <div className='col-md-3'>
                                                <h5>userId:</h5>

                                            </div>
                                            <div className='col-md-3'>
                                                <h5>Designation:</h5>
                                                

                                            </div> */}
                                        </div>

                                    </div>

                                </Typography>

                                <br />

                            </Toolbar>
                        </AppBar>
                    </Box>

                    <Box >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', background: "#007F6D" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor="white" textColor="inherit">
                                    <Tab style={{ color: 'white' }} label="Current" value="1" />
                                    <Tab style={{ color: 'white', marginLeft: '1%' }} label="History" value="2" />


                                    {/* <Tab label="Item Three" value="3" /> */}
                                </TabList>

                            </Box>



                            <TabPanel value="2">

                                <Card>

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
                                                    {rows.length === 0 ? (<TableCell colSpan={columnscurrent.length}>
                                                        <Typography
                                                            variant="p"
                                                            component="div"
                                                            style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                                                        >
                                                            No Data  Available
                                                        </Typography>
                                                    </TableCell>) :
                                                        rows
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









                                                                        console.log(column)
                                                                        if (column.id === 'button') {
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>

                                                                                    {/* view dialog box customerdetail */}

                                                                                    <Button onClick={() => routeChange1(row.id)} variant="contained"> Details </Button>
                                                                                    <Dialog
                                                                                        open={open}
                                                                                        onClose={handleClose}
                                                                                        aria-labelledby="alert-dialog-title"
                                                                                        aria-describedby="alert-dialog-description"


                                                                                    >
                                                                                        <DialogTitle id="alert-dialog-title">
                                                                                            {"View Details"}

                                                                                            <div>
                                                                                                {/* Add more input fields as needed */}
                                                                                                {/* <button style={{ marginLeft: '75%',color:'white',backgroundColor:'blue',width:'24%',height:'39px',borderRadius:'7px' }}  onClick={handleToggleEdit}>
                                                                                                            {isEditable ? 'Disable Editing' : ' Editing'}
                                                                                                        </button> */}
                                                                                            </div>


                                                                                        </DialogTitle>
                                                                                        <DialogContent>
                                                                                            <DialogContentText>

                                                                                                <div style={{ padding: '20px', }}>

                                                                                                    {/* <img style={{ width: 125, height: 70, marginLeft: '90px', marginTop: '-30px' }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" /> */}

                                                                                                    <Grid container spacing={5}>
                                                                                                        <Grid item xs={6}>

                                                                                                            {/* <ul>
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
                                                                                                                        <li> Latitude </li>
                                                                                                                        <li>Longitude</li>
                                                                                                                    </ul> */}


                                                                                                            {/* <label htmlFor={id}>{label}</label> */}

                                                                                                            {/* <input style={{ marginTop: '40%' }} type="text" value="Field 1" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} /> */}

                                                                                                            <div>
                                                                                                                <form>





                                                                                                                    <Grid container spacing={5}>
                                                                                                                        <Grid item xs={6}>



                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Product Name"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Product Type"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Serial No"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Constraction Type"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Rating"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Dispatch Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                        </Grid>


                                                                                                                        <Grid item xs={6}>


                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Purchase Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Manufacturing Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Installation Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Warranty Period"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Additional Files"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <FormControl sx={{ m: 1, minWidth: 195, minHeight: '40', backgroundColor: 'white', marginTop: '15%', marginLeft: '150%', borderRadius: '5px', width: '1%' }} size="small">
                                                                                                                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Category</InputLabel>
                                                                                                                                    <Select
                                                                                                                                        labelId="demo-select-small-label"
                                                                                                                                        id="demo-select-small"
                                                                                                                                        value={category}
                                                                                                                                        label="Category"
                                                                                                                                        onChange={handleChange3}

                                                                                                                                    >
                                                                                                                                        <MenuItem value="">
                                                                                                                                            <em>None</em>
                                                                                                                                        </MenuItem>
                                                                                                                                        <MenuItem value={10}>1 </MenuItem>
                                                                                                                                        <MenuItem value={20}>2</MenuItem>
                                                                                                                                        <MenuItem value={30}>3</MenuItem>

                                                                                                                                    </Select>
                                                                                                                                </FormControl>
                                                                                                                            </div>






                                                                                                                        </Grid>

                                                                                                                    </Grid>


                                                                                                                </form>

                                                                                                            </div>

                                                                                                        </Grid>


                                                                                                    </Grid>



                                                                                                </div>



                                                                                            </DialogContentText>
                                                                                        </DialogContent>
                                                                                        <DialogActions>
                                                                                            <Button onClick={handleClose} style={{ color: 'red', marginRight: '4%' }} >Close</Button>
                                                                                            {isEditable ? (
                                                                                                <button onClick={handleSaveClick} style={{ width: '15%', marginRight: '4%', color: 'white', backgroundColor: 'blue', height: '35px', borderRadius: '7PX' }} >Save</button>
                                                                                            ) : (
                                                                                                <button onClick={handleEditClick} style={{ width: '15%', marginRight: '4%', color: 'white', backgroundColor: 'blue', height: '35px', borderRadius: '7PX' }} >Edit</button>
                                                                                            )}
                                                                                        </DialogActions>
                                                                                    </Dialog>
                                                                                </TableCell>

                                                                            );


                                                                        }


                                                                        return (
                                                                            <TableCell key={column.id} align={column.align} style={{ overflowWrap: 'break-word', maxWidth: '10rem' }}>
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






                            </TabPanel>

                            <TabPanel value="1">

                                <Card>

                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ maxHeight: 440 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        {columnscurrent.map((column) => (
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
                                                    {rowscurrent.length === 0 ? (<TableCell colSpan={columnscurrent.length}>
                                                        <Typography
                                                            variant="p"
                                                            component="div"
                                                            style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                                                        >
                                                            No Data Available
                                                        </Typography>
                                                    </TableCell>) :
                                                        rowscurrent
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((row) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                    {columnscurrent.map((column) => {

                                                                        const value = row[column.id];

                                                                        if (column.id === 'srno') {
                                                                            sr += 1;
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {value === null ? '' : String(sr)}
                                                                                </TableCell>
                                                                            );
                                                                        }









                                                                        console.log(column)
                                                                        if (column.id === 'button') {
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>

                                                                                    {/* view dialog box customerdetail */}

                                                                                    <Button onClick={() => routeChange2(row.id)} variant="contained"> Details </Button>
                                                                                    <Dialog
                                                                                        open={open}
                                                                                        onClose={handleClose}
                                                                                        aria-labelledby="alert-dialog-title"
                                                                                        aria-describedby="alert-dialog-description"


                                                                                    >
                                                                                        <DialogTitle id="alert-dialog-title">
                                                                                            {"View Details"}

                                                                                            <div>
                                                                                                {/* Add more input fields as needed */}
                                                                                                {/* <button style={{ marginLeft: '75%',color:'white',backgroundColor:'blue',width:'24%',height:'39px',borderRadius:'7px' }}  onClick={handleToggleEdit}>
                                                                                                            {isEditable ? 'Disable Editing' : ' Editing'}
                                                                                                        </button> */}
                                                                                            </div>


                                                                                        </DialogTitle>
                                                                                        <DialogContent>
                                                                                            <DialogContentText>

                                                                                                <div style={{ padding: '20px', }}>

                                                                                                    {/* <img style={{ width: 125, height: 70, marginLeft: '90px', marginTop: '-30px' }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" /> */}

                                                                                                    <Grid container spacing={5}>
                                                                                                        <Grid item xs={6}>

                                                                                                            {/* <ul>
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
                                                                                                                        <li> Latitude </li>
                                                                                                                        <li>Longitude</li>
                                                                                                                    </ul> */}


                                                                                                            {/* <label htmlFor={id}>{label}</label> */}

                                                                                                            {/* <input style={{ marginTop: '40%' }} type="text" value="Field 1" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} />
                                                                                                                        <input type="text" value="Field 2" disabled={!isEditable} /> */}

                                                                                                            <div>
                                                                                                                <form>





                                                                                                                    <Grid container spacing={5}>
                                                                                                                        <Grid item xs={6}>



                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Product Name"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Product Type"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Serial No"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Constraction Type"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Rating"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Dispatch Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                        </Grid>


                                                                                                                        <Grid item xs={6}>


                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Purchase Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Manufacturing Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Installation Date"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Warranty Period"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <TextField
                                                                                                                                    label="Additional Files"
                                                                                                                                    // id="outlined-start-adornment"
                                                                                                                                    sx={{ m: 1, width: '25ch' }}
                                                                                                                                    onChange={handleInputChange}
                                                                                                                                    disabled={!isEditable}
                                                                                                                                    style={{ width: '210%', marginLeft: '150%' }}

                                                                                                                                />

                                                                                                                            </div>
                                                                                                                            <div>
                                                                                                                                <FormControl sx={{ m: 1, minWidth: 195, minHeight: '40', backgroundColor: 'white', marginTop: '15%', marginLeft: '150%', borderRadius: '5px', width: '1%' }} size="small">
                                                                                                                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Category</InputLabel>
                                                                                                                                    <Select
                                                                                                                                        labelId="demo-select-small-label"
                                                                                                                                        id="demo-select-small"
                                                                                                                                        value={category}
                                                                                                                                        label="Category"
                                                                                                                                        onChange={handleChange3}

                                                                                                                                    >
                                                                                                                                        <MenuItem value="">
                                                                                                                                            <em>None</em>
                                                                                                                                        </MenuItem>
                                                                                                                                        <MenuItem value={10}>1 </MenuItem>
                                                                                                                                        <MenuItem value={20}>2</MenuItem>
                                                                                                                                        <MenuItem value={30}>3</MenuItem>

                                                                                                                                    </Select>
                                                                                                                                </FormControl>
                                                                                                                            </div>






                                                                                                                        </Grid>

                                                                                                                    </Grid>


                                                                                                                </form>

                                                                                                            </div>

                                                                                                        </Grid>

                                                                                                        {/* <Grid item xs={6}>

                                                                                                                    <li>Rapid Pod</li>
                                                                                                                    <li>Rapid Pod TRI01 </li>
                                                                                                                    <li>24hrs</li>
                                                                                                                    <li>19/8/2023</li>
                                                                                                                    <li>15/2/2023</li>
                                                                                                                    <li>05/22023</li>
                                                                                                                    <li>Railbit</li>
                                                                                                                    <li> Schneider</li>
                                                                                                                    <li>Siemens</li>
                                                                                                                    <li>Havells</li>
                                                                                                                    <li>Phoneix</li>
                                                                                                                    <li> NP</li>
                                                                                                                    <li> Railbit</li>
                                                                                                                    <li> 27.78777</li>
                                                                                                                    <li> 77.89877</li>




                                                                                                                </Grid> */}
                                                                                                    </Grid>



                                                                                                </div>



                                                                                            </DialogContentText>
                                                                                        </DialogContent>
                                                                                        <DialogActions>
                                                                                            <Button onClick={handleClose} style={{ color: 'red', marginRight: '4%' }} >Close</Button>
                                                                                            {isEditable ? (
                                                                                                <button onClick={handleSaveClick} style={{ width: '15%', marginRight: '4%', color: 'white', backgroundColor: 'blue', height: '35px', borderRadius: '7PX' }} >Save</button>
                                                                                            ) : (
                                                                                                <button onClick={handleEditClick} style={{ width: '15%', marginRight: '4%', color: 'white', backgroundColor: 'blue', height: '35px', borderRadius: '7PX' }} >Edit</button>
                                                                                            )}
                                                                                        </DialogActions>
                                                                                    </Dialog>
                                                                                </TableCell>

                                                                            );


                                                                        }


                                                                        return (
                                                                            <TableCell key={column.id} align={column.align} style={{ overflowWrap: 'break-word', maxWidth: '10rem' }}>
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
                                            count={rowscurrent.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>

                                </Card>






                            </TabPanel>
                        </TabContext>
                    </Box>



                </div>


                {/* <div className='col-md-3'>

                    <Grid item xs={3} >
                        <Item style={{ height: '50px', backgroundColor: '#00617F', color: 'white' }}>
                            <p style={{ marginTop: '1%' }}>Recent Activities</p>
                        </Item>
                        <Item style={{ height: '7%', }}>

                            <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px', marginLeft: '-3%' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%', marginRight: '-11%' }}> New task assigned by system.</p>
                            <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                        </Item>
                        <Item style={{ height: '7%', }}>

                            <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px', marginLeft: '-3%' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%', marginRight: '-11%' }}> New task assigned by system.</p>
                            <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                        </Item>
                        <Item style={{ height: '7%', }}>

                            <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px', marginLeft: '-3%' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%', marginRight: '-11%' }}> New task assigned by system.</p>
                            <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                        </Item>
                        <Item style={{ height: '7%', }}>

                            <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px', marginLeft: '-3%' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%', marginRight: '-11%' }}> New task assigned by system.</p>
                            <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                        </Item>





                    </Grid>


                </div> */}



            </div>


        </div>


    );

}