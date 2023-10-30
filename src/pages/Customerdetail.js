import React, { useState, useEffect } from 'react';
import FileSaver from 'file-saver';

import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import { toast } from 'react-toastify';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import DetailsIcon from '@mui/icons-material/Details';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from '@mui/material/TableHead';
import UpdateIcon from '@mui/icons-material/Update';
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
    Input,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// import EditableInputs from './EditableInputs';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
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

import { Category, InfoSharp } from '@mui/icons-material';
import Iconify from '../components/iconify';
import baseUrl from '../utils/baseUrl';
import Label from '../components/label/Label';

const columnsCompt = [
    { id: 'sr', label: 'Sr.No', minWidth: 80, align: 'center' },
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
        label: ' Warranty Period (in month)',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'button',
        label: 'Actions',
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
    const [showPassword, setShowPassword] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [constructionType, setConstructionType] = useState('');
    const [rating, setRating] = useState('');
    const [dispatchDate, setDispatchDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [openUserImport, setOpenUserImport] = useState(false);
    const [installationDate, setInstallationDate] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [formData, setformData] = useState([]);
    const [excelFile, setExcelFile] = useState(null);
    const [refresh, setRefresh] = useState(false);

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

    const [isSubmitting, setIsSubmitting] = useState(false);





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
    const [showconfirmpassword, setShowconfirmpassword] = useState(false);



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
    const [openProductEdit, setOpenProductEdit] = useState(false);
    const [editRowData, setEditRowData] = useState(null);

    // const [isEditable, setIsEditable] = useState(false);

    // const [label, setLabel] = useState('');

    const handleProductDetails = (row) => {
        setProductCustomerData(row);
        // setProductsImages(row.productImageName.split(','));
        // console.log('jbhbjb', row.productImageName.split(','));
        setOpenProductDetails(true);
    };

    const handleProductEdit = (row) => {
        setEditRowData(row);

        setOpenProductEdit(true);
    }
    const handleChangeEditRowData = (e) => {
        setEditRowData({ ...editRowData, [e.target.name]: e.target.value });
    };

    const submitEditData = async (e) => {
        e.preventDefault();
        console.log("edit", editRowData);
        try {
            setBtnLoading(true); // Set loading to true when the submission starts

            const response = await fetch(`${baseUrl}/api/user/product-customer/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editRowData),
            });

            const data = await response.json();

            if (response.ok) {
                setUserOpenProduct(false);
                toast.success('Form submitted successfully');
                window.location.reload();
            } else {
                setMessage(data.message);
                toast.error('Something went wrong');
            }

            // Now you can close the form.
            setIsFormOpen(false);
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while submitting the form', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally {
            setBtnLoading(false); // Set loading back to false after submission is complete
        }

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
        resetpasswordproduct();
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
        resetpassword();


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
        navigate('/admin/task/details', { state: { taskId: id } });
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

        try {
            setBtnLoading(true); // Set loading to true when the submission starts

            const response = await fetch(`${baseUrl}/api/user/product-customer/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: requestBody,
            });

            const data = await response.json();

            if (response.ok) {
                setUserOpenProduct(false);
                toast.success('Form submitted successfully');
                window.location.reload();
            } else {
                setMessage(data.message);
                toast.error('Something went wrong');
            }

            console.log('Form data submitted:', formData1);
            // Now you can close the form.
            setIsFormOpen(false);
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while submitting the form', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally {
            setBtnLoading(false); // Set loading back to false after submission is complete
        }
    };

    const handleDeleteOption = async (row) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this assigned product?");

        if (!isConfirmed) {
            // User canceled the deletion
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/api/user/product-customer/${row.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`

                }
            });

            if (response.ok) {
                console.log('Product Deleted successfully');
                toast.success('Product deleted successfully'); // Display success toast
                setRefresh((prevRefresh) => !prevRefresh);
            } else {
                console.error('operation not allowed', response);
                toast.error('Operation not allowed'); // Display error toast
            }
        } catch (error) {
            console.error('Error while updating product:', error);
            toast.error('Error while updating product'); // Display error toast
        }
    }
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
    }, [name, contact, email, areaPin, address, city, state, emailError, passwordError, contactError, refresh]);

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

        try {
            // Set loading to true when the submission starts
            setBtnLoading(true);
            const formData = {
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
                toast.success('Updated successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                window.location.reload();
            } else {
                toast.error(data.message || 'An error occurred', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            console.log('Form data submitted:', formData);
            // Now you can close the form.
            setIsFormOpen(false);
            setBtnLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while submitting the form', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally {
            setLoading(false); // Set loading back to false after submission is complete
        }
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
                setRowsCompt(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
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
                setRows(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
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
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                console.log('Fetched data:', json.data);
                setUser(json.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
                // You can handle the error state or display an error message to the user
            })
            .finally(() => {
                setLoading(false);
            });
        handleChange5();
        handleChange6();
        getAllProductCategory();
    }, [refresh]);

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

        navigate('/admin/task/details', { state: { taskId: id } });
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


    const resetpassword = (e) => {

        setConfirmpassword(null);
        setPassword(null);

    }


    const handleExcelFileSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("excelSheet", excelFile[0]);
        formData.append("customerId", user.id);
        try {
            setBtnLoading(true); // Set loading to true when the submission starts
            const response = await fetch(`${baseUrl}/api/user/product-customer/import/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData,
            })
                .catch((e) => toast.error(e))
                .finally(() => {
                    setLoading(false);
                });

            if (response.ok) {
                console.log('Product added successfully');
                setOpenUserImport(false);
                toast.success('Product added successfully'); // Display success toast
                setRefresh(true);
            } else {
                const errorMessage = await response.text().then(text => JSON.parse(text)); // Extract backend error message
                console.error('Invalid product data format', errorMessage);
                toast.error(`Invalid product data format: ${errorMessage.message}`);
            }
        } catch (error) {
            console.error('Error while adding products:', error);
            toast.error('Error while adding products'); // Display error toast
        } finally {
            setBtnLoading(false); // Set loading to true when the submission starts
        }
    }







    // const handleSubmit4 = async () => {
    //     try {
    //         setBtnLoading(true); // Set loading to true when the submission starts

    //         if (password !== confirmpassword) {
    //             // Set an error message and return

    //             toast.error('Passwords do not match');
    //             return;
    //         }

    //         if (password === '' || password.length < 6) {
    //             // Set an error message for password validation

    //             toast.error('Password must be at least 6 characters long');
    //             return;
    //         }

    //         // Assuming updateUser is an async function
    //         await updateUser();

    //         // After submission is complete (success), set loading back to false
    //         setBtnLoading(false);

    //         setIsFormOpen(false);
    //     } catch (error) {
    //         // Handle errors if needed
    //         setBtnLoading(false);
    //         // setLoading(false); // Set loading to false in case of errors
    //         console.error('Error:', error); // Log the error
    //         // Optionally, you can display an error message or perform other error handling here
    //         toast.error('An error occurred during submission');
    //     }
    // };

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {

        setShowconfirmpassword(!showconfirmpassword);
    };



    const resetpasswordproduct = (e) => {

        setCategory('');
        setProductType('');
        setSerialNo('');
        setConstructionType('');
        setRating('');
        setDispatchDate('');
        setSelectedProduct('');
        setPurchaseDate('');
        setManufacturingDate('');
        setInstallationDate('');
        setWarrantyPeriod('');





    }











    return (
        <div className="container">

            <div className="row">

                <div className="col-md-12">
                    <Box>
                        <AppBar style={{ backgroundColor: '#007F6D', padding: '1vh', borderRadius: '4px' }} position="static">


                            <Toolbar>


                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: '3', sm: 'block' } }}>
                                    <div className="container emp-profile">
                                        <br />
                                        <div className="row">
                                            <div className="col-md-3">


                                                <div className="profile-img">
                                                    <img
                                                        style={{ width: '8rem', height: '8rem', borderRadius: '100px' }}
                                                        src="/image1/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail 1.png"
                                                        alt="customer"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="profile-head">
                                                    <br />
                                                    <div style={{ overflowWrap: 'break-word', maxWidth: "22rem" }}>
                                                        <h5>{user.name}</h5><br />

                                                        <h6 style={{ marginTop: '-6%' }}>Address: {user.address}</h6>
                                                        <h6>City: {user.city}</h6>
                                                        <h6>Area pin: {user.areaPin}</h6>
                                                        <h6>State: {user.state}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <br />


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
                                                            <form >
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
                                                                                inputProps={{ maxLength: 15 }}
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
                                                <br />
                                                <br />
                                                <div>

                                                    <Button
                                                        onClick={() => setOpenUserImport(true)}
                                                        variant="contained"
                                                        style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                                                    >
                                                        Import Products
                                                    </Button>
                                                </div>
                                                <Dialog
                                                    open={openUserImport}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    style={{ height: 'auto', maxWidth: '100%' }} // Adjusted height and maxWidth for responsiveness
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Import user form excel file"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <form onSubmit={handleExcelFileSubmit}>
                                                            <Container maxWidth="md">
                                                                <InputLabel id="products-images">Assign products (.xlsx)</InputLabel>
                                                                <Input
                                                                    type="file"
                                                                    onChange={(e) => setExcelFile(Array.from(e.target.files))}
                                                                    id="products-images"
                                                                    inputProps={{ accept: ['.xlsx'] }}
                                                                    required
                                                                />
                                                            </Container><br />
                                                            <div style={{ textAlign: 'center' }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type='submit'
                                                                    style={{ marginTop: '20px', alignItems: 'center' }}
                                                                    disabled={btnLoading} // Disable the button when loading is true
                                                                >
                                                                    {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Upload Excel File'}
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </DialogContent>
                                                    <div style={{ textAlign: 'right', margin: '20px' }}>
                                                        <Button
                                                            onClick={() => setOpenUserImport(false)}
                                                            style={{ color: 'red' }}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>

                                                </Dialog>


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
                                                                                    required

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
                                                                                inputProps={{ maxLength: 50 }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />
                                                                            <TextField
                                                                                label="Serial No"
                                                                                value={serialNo}
                                                                                onChange={(e) => setSerialNo(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                                inputProps={{ maxLength: 50 }}
                                                                            />
                                                                            <TextField
                                                                                label="Construction Type"
                                                                                value={constructionType}
                                                                                onChange={(e) => setConstructionType(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                                inputProps={{ maxLength: 50 }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />
                                                                            <TextField
                                                                                label="Rating"
                                                                                value={rating}
                                                                                onChange={(e) => setRating(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                style={{ marginTop: '7%' }}
                                                                                inputProps={{ maxLength: 50 }}
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
                                                                                    required
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
                                                                                    required
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
                                                                                    required
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
                                                                                    required
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
                                                                                    required
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
                                                                                label="Warranty (In month)"
                                                                                value={warrantyPeriod}
                                                                                sx={{ marginTop: '7%' }}
                                                                                onChange={(e) => setWarrantyPeriod(e.target.value)}
                                                                                fullWidth
                                                                                required
                                                                                inputProps={{ maxLength: 2 }}
                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <div style={{}}>
                                                                    {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                                                                        Submit
                                                                    </Button>
                                                                    <Button onClick={handleClickClose2} style={{ float: 'right', color: 'red' }}>
                                                                        Close
                                                                    </Button> */}

                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right', }}
                                                                        disabled={btnLoading} // Disable the button when loading is true
                                                                    >
                                                                        {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                                    </Button>

                                                                    <Button
                                                                        onClick={handleClickClose2}
                                                                        style={{ float: 'right', color: 'red', marginRight: '4%' }}
                                                                    >
                                                                        Close
                                                                    </Button><br />


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
                                                                            <InputLabel htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'block' }}>
                                                                                <Button
                                                                                    component="span"
                                                                                    style={{
                                                                                        width: 90,
                                                                                        height: 82,
                                                                                        cursor: 'pointer',
                                                                                        backgroundSize: 'cover',
                                                                                        backgroundPosition: 'center',
                                                                                        backgroundImage: selectedImage
                                                                                            ? `url(${selectedImage})`
                                                                                            : `url("/image1/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail 1.png" )`, // Use selected image or default image
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
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 50) {
                                                                                        setName(e.target.value);
                                                                                    }
                                                                                }}
                                                                                fullWidth
                                                                                required
                                                                                inputProps={{ maxLength: 50 }}
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
                                                                                label="Area Pin"
                                                                                value={areaPin}
                                                                                onChange={(e) => {
                                                                                    if (e.target.value.length <= 6) {
                                                                                        setAreapin(e.target.value);
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
                                                                                    if (e.target.value.length <= 20) {
                                                                                        setCity(e.target.value);
                                                                                    }
                                                                                }}
                                                                                name="city"
                                                                                fullWidth
                                                                                required
                                                                                sx={{ m: 1, width: '250px' }}
                                                                                inputProps={{ maxLength: 20 }}
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

                                                                            <div>
                                                                                {/* <FormControl sx={{ minWidth: 250, marginTop: '5%' }} size="small" fullWidth>
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
                                                                                </FormControl> */}
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                                <div >


                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ float: 'right' }}
                                                                        disabled={btnLoading} // Disable the button when loading is true
                                                                    >
                                                                        {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                                    </Button>


                                                                    <Button
                                                                        onClick={handleClickClose1}
                                                                        style={{ float: 'right', color: 'red', marginRight: '3%' }}
                                                                    >
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

                                        <div className="row">
                                            <div className="col-md-3">

                                                <div className="profile-head">
                                                    <div style={{ overflowWrap: 'break-word', maxWidth: "10rem" }}>
                                                        <h6>Mail-Id:</h6>
                                                        <h6>{user.email}</h6>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                                <div className="profile-head">
                                                    <div style={{ overflowWrap: 'break-word', maxWidth: "10rem" }}>
                                                        <h6>Contact:</h6>
                                                        <h6>{user.contact}</h6>
                                                    </div>
                                                </div>
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
                                <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor="white" textColor="inherit">
                                    <Tab style={{ color: 'white' }} label="Products" value="1" />
                                    <Tab style={{ color: 'white' }} label="Complaints" value="2" />
                                    {/* Add more tabs as needed */}
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
                                                                        if (column.id === 'purchaseDate') {
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    {value === null ? '' : new Date(value).toLocaleDateString('en-GB')}
                                                                                </TableCell>
                                                                            );
                                                                        }




                                                                        if (column.id === 'button') {
                                                                            const value2 = productCustomerData.productImageList;
                                                                            return (
                                                                                <TableCell key={column.id} align={column.align}>
                                                                                    <Button onClick={() => handleProductDetails(row)} title="Details" >
                                                                                        <DetailsIcon color="primary" />
                                                                                    </Button>
                                                                                    <Button onClick={() => handleProductEdit(row)} title="Edit" >
                                                                                        <UpdateIcon color='info' />
                                                                                    </Button>
                                                                                    <Button onClick={() => handleDeleteOption(row)} title="Delete"><DeleteIcon color='error' /></Button>




                                                                                    <Dialog
                                                                                        open={openProductEdit}
                                                                                        onClose={() => setOpenProductEdit(false)}
                                                                                        aria-labelledby="alert-dialog-title"
                                                                                        aria-describedby="alert-dialog-description"
                                                                                        style={{ height: '100vh' }}
                                                                                        fullWidth
                                                                                        maxWidth="md"
                                                                                    >
                                                                                        <div className="container-fluid" style={{ padding: '20px' }}>
                                                                                            <div className="row" style={{ textAlign: 'center' }}>
                                                                                                <h3 id="alert-dialog-title">Edit Product Details</h3>
                                                                                            </div>
                                                                                            <br />
                                                                                            {
                                                                                                editRowData === null ? "" :
                                                                                                    <div className="row">


                                                                                                        <div className="col-md-12">


                                                                                                            <form onSubmit={submitEditData}>
                                                                                                                <Grid container spacing={3}>
                                                                                                                    {/* Left side fields */}
                                                                                                                    {/* Your Name, Contact No, Email, and Area pin fields */}

                                                                                                                    <Grid item xs={12} md={6}>
                                                                                                                        {' '}
                                                                                                                        {/* Adjusted the Grid layout for responsiveness */}
                                                                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                                                                                                            <TextField
                                                                                                                                label="Product Type"
                                                                                                                                value={editRowData.productType || ""}
                                                                                                                                name='productType'
                                                                                                                                onChange={handleChangeEditRowData}
                                                                                                                                fullWidth
                                                                                                                                required
                                                                                                                                style={{ marginTop: '7%' }}
                                                                                                                                inputProps={{ maxLength: 50 }}
                                                                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                                                                            />
                                                                                                                            <TextField
                                                                                                                                label="Serial No"
                                                                                                                                value={editRowData.serialNo}
                                                                                                                                name='serialNo'
                                                                                                                                onChange={handleChangeEditRowData}
                                                                                                                                fullWidth
                                                                                                                                required
                                                                                                                                style={{ marginTop: '7%' }}
                                                                                                                                inputProps={{ maxLength: 50 }}
                                                                                                                            />
                                                                                                                            <TextField
                                                                                                                                label="Construction Type"
                                                                                                                                value={editRowData.constructionType}
                                                                                                                                onChange={handleChangeEditRowData}
                                                                                                                                name='constructionType'
                                                                                                                                fullWidth
                                                                                                                                required
                                                                                                                                style={{ marginTop: '7%' }}
                                                                                                                                inputProps={{ maxLength: 50 }}
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
                                                                                                                                    required
                                                                                                                                    name='dispatchDate'
                                                                                                                                    value={editRowData.dispatchDate}
                                                                                                                                    onChange={handleChangeEditRowData}
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





                                                                                                                            <FormControl
                                                                                                                                variant="outlined"
                                                                                                                                sx={{ width: '100%', marginTop: '7%' }}
                                                                                                                                size="small"
                                                                                                                            >
                                                                                                                                <TextField
                                                                                                                                    id="datepicker"
                                                                                                                                    label="Purchase Date"
                                                                                                                                    variant="outlined"
                                                                                                                                    required
                                                                                                                                    value={editRowData.purchaseDate}
                                                                                                                                    name='purchaseDate'
                                                                                                                                    onChange={handleChangeEditRowData}
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
                                                                                                                                    required
                                                                                                                                    name='manufacturingDate'
                                                                                                                                    value={editRowData.manufacturingDate}
                                                                                                                                    onChange={handleChangeEditRowData}
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
                                                                                                                                    required
                                                                                                                                    name='installationDate'
                                                                                                                                    value={editRowData.installationDate}
                                                                                                                                    onChange={handleChangeEditRowData}
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
                                                                                                                                label="Warranty (In month)"
                                                                                                                                value={editRowData.warrantyPeriod}
                                                                                                                                sx={{ marginTop: '7%' }}
                                                                                                                                name='warrantyPeriod'
                                                                                                                                onChange={handleChangeEditRowData}
                                                                                                                                fullWidth
                                                                                                                                required
                                                                                                                                inputProps={{ maxLength: 2 }}
                                                                                                                            // style={{ padding: '7px', width: '250px' }}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    </Grid>
                                                                                                                </Grid>
                                                                                                            <div><br/>
                                                                                                            <Button
                                                                                                                type="submit"
                                                                                                                variant="contained"
                                                                                                                color="primary"
                                                                                                                style={{ float: 'right', }}
                                                                                                                disabled={btnLoading} // Disable the button when loading is true
                                                                                                            >
                                                                                                                {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                                                                            </Button>

                                                                                                            <Button
                                                                                                                className="btn btn-dangerr"
                                                                                                                onClick={() => setOpenProductEdit(false)} // Attach the onClick handler to close the dialog
                                                                                                                style={{ width: '8%', color: 'red' }}

                                                                                                            >
                                                                                                                Close
                                                                                                            </Button>
                                                                                                            </div>

                                                                                                            </form>

                                                                                                        </div>


                                                                                                    </div>
                                                                                            }

                                                                                        </div>
                                                                                    </Dialog>

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
                                                                                                        <div style={{ display: "flex", margin: "auto", textAlign: "center", alignItems: "center" }}>
                                                                                                            {productCustomerData.productImageList === undefined || productCustomerData.productImageList === null || productCustomerData.productImageList.length === 0 ? (
                                                                                                                <img style={{ height: "10vh", margin: "auto" }} src="/products/logo.png" alt='product' />
                                                                                                            ) : (
                                                                                                                // <LazyLoad height={100} offset={100}>
                                                                                                                <img  loading="lazy" src={`${baseUrl}${productCustomerData.productImageList[0]}`} alt='product' />
                                                                                                            )}
                                                                                                        </div>
                                                                                                        <div style={{ margin: 'auto', textAlign: 'center', padding: '10' }}>
                                                                                                            {/* <button
                                                                                                                className="btn btn-primary"
                                                                                                                onClick={() =>
                                                                                                                    FileSaver.saveAs(
                                                                                                                        `${baseUrl}/resources/products/${productCustomerData.productId}/${productImages[0]}`,
                                                                                                                        `${productImages[0]}`
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                Download
                                                                                                            </button> */}
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
                                                                                                    <table style={{ width: '100%', lineHeight: '30px' }}>
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
                                                                                                            <th>Construction Type :</th>
                                                                                                            <td>{productCustomerData.constructionType}</td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </div>

                                                                                                <div className="row" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                                                                                                    <button
                                                                                                        className="btn btn-dangerr"
                                                                                                        onClick={handleClose} // Attach the onClick handler to close the dialog
                                                                                                        style={{ width: '8%', color: 'red' }}

                                                                                                    >
                                                                                                        Close
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
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

                                <Card>
                                    {/* <Paper sx={{ width: '100%' }}> */}
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
                                                                    <TableCell key={column.id} align={column.align} style={{ overflowWrap: 'break-word', maxWidth: '10rem' }}>
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
                                    {/* </Paper> */}
                                </Card>

                            </TabPanel>
                            {/* <TabPanel value="3">Item Three</TabPanel> */}
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}
