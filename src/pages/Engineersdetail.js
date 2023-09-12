
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

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



import { Category } from '@mui/icons-material';
import Iconify from '../components/iconify';
import baseUrl from '../utils/baseUrl';





const columns = [
    { id: 'srno', label: 'Sr.No', minWidth: 14, align: 'center' },
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
    { id: 'srno', label: 'Sr.No', minWidth: 14, align: 'center' },
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

    const handleClickClose2 = () => {
        setUserOpenProduct(false);
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
                setRowscurrent(json.data)
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
                setRows(json.data)
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
            const token = localStorage.getItem('token');

            const formData = {

                //   adminId: 1,
                id: userId,
                name,
                contact,
                email,
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
                toast.success('Form submitted successfully');
                window.location.reload();
            } else {
                setMessage(data.message);
                toast.error('sorry! already exist user id & email id');
            }

            console.log('Form data submitted:', formData);
            setIsFormOpen(false);
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error here, show a user-friendly message, etc.
        }
    };






    const routeChange1 = (id) => {


        console.log(id)

        navigate("/dashboard/task-history-details", { state: { taskId: id } });


    }

    const routeChange2 = (id) => {

        console.log(id)

        navigate("/Dashboard/Taskdetail", { state: { taskId: id } });

    }




    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setLoading(true);
    //     fetch(`${baseUrl}/api/user/${userId}`, {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },

    //     })

    //         .then(response => response.json())
    //         .then(json => {
    //             console.log("Fetched data:", json.data); // This line will print the data to the console
    //             setUser(json.data)






    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });

    //     handleChange6();
    //     handleChange7();


    //     // handleChange7();
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }


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

    const handleSubmit4 = () => {
        debugger; // eslint-disable-line no-debugger
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



        updateUser();
        setIsFormOpen(false);


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
                    position: toast.POSITION.TOP_CENTER,
                });
            }

            // Reset the form
            // setIsFormOpen(false); // You can handle this as needed
        } catch (error) {
            console.error('An error occurred:', error);
            // Display an error message to the user using toast.error
            toast.error('An error occurred while updating. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    // 11/9/2023 change end 




    let sr = 0;





    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>

                    <Box>
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh' }} position="static">
                            <Toolbar >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: '3', sm: 'block' } }}
                                >

                                    <div className='container emp-profile'><br />
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <div className='profile-img'>
                                                    <img style={{ width: "8rem", height: "8rem", borderRadius: "100px" }} src="/assets/images/avatars/avatar_5.jpg" alt='customer' />

                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='profile-head'><br />
                                                    <h5>{user.name}</h5><br />
                                                    <h6 style={{ marginTop: '-6%' }}>{user.address}</h6>

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
                                                                                value={password}
                                                                                onChange={handlePasswordChange10}
                                                                                fullWidth
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                error={passwordError !== ''}
                                                                                helperText={passwordError}
                                                                            />
                                                                            <TextField
                                                                                label="Confirm New Password"
                                                                                value={confirmpassword}
                                                                                onChange={handleConfirmPasswordChange12}
                                                                                fullWidth
                                                                                required
                                                                                type="password"
                                                                                sx={{ m: 1, width: '250px' }}

                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <div style={{ marginTop: '20px' }}>
                                                                    <Button onClick={handleSubmit4} type="button" variant="contained" color="primary" style={{ float: 'right' }}>
                                                                        Submit
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
                                                                                type="text"
                                                                                name="name"
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
                                                                                name="areaPin"
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
                                                                                name="address"
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
                                                                                name="city"
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
                                                                                name="state"
                                                                                fullWidth
                                                                                multilin
                                                                                rows={4}
                                                                                required
                                                                                // style={{ padding: '7px', width: '250px', height: '120px' }}
                                                                                sx={{ m: 1, width: '250px' }}
                                                                            />


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
                                                                <div style={{ marginTop: '20px' }}>
                                                                    {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                                                                        Submit
                                                                    </Button>
                                                                    <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red' }}>
                                                                        Close
                                                                    </Button> */}




                                                                    {/* <button onClick={handleSaveClick} style={{ float: 'right', marginRight: '-5px', borderRadius: '7px', backgroundColor: 'primary' }} >Save</button> */}
                                                                    <Button onClick={handleSaveClick} type="submit" variant="contained" color="primary" style={{ float: 'right', marginBottom: '100%' }}>Save</Button>




                                                                    <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }} >Close</Button>

                                                                </div>








                                                            </form>
                                                        </Container>
                                                    </DialogContent>
                                                </Dialog>




                                            </div>

                                        </div>



                                        <br />
                                        <div className='row'>
                                            <div className='col-md-3'>

                                                <h6>Mail-Id:</h6>
                                                <h6>{user.email}</h6>




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
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab style={{ color: 'white' }} label="Current" value="1" />
                                    <Tab style={{ color: 'white', marginLeft: '1%' }} label="History" value="2" />


                                    {/* <Tab label="Item Three" value="3" /> */}
                                </TabList>

                            </Box>



                            <TabPanel value="2">
                                <Item>
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
                                                        {rows === null || rows === undefined ? (<TableCell colSpan={columns.length}>
                                                            <Typography
                                                                variant="p"
                                                                component="div"
                                                                style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                                                            >
                                                                No Data Available
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




                            </TabPanel>

                            <TabPanel value="1">
                                <Item>
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
                                                                .map((row) => {
                                                                    return (
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
                                                count={rowscurrent.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </Paper>

                                    </Card>

                                </Item>




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