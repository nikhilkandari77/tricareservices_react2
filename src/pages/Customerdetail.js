import React, { useState, useEffect } from 'react';
import FileSaver from 'file-saver';

import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
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
import {
    Button,
    Card,
    Container,
    Stack,
    TextField,
    Typography,
    DialogContent,
    DialogContentText,
    Grid,
    EditableInputs,
} from '@mui/material';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { Category } from '@mui/icons-material';
import Iconify from '../components/iconify';
import baseUrl from '../utils/baseUrl';
import Label from '../components/label/Label';

const columnsCompt = [
    { id: 'srno', label: 'Sr.No', minWidth: 80, align: 'center' },
    { id: 'productName', label: 'Product Name', minWidth: 140, align: 'center' },
    { id: 'productType', label: 'Product Type', minWidth: 140, align: 'center' },
    { id: 'serialNo', label: 'Serial No', minWidth: 100, align: 'center' },
    // { id: 'constructionType', label: 'Construction Type', minWidth: 170,align: 'center' },
    { id: 'purchaseDate', label: 'Purchase Date', minWidth: 140, align: 'center' },
    // {
    //     id: 'manufacturingDate',
    //     label: 'Manufacturing Date',
    //     minWidth: 170,
    //     align: 'center',
    //     // format: (value) => value.toLocaleString('en-US'),
    // },
    {
        id: 'warrantyPeriod',
        label: ' Warranty Period',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'button',
        label: 'Details',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toFixed(2),
    },
];

const columns = [
    { id: 'sr', label: 'Sr.No', minWidth: 50, align: 'center' },
    { id: 'id', label: 'Complaint Id', minWidth: 140, align: 'center' },
    { id: 'productCustomer', subId: 'productName', label: 'Product', minWidth: 110, align: 'center' },
    { id: 'problem', label: 'Problem', minWidth: 120, align: 'center' },
    { id: 'createdDateTime', label: 'Complaint Time', minWidth: 100, align: 'center' },
    { id: 'complaintStatus', label: 'Status', minWidth: 100, align: 'center' },
    // { id: 'priority', label: 'Priority', minWidth: 100, align: 'center' },

    // {
    //     id: 'contactno',
    //     label: 'Complaint Date',
    //     minWidth: 140,
    //     align: 'center',
    //     // format: (value) => value.toLocaleString('en-US'),
    // },
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

    const navigate = useNavigate();
    const [rowsCompt, setRowsCompt] = useState([]);

    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { id } = useParams();
    // const id = `this`.state.id;

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

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const [message, setMessage] = useState('');

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
    const [productCustomerData, setProductCustomerData] = useState({});
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
    const [openuserpassword, setOpenuserpassword] = React.useState(false); // 11/9/2023 change this line
    const [openProductDetails, setOpenProductDetails] = useState(false);
    // const [isEditable, setIsEditable] = useState(false);

    // const [label, setLabel] = useState('');

    const handleProductDetails = (row) => {
        setProductCustomerData(row);
        setProductsImages(row.productImageName.split(','));
        console.log('jbhbjb', row.productImageName.split(','));
        setOpenProductDetails(true);
    };

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
        setStatus(user.status);

        setUserOpen(true);
    };

    const handleClickClose1 = () => {
        setUserOpen(false);
    };
    const handleClickOpen1 = () => {
        setUserOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpenProduct(true);
    };

    const handleClose2 = () => {
        setOpenProduct(false);
    };
    const handleClickOpenUserPopup2 = () => {
        setUserOpenProduct(true);
    };

    const handleClickClose2 = () => {
        setUserOpenProduct(false);
    };
    const handleClickOpen3 = () => {
        setUserOpenProduct(false);
    };

    const handleCloseForm = () => {
        setIsFormSubmitted('false');
        handleClickClose2();
    };

    // 11/9/2023 change start

    const handleClickOpenUserPopup3 = () => {
        setOpenuserpassword(true);
    };

    const handleClickClose3 = () => {
        setOpenuserpassword(false);
    };

    //  11/9/2023 change end

    const getProducts = (categoryId) => {
        fetch(`${baseUrl}/api/user/product-master/categoryId/${categoryId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('product data:', json.data); // This line will print the data to the console
                setProducts(json.data);
            });
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
        setAreapin('');
        setState('');
        setPassword('');
        setCity('');
    };

    // const routeChange = () => {
    //     window.location.href = "/pages/Customerdetail";
    // }
    const routeChange = () => {
        window.location.href = '/dashboard/Complaintdetail';
    };

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

    const routeChange1 = (id) => {
        navigate('/Dashboard/Taskdetail', { state: { taskId: id } });
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

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        const formData1 = {
            customer: {
                id: userId,
            },
            product: selectedProduct,
            productType,
            serialNo,
            constructionType,
            rating,
            dispatchDate,
            purchaseDate,
            manufacturingDate,
            installationDate,
            warrantyPeriod,
        };

        // Convert form data object to JSON
        const requestBody = JSON.stringify(formData1);

        console.log(formData1);
        console.log(token);

        const response = await fetch(`${baseUrl}/api/user/product-customer/`, {
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
            setUserOpenProduct(false);
            toast.success('Form submitted successfully');
            window.location.reload();
        } else {
            setMessage(data.message);
            toast.error('somthing went worng');
        }

        console.log('Form data submitted:', formData1);
        // Now you can close the form.
        setIsFormOpen(false);
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
        };

        // Convert form data object to JSON
        const requestBody = JSON.stringify(formData);

        console.log(formData);
        console.log(token);
        const response = await fetch(`${baseUrl}/api/user/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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

    const handleChange5 = (event) => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/product-customer/details/?userId=${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Fetched data:', json.data); // This line will print the data to the console
                // setUsers(json);
                setRowsCompt(json.data);
                console.log('rowdata', rowsCompt);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleChange6 = (event) => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/complaint/customer/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Fetched data:', json.data); // This line will print the data to the console
                // setUsers(json);
                setRows(json.data);
                console.log('rowdata', rows);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // const handleChange6 = (event) => {

    //     setCategory(event.target.value);

    // };

    const getAllProductCategory = () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/category/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Fetched data:', json.data); // This line will print the data to the console
                // setUsers(json);
                // setRowsCompt(json.data);
                setCategories(json.data);

                // };
            })
            .finally(() => {
                setLoading(false);
            });

        //     setCategory(event.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Fetched data:', json.data); // This line will print the data to the console
                // setUsers(json);
                setUser(json.data);
            })
            .finally(() => {
                setLoading(false);
            });
        handleChange5();
        handleChange6();
        getAllProductCategory();
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
            hour12: true,
        };

        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
    }

    let sr = 0;

    const routeChange2 = (id) => {
        console.log(id);

        navigate('/Dashboard/Taskdetail', { state: { taskId: id } });
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
                    Authorization: `Bearer ${token}`,
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Box>
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh' }} position="static">
                            <Toolbar>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: '3', sm: 'block' } }}>
                                    <div className="container emp-profile">
                                        <br />
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="profile-img">
                                                    <img
                                                        style={{ width: '8rem', height: '8rem', borderRadius: '100px' }}
                                                        src="/image1/images.jpg"
                                                        alt="customer"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="profile-head">
                                                    <br />
                                                    <h4>{user.name}</h4>
                                                    <br />
                                                    <h6 style={{ marginTop: '-5%' }}>{user.city}</h6>
                                                    <h6>{user.address}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <br />

                                                {/*
       11/9/2023 change start
      */}

                                                <Button
                                                    onClick={handleClickOpenUserPopup3}
                                                    variant="contained"
                                                    style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                                                >
                                                    Reset Password
                                                </Button>

                                                <Dialog
                                                    open={openuserpassword}
                                                    onClose={handleClickClose3} // Close the dialog when the close button is clicked
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    style={{ height: 'auto', maxWidth: '100%' }}
                                                >
                                                    <DialogTitle id="alert-dialog-title">{'Reset Password'}</DialogTitle>
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
                                                                    <Button
                                                                        onClick={handleSubmit4}
                                                                        type="button"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right' }}
                                                                    >
                                                                        Submit
                                                                    </Button>
                                                                    <Button
                                                                        onClick={handleClickClose3}
                                                                        style={{ float: 'right', color: 'red', marginRight: '3%' }}
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Container>
                                                    </DialogContent>
                                                </Dialog>

                                                <br />
                                                <br />

                                                {/*
       11/9/2023 change end
      */}

                                                <div>
                                                    <Button
                                                        onClick={() => handleClickOpenUserPopup(user)}
                                                        variant="contained"
                                                        style={{ color: 'black', backgroundColor: 'white', width: '100%' }}
                                                    >
                                                        edit profile
                                                    </Button>
                                                </div>
                                                <br />

                                                <Button
                                                    onClick={handleClickOpenUserPopup2}
                                                    variant="contained"
                                                    style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                                                >
                                                    Add Product
                                                </Button>

                                                <Dialog
                                                    open={openProductUser}
                                                    onClose={handleClickClose2}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    style={{ height: 'auto', maxWidth: '100%' }} // Adjusted height and maxWidth for responsiveness
                                                >
                                                    <DialogTitle id="alert-dialog-title">{'Add Products'}</DialogTitle>
                                                    <DialogContent>
                                                        <Container maxWidth="md">
                                                            {' '}
                                                            {/* Adjusted maxWidth for responsiveness */}
                                                            <form onSubmit={handleSubmit2}>
                                                                <Grid container spacing={3}>
                                                                    {/* Left side fields */}
                                                                    {/* Your Name, Contact No, Email, and Area pin fields */}

                                                                    <Grid item xs={12} md={6}>
                                                                        {' '}
                                                                        {/* Adjusted the Grid layout for responsiveness */}
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                            <FormControl sx={{ minWidth: 200, marginTop: '7%' }} size="small" fullWidth>
                                                                                <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>
                                                                                    Category
                                                                                </InputLabel>
                                                                                <Select
                                                                                    labelId="demo-select-small-label"
                                                                                    id="demo-select-small"
                                                                                    value={category}
                                                                                    label="Category"
                                                                                    onChange={handleChange3}
                                                                                >
                                                                                    <MenuItem value="" key="">
                                                                                        Select Catagory
                                                                                    </MenuItem>
                                                                                    {categories.map((getCategory) => (
                                                                                        <MenuItem value={getCategory.id} key={getCategory.id}>
                                                                                            {getCategory.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                            <TextField
                                                                                label="Product Type"
                                                                                value={productType}
                                                                                onChange={(e) => setProductType(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />
                                                                            <TextField
                                                                                label="Serial No"
                                                                                value={serialNo}
                                                                                onChange={(e) => setSerialNo(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                            />
                                                                            <TextField
                                                                                label="Construction Type"
                                                                                value={constructionType}
                                                                                onChange={(e) => setConstructionType(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />
                                                                            <TextField
                                                                                label="Rating"
                                                                                value={rating}
                                                                                onChange={(e) => setRating(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />

                                                                            <FormControl
                                                                                variant="outlined"
                                                                                sx={{ width: '100%', marginTop: '7%' }}
                                                                                size="small"
                                                                            >
                                                                                <TextField
                                                                                    id="datepicker"
                                                                                    label="Dispatch Date"
                                                                                    variant="outlined"
                                                                                    value={dispatchDate}
                                                                                    onChange={handleDateChange}
                                                                                    type="date" // Use type "date" for date picker
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        // Set placeholder value here
                                                                                        // min: new Date().toISOString().split('T')[0],
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6}>
                                                                        {' '}
                                                                        {/* Adjusted the Grid layout for responsiveness */}
                                                                        {/* Right side fields */}
                                                                        {/* Your Address, City, Password, and Confirm Password fields */}
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                            <FormControl sx={{ minWidth: 200, marginTop: '7%' }} size="small" fullWidth>
                                                                                <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>Select Product</InputLabel>
                                                                                <Select
                                                                                    labelId="Select-Product"
                                                                                    id="demo-select-small"
                                                                                    value={selectedProduct}
                                                                                    label="Select Product"
                                                                                    onChange={(e) => { setSelectedProduct(e.target.value); }}
                                                                                >
                                                                                    {products.map((product) => (
                                                                                        <MenuItem key={product.id} value={product}>
                                                                                            {product.name}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>

                                                                            <FormControl
                                                                                variant="outlined"
                                                                                sx={{ width: '100%', marginTop: '7%' }}
                                                                                size="small"
                                                                            >
                                                                                <TextField
                                                                                    id="datepicker"
                                                                                    label="Purchase Date"
                                                                                    variant="outlined"
                                                                                    value={purchaseDate}
                                                                                    onChange={handleDateChange1}
                                                                                    type="date" // Use type "date" for date picker
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        // Set placeholder value here
                                                                                        // min: new Date().toISOString().split('T')[0],
                                                                                    }}
                                                                                />
                                                                            </FormControl>

                                                                            <FormControl
                                                                                variant="outlined"
                                                                                sx={{ width: '100%', marginTop: '7%' }}
                                                                                size="small"
                                                                            >
                                                                                <TextField
                                                                                    id="datepicker"
                                                                                    label="Manufacturing Date"
                                                                                    variant="outlined"
                                                                                    value={manufacturingDate}
                                                                                    onChange={handleDateChange2}
                                                                                    type="date" // Use type "date" for date picker
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        // Set placeholder value here

                                                                                        // min: new Date().toISOString().split('T')[0],
                                                                                    }}
                                                                                />
                                                                            </FormControl>

                                                                            <FormControl
                                                                                variant="outlined"
                                                                                sx={{ width: '100%', marginTop: '7%' }}
                                                                                size="small"
                                                                            >
                                                                                <TextField
                                                                                    id="datepicker"
                                                                                    label="Installation Date"
                                                                                    variant="outlined"
                                                                                    value={installationDate}
                                                                                    onChange={handleDateChange3}
                                                                                    type="date" // Use type "date" for date picker
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                    }}
                                                                                    inputProps={{
                                                                                        // Set placeholder value here

                                                                                        // min: new Date().toISOString().split('T')[0],
                                                                                    }}
                                                                                />
                                                                            </FormControl>

                                                                            <TextField
                                                                                label="Warranty Period (In Months)"
                                                                                value={warrantyPeriod}
                                                                                sx={{ marginTop: '7%' }}
                                                                                onChange={(e) => setWarrantyPeriod(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                // style={{ padding: '7px', width: '250px' }}
                                                                                inputProps={{
                                                                                    onInput: (e) => {
                                                                                      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                                                    },
                                                                                  }}
                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <div style={{ marginBottom: '50px' }}>
                                                                    {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                                                                        Submit
                                                                    </Button>
                                                                    <Button onClick={handleClickClose2} style={{ float: 'right', color: 'red' }}>
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
                                                                            <Button
                                                                                type="submit"
                                                                                variant="contained"
                                                                                color="primary"
                                                                                style={{ float: 'right' }}
                                                                            >
                                                                                Submit
                                                                            </Button>
                                                                            <Button
                                                                                onClick={handleClickClose2}
                                                                                style={{ float: 'right', color: 'red', marginRight: '4%' }}
                                                                            >
                                                                                Close
                                                                            </Button>
                                                                        </>
                                                                    )}
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
                                                    <DialogTitle id="alert-dialog-title">{'Edit'}</DialogTitle>
                                                    <DialogContent>
                                                        <Container maxWidth="md">
                                                            {' '}
                                                            {/* Adjusted maxWidth for responsiveness */}
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
                                                                                        backgroundImage: selectedImage
                                                                                            ? `url(${selectedImage})`
                                                                                            : `url("/image1/images.jpg")`, // Use selected image or default image
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

                                                                    <Grid item xs={12} md={6}>
                                                                        {' '}
                                                                        {/* Adjusted the Grid layout for responsiveness */}
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'center',
                                                                                marginTop: '-8px',
                                                                            }}
                                                                        >
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
                                                                                onChange={(e) => setAreapin(e.target.value)}
                                                                                name="areaPin"
                                                                                fullWidth
                                                                                required
                                                                                // style={{ padding: '7px', width: '250px' }}
                                                                                sx={{ m: 1, width: '250px' }}
                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6}>
                                                                        {' '}
                                                                        {/* Adjusted the Grid layout for responsiveness */}
                                                                        {/* Right side fields */}
                                                                        {/* Your Address, City, Password, and Confirm Password fields */}
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'center',
                                                                                marginTop: '-8px',
                                                                            }}
                                                                        >
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
                                                                                    <InputLabel id="demo-select-small-label" style={{ color: 'black' }}>
                                                                                        Status
                                                                                    </InputLabel>
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

                                                                    <Button
                                                                        onClick={handleSaveClick}
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right' }}
                                                                    >
                                                                        submit
                                                                    </Button>

                                                                    <Button
                                                                        onClick={handleClickClose1}
                                                                        style={{ float: 'right', color: 'red', marginRight: '3%' }}
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </Container>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>

                                        <br />
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h6>Mail-Id:</h6>
                                                <h6>{user.email}</h6>
                                            </div>
                                            <div className="col-md-3">
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

                    <Box>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#007F6D' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab style={{ color: 'white' }} label="Products" value="1" />
                                    <Tab style={{ color: 'white' }} label="Complaints" value="2" />
                                    {/* <Tab label="Item Three" value="3" /> */}
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                <Grid item xs={12}>
                                    <Card>
                                        <Paper sx={{ width: '100%' }}>
                                            <TableContainer>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            {columnsCompt.map((column) => (
                                                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                                    {column.label}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rowsCompt === null || rowsCompt === undefined || rowsCompt.length === 0 ? (
                                                            <TableCell colSpan={columns.length}>
                                                                <Typography
                                                                    variant="p"
                                                                    component="div"
                                                                    style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                                                                >
                                                                    No Data Available
                                                                </Typography>
                                                            </TableCell>
                                                        ) : (
                                                            rowsCompt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                    {columnsCompt.map((column) => {
                                                                        const value =
                                                                            column.id === 'productCustomer' ? row[column.id][column.subId] : row[column.id];

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
                                                                                    <Button onClick={() => handleProductDetails(row)} variant="contained">
                                                                                        {' '}
                                                                                        Details{' '}
                                                                                    </Button>
                                                                                    <Dialog
                                                                                        open={openProductDetails}
                                                                                        onClose={handleClose}
                                                                                        aria-labelledby="alert-dialog-title"
                                                                                        aria-describedby="alert-dialog-description"
                                                                                        style={{ height: '100vh' }}
                                                                                        fullWidth
                                                                                        maxWidth="lg"
                                                                                    >
                                                                                        <div className="container-fluid" style={{ padding: '20px' }}>
                                                                                            <div className="row" style={{ textAlign: 'center' }}>
                                                                                                <h3 id="alert-dialog-title">Product Details</h3>
                                                                                            </div>
                                                                                            <br />
                                                                                            <div className="row">
                                                                                                <div className="col-md-4">
                                                                                                    <DialogContent textAlign="center">
                                                                                                        <img
                                                                                                            src={`${baseUrl}/resources/products/${productCustomerData.productId}/${productImages[0]}`}
                                                                                                            alt="product"
                                                                                                        />
                                                                                                        <div style={{ margin: 'auto', textAlign: 'center', padding: '10' }}>
                                                                                                            <button
                                                                                                                className="btn btn-primary"
                                                                                                                onClick={() =>
                                                                                                                    FileSaver.saveAs(
                                                                                                                        `${baseUrl}/resources/products/${productCustomerData.productId}/${productImages[0]}`,
                                                                                                                        `${productImages[0]}`
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                Download
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </DialogContent>
                                                                                                    <DialogContent>
                                                                                                        <img
                                                                                                            src={`${baseUrl}/resources/${productCustomerData.qrImageName}`}
                                                                                                            alt="product"
                                                                                                        />
                                                                                                        <div style={{ margin: 'auto', textAlign: 'center', padding: '10' }}>
                                                                                                            <button
                                                                                                                className="btn btn-success"
                                                                                                                onClick={() =>
                                                                                                                    FileSaver.saveAs(
                                                                                                                        `${baseUrl}/resources/${productCustomerData.qrImageName}`,
                                                                                                                        `${productCustomerData.qrImageName}`
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                Download
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </DialogContent>
                                                                                                </div>

                                                                                                <div className="col-md-8">
                                                                                                    <table style={{ width: '100%', lineHeight: '40px' }}>
                                                                                                        <tr>
                                                                                                            {console.log('product data:', productCustomerData)}
                                                                                                            <th>Product Name : </th>
                                                                                                            <td>{productCustomerData.productName}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Product Category : </th>
                                                                                                            <td>{productCustomerData.productCategoryName}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Product Id : </th>
                                                                                                            <td>{productCustomerData.productId}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Product Type : </th>
                                                                                                            <td>{productCustomerData.productType}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Serial No. :</th>
                                                                                                            <td>{productCustomerData.serialNo}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Warranty :</th>
                                                                                                            <td>{productCustomerData.warrantyPeriod}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Rating :</th>
                                                                                                            <td>{productCustomerData.rating}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Manufacturing Date :</th>
                                                                                                            <td>{productCustomerData.manufacturingDate}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Installation Date : </th>
                                                                                                            <td>{productCustomerData.installationDate}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>Dispatch Date :</th>
                                                                                                            <td>{productCustomerData.dispatchDate}</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <th>constructionType</th>
                                                                                                            <td>{productCustomerData.constructionType}</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
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
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={rowsCompt.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </Paper>
                                    </Card>
                                </Grid>
                            </TabPanel>

                            <TabPanel value="2">
                                <Item>
                                    <Card>
                                        <Paper sx={{ width: '100%' }}>
                                            <TableContainer sx={{ maxHeight: '100%' }}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                                    {column.label}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows === null || rows === undefined || rows.length === 0 ? (
                                                            <TableCell colSpan={columns.length}>
                                                                <Typography
                                                                    variant="p"
                                                                    component="div"
                                                                    style={{ textAlign: 'center', padding: '20px' }} // Adjust padding as needed
                                                                >
                                                                    No Data Available
                                                                </Typography>
                                                            </TableCell>
                                                        ) : (
                                                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                    {columns.map((column) => {
                                                                        const value =
                                                                            column.id === 'productCustomer' ? row[column.id][column.subId] : row[column.id];

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
                                                                                    <Button onClick={() => routeChange1(row.id)} variant="contained">
                                                                                        Details
                                                                                    </Button>
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
                                                                                    {value !== null ? formatDateTime(value) : 'Pending Assign'}
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

                                                                        console.log(column);
                                                                        if (column.id === 'button') {
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {/* view dialog box customerdetail */}

                                                                                    <Button onClick={() => routeChange2(row.id)} variant="contained">
                                                                                        {' '}
                                                                                        Details{' '}
                                                                                    </Button>
                                                                                    <Dialog
                                                                                        open={open}
                                                                                        onClose={handleClose}
                                                                                        aria-labelledby="alert-dialog-title"
                                                                                        aria-describedby="alert-dialog-description"
                                                                                    >
                                                                                        <DialogTitle id="alert-dialog-title">
                                                                                            {'View Details'}

                                                                                            <div>
                                                                                                {/* Add more input fields as needed */}
                                                                                                {/* <button style={{ marginLeft: '75%',color:'white',backgroundColor:'blue',width:'24%',height:'39px',borderRadius:'7px' }}  onClick={handleToggleEdit}>
                                                                                                            {isEditable ? 'Disable Editing' : ' Editing'}
                                                                                                        </button> */}
                                                                                            </div>
                                                                                        </DialogTitle>
                                                                                        <DialogContent>
                                                                                            <DialogContentText>
                                                                                                <div style={{ padding: '20px' }}>
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
                                                                                                                        {/* <Grid item xs={6}>



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






                                                                                                                            </Grid> */}
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
                                                                                            <Button
                                                                                                onClick={handleClose}
                                                                                                style={{ color: 'red', marginRight: '4%' }}
                                                                                            >
                                                                                                Close
                                                                                            </Button>
                                                                                            {isEditable ? (
                                                                                                <button
                                                                                                    type='submit'
                                                                                                    onClick={handleSaveClick}
                                                                                                    style={{
                                                                                                        width: '15%',
                                                                                                        marginRight: '4%',
                                                                                                        color: 'white',
                                                                                                        backgroundColor: 'blue',
                                                                                                        height: '35px',
                                                                                                        borderRadius: '7px',
                                                                                                    }}
                                                                                                >
                                                                                                    Save
                                                                                                </button>
                                                                                            ) : (
                                                                                                <button
                                                                                                    type='submit'
                                                                                                    onClick={handleEditClick}
                                                                                                    style={{
                                                                                                        width: '15%',
                                                                                                        marginRight: '4%',
                                                                                                        color: 'white',
                                                                                                        backgroundColor: 'blue',
                                                                                                        height: '35px',
                                                                                                        borderRadius: '7px',
                                                                                                    }}
                                                                                                >
                                                                                                    Edit
                                                                                                </button>
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
                                                            ))
                                                        )}
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
                            {/* <TabPanel value="3">Item Three</TabPanel> */}
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}
