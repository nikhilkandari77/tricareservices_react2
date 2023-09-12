import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Card, Container, Stack, TextField, Typography,Dialog, DialogContent, DialogContentText,DialogTitle, Grid, EditableInputs } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

export default function Admin() {

    const location = useLocation();
    // Accessing the userId from the location.state object
    const userId = location.state?.userId;


    const navigate = useNavigate();
    const [rowsCompt, setRowsCompt] = useState([]);

    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { id } = useParams();
    // const id = `this`.state.id; 
    const[resetSuccess, setResetSuccess] =('');
    const[resetError, setResetError] =('');
    const[PasswordMatch, setPasswordMatch] =('');
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [areaPin, setAreapin] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [constructionType, setConstructionType] = useState('');
    const [rating, setRating] = useState('');
    const [dispatchDate, setDispatchDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');

    const [installationDate, setInstallationDate] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [formData, setformData] = useState([]);

    const [value, setValue] = React.useState('1');
    const [isEditable, setIsEditable] = useState(true);

    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({});

    const [message, setMessage] = useState('')

    const [isFormOpen, setIsFormOpen] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});


    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const [searchItem, setSearchItem] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactError, setContactError] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [productCustomerData, setProductCustomerData] = useState({})
    const [categories, setCategories] = useState([]);
    const [getCategory, setgetCategory] = useState([]);
    const [productImages, setProductsImages] = useState([]);
    




    const token = localStorage.getItem('token');

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
    const[OpenProductUser, setOpenProductUser] = React.useState(false);
    
    const [openProductDetails, setOpenProductDetails] = useState(false);
    // const [isEditable, setIsEditable] = useState(false);

    // const [label, setLabel] = useState('');


    const handleProductDetails = (row) => {
        setProductCustomerData(row);
        setProductsImages(row.productImageName.split(","))
        console.log("jbhbjb", row.productImageName.split(","));
        setOpenProductDetails(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenProductDetails(false);
    };
    const handleClickOpenUserPopup = (user) => {
        setName(user.name);
        setContact(user.contact);
        setEmail(user.email);
        setAreapin(user.areaPin);
        setAddress(user.address);
        setCity(user.city);
        setState(user.state);
        setStatus(user.status)




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


    const handleCloseForm = () => {
        setIsFormSubmitted('false');
        handleClickClose2();
    };




    const getProducts = (categoryId) => {
        fetch(`${baseUrl}/api/user/product-master/categoryId/${categoryId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })

            .then(response => response.json())
            .then(json => {
                console.log("product data:", json.data); // This line will print the data to the console
                setProducts(json.data);
            })
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
        setAreapin('');
        setState('');
        setPassword('');
        setCity('');
    };

    // const routeChange = () => {
    //     window.location.href = "/pages/Admin";
    // }

    const routeChange = () => {
        window.location.href = "/dashboard/Admin";
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // const handleToggleEdit = () => {
    //     setIsEditable(!isEditable);
    // };

    const handleInputChange = (e) => {
        debugger; // eslint-disable-line no-debugger
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value,
            [contact]: value,
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
        getProducts(event.target.value);


    };
    const handleChangeproductname = (event) => {

        setProductName(event.target.value);


    };




    const handleDateChange = (event) => {
        setDispatchDate(event.target.value);
    };
    const handleDateChange1 = (event) => {
        setPurchaseDate(event.target.value);
    };
    const handleDateChange2 = (event) => {
        setManufacturingDate(event.target.value);
    };
    const handleDateChange3 = (event) => {
        setInstallationDate(event.target.value);
    };


    const validatePassword = (password) => {
        return password.length >= 6; // You can adjust the minimum length as needed
    };
 


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

  const handleSubmit2 = () => {
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

    // const validatePassword = (password) => {
    //     return password.length >= 6; // You can adjust the minimum length as needed
    // };







    const handleEmailChange11 = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail === '' || validateEmail(newEmail)) {
            setEmailError('');
        } else {
            setEmailError('Invalid email format');
        }
    };


    const handleConfirmPasswordChange2 = (e) => {
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











    const handleSubmit1 = async (e) => {
        e.preventDefault();

        if (emailError === '') {
            setIsFormValid(true);
            // Proceed with form submission or other actions
        } else {
            setIsFormValid(false);
        }


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
            status,
            // password,
            // confirmpassword,

            // role: {
            //     id: 2,
            // },
        };

        // Convert form data object to JSON
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

        if (response.ok) {
            setUserOpenProduct(false);
            toast.success('updated successfully', {
                position: toast.POSITION.TOP_CENTER,
            });
            window.location.reload();
        } else {
            toast.error(data.message || 'An error occurred', {
                position: toast.POSITION.TOP_CENTER,
            });
        }


        console.log('Form data submitted:', formData);
        // Now you can close the form.
        setIsFormOpen(false);

    };







    // const handleChange6 = (event) => {

    //     setCategory(event.target.value);


    // };

    // const getAllProductCategory = () => {

    //     const token = localStorage.getItem('token');
    //     setLoading(true);
    //     fetch(`${baseUrl}/api/user/category/`, {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },

    //     })

    //         .then(response => response.json())
    //         .then(json => {
    //             console.log("Fetched data:", json.data); // This line will print the data to the console
    //             // setUsers(json);
    //             // setRowsCompt(json.data);
    //             setCategories(json.data);


    //             // };

    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });

    //     //     setCategory(event.target.value);

    // };





    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/${userId}`, {
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
                setUser(json.data)



            })
            .finally(() => {
                setLoading(false);
            });


        // getAllProductCategory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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


    // let sr = 0;


    const routeChange2 = (id) => {

        console.log(id)

        navigate("/Dashboard/Taskdetail", { state: { taskId: id } });


    }








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
                                                    <img style={{ width: "8rem", height: "8rem", borderRadius: "100px" }} src="/image1/images.jpg" alt='customer' />

                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='profile-head'><br />
                                                    <h4>{user.name}</h4><br />
                                                    <h6 style={{ marginTop: '-5%' }}>{user.city}</h6>
                                                    <h6>{user.address}</h6>

                                                </div>

                                            </div>
                                            <div className='col-md-3'><br />

                                                <div><Button onClick={() => handleClickOpenUserPopup(user)} variant="contained" style={{ color: 'black', backgroundColor: 'white', width: '100%' }}>edit profile</Button></div><br />

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
                                                                    <Button onClick={handleSubmit2} type="button" variant="contained" color="primary" style={{ float: 'right' }}>
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
                                                                                onChange={handleEmailChange11}
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
                                                                                onChange={(e) => setAreapin(e.target.value)}
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

                                                                            <div>
                                                                                <FormControl sx={{ minWidth: 200, marginTop: '5%' }} size="small" fullWidth>
                                                                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Status</InputLabel>
                                                                                    <Select
                                                                                        labelId="demo-select-small-label"
                                                                                        id="demo-select-small"
                                                                                        value={status}
                                                                                        label="Status"
                                                                                        name="status"
                                                                                        onChange={(e) => setStatus(e.target.value)}
                                                                                    >
                                                                                        <MenuItem value="">
                                                                                            <em>None</em>
                                                                                        </MenuItem>
                                                                                        <MenuItem value="Active">Active</MenuItem>
                                                                                        <MenuItem value="Disabled">disabled</MenuItem>

                                                                                    </Select>
                                                                                </FormControl>
                                                                            </div>




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




                                                                    {/* <button  color="primary" onClick={handleSaveClick} style={{ float: 'right', marginRight: '-5px' }} >Save</button> */}

                                                                    <Button onClick={handleSaveClick} type="submit" variant="contained" color="primary" style={{ float: 'right' }}>submit</Button>




                                                                    <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '3%' }} >Close</Button>

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

                                        </div>

                                    </div>

                                </Typography>

                                <br />

                            </Toolbar>
                        </AppBar>
                    </Box>














                </div>



            </div>


        </div>


    );

}