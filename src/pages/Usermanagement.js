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
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, Tooltip, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Switch from '@mui/material/Switch';
import { id } from 'date-fns/locale';
import CircularProgress from '@mui/material/CircularProgress';
import XLSX from 'sheetjs-style';
import Label from '../components/label/Label';




import baseUrl from '../utils/baseUrl';
import Iconify from '../components/iconify';




const columns = [
    { id: 'sr', label: 'Sr.No', minWidth: 55, align: 'center' },
    { id: 'name', label: 'Customer Name', minWidth: 85, align: 'center' },
    { id: 'city', label: 'City', minWidth: 140, align: 'center' },
    { id: 'areaPin', label: 'Area Pin', minWidth: 100, align: 'center' },
    {
        id: 'contact',
        label: 'Contact No',
        minWidth: 140,
        align: 'center',

    },
    {
        id: 'email',
        label: 'Email Id',
        minWidth: 140,
        align: 'center',


    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 140,
        align: 'center',


    },

    {
        id: 'button1',
        label: 'Action',
        minWidth: 70,
        align: 'center',

        // format: (value) => value.toFixed(2),
    },




    {
        id: 'button',
        label: 'Action',
        minWidth: 140,
        align: 'center',

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


export default function Usermanagement() {


    const [usermanagement, setUsermanagement] = useState('');



    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactno, setContactno] = useState('');
    const [search, setSearch] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [areaPin, setAreaPin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    // const userId = location.state?.userId;

    const [password, setPassword] = useState('');
    // const [confirmpassword, setConfirmpassword] = useState('');
    const [excelFile, setExcelFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const [role, setRole] = React.useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedrole, setSelectedRole] = useState([1]);
    const [addselectedrole, setAddselectedrole] = useState([]);
    const [roleId, setRoleId] = useState(null);
    const [switchStates, setSwitchStates] = useState({});
    // const [userId, setuserId] = useState('');
    const [userId, setUserId] = useState(null); // Initialize with null or a default value
    const [isActive, setIsActive] = useState(false); // Initialize with false or a default value
    const [row, setRow] = useState('');

    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [designation, setDesignation] = useState('');
    const [openUserImport, setOpenUserImport] = useState(false);




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
    })


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [openUser, setUserOpen] = React.useState(false);
    const [openUserImportfile, setOpenUserImportfile] = React.useState(false);
    const [openUserimport, setUserOpenimport] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseimportexcle = () => {
        setOpenUserImport(false);
    };
    const handleClickOpenUserPopup = () => {
        setUserOpen(true);
        setUserOpenimport(true);

    }

    const handleClickOpenUserPopupimportexcle = () => {

        setUserOpenimport(true);

    }
    const handleClickCloseimportexcle = () => {
        setUserOpenimport(false);

    }


    const handleClickClose1 = () => {
        setUserOpen(false);
        resetpassword();
    }
    const handleClickCloseimport = () => {
        setOpenUserImportfile(false);

    }
    const handleClickOpen1 = () => {
        setUserOpen(false);
    }






    // const handleSwitchChange = (rowId) => {
    //     // Update the row's data based on rowId
    //     const updatedRows = rows.map((row) =>
    //         row.id === rowId ? { ...row, status: !row.status } : row // Fixed the typo here: row.staus -> row.status
    //     );
    //     // You can update the state or perform further actions here
    //     console.log(updatedRows);
    //     setRows(updatedRows);

    //     // Extract the updated status
    //     const updatedStatus = updatedRows.find((row) => row.id === rowId).status;

    //     handleChangeupdatetable(updatedStatus, rowId); // Pass the updated status and rowId
    // };

    const handleSwitchChange = async (rowId) => {
        // Update the row's data based on rowId
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, status: !row.status } : row
        );

        // Update the state and set loading to true

        setRows(updatedRows);
        setIsLoading({ ...isLoading, [rowId]: true });

        try {
            const { status } = updatedRows.find((row) => row.id === rowId);
            await handleChangeupdatetable(status, rowId);
        } catch (error) {
            // Handle errors here
        } finally {
            // Reset loading state when the API request is complete (success or failure)
            setIsLoading({ ...isLoading, [rowId]: false });
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

    const handleChangestate = (event) => {
        setState(event.target.value);
    };









    const handleChange = (event) => {
        setSelectedRole(event.target.value);
        // setAddselectedrole(event.target.value);
        fetchUserData(event.target.value);
        console.log(event.target.value);


    };
    const handleChangeaddrole = (event) => {

        setAddselectedrole(event.target.value);
        // fetchUserData(event.target.value);
        console.log(event.target.value);
        setRoleId(event.target.value);

    };



    const getRole = () => {
        const token = localStorage.getItem('token');

        fetch(`${baseUrl}/api/user/role/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })

            .then(response => response.json())
            .then(json => {
                console.log("product data:", json.data); // This line will print the data to the console
                setRole(json.data);

            })
    }



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
            designation,
            address,
            role: {
                id: addselectedrole,
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
                toast.error('sorry! already exist user id & email id');
                setMessage(data.message);

            }
            setBtnLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);

            window.alert('An error occurred while submitting the form.');
            // Handle the error here, such as displaying an alert or setting an error state
            setMessage('An error occurred while submitting the form.');
        }

        console.log('Form data submitted:', formData);
        // Now you can close the form.
        setIsFormOpen(false);
    };


    const routeChange = () => {
        window.location.href = "/dashboard/usermanagement";

    }

    // const routeChange4 = (id) => { 



    //     navigate("/dashboard/customerdetail/", { state: { userId: id } });
    //     navigate("/dashboard/Engineersdetail/", { state: { userId: id } });
    //     navigate("/dashboard/Adminpage/", { state: { userId: id } });


    // }

    const routeChange4 = (id, roleId) => {
        console.log("Received id:", id);
        if (roleId === 1) {
            // If id is equal to 1, navigate to customerdetail
            navigate("/dashboard/Admin/", { state: { userId: id } });

        } else if (roleId === 2) {
            // If id is equal to 2, navigate to Engineersdetail
            navigate("/dashboard/customerdetail/", { state: { userId: id } });

        } else if (roleId === 3) {
            // If id is equal to 3, navigate to Adminpage
            navigate("/dashboard/Engineersdetail/", { state: { userId: id } });

        } else {
            // Handle other cases or provide a default route
            navigate("/dashboard/default/", { state: { userId: id } });
        }
    }




    useEffect(() => {
        getRole();
        fetchUserData(1);


        // handleChangeupdatetable();

    }, [open]);





    const handleExcelFileSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("excelSheet", excelFile[0]);
        try {
            const response = await fetch(`${baseUrl}/api/user/import/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`

                },

                body: formData,
            }).finally(() => {
                setLoading(false);
            });

            if (response.ok) {
                console.log('Users added successfully');
                setOpenUserImport(false);
                toast.success('Users added successfully'); // Display success toast
            } else {
                console.error('Failed to add users');
                toast.error('Failed to add users'); // Display error toast
            }
        } catch (error) {
            console.error('Error while adding users:', error);
            toast.error('Error while adding users'); // Display error toast
        }
    }




    const fetchUserData = (roleId) => {
        const token = localStorage.getItem('token');


        console.log("has role", roleId)
        setLoading(true);
        fetch(`${baseUrl}/api/user/hasRole/${roleId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Fetched data:", json.data);
                setRows(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <div>loading...</div>;

    }



    const handleChangeupdatetable = async (status, userid) => {
        // e.preventDefault();

        const token = localStorage.getItem('token');

        // Set userId and status based on your logic
        const isActive = status; // For example, determine the status based on some condition
        const userId = userid; // Replace with the actual user ID

        const formData = {
            id: userId,
            status: isActive ? 1 : 0,
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
            toast.success('Updated successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });

        } else {
            toast.error(data.message || 'An error occurred', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        console.log('Form data submitted:', formData);
        // Now you can close the form.
        setIsFormOpen(false);
    };



    const exportToExcel = () => {
        const fileName = `usermanagement_data_${Date.now()}`; // Updated filename format
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        // Assuming you have an array of objects called 'searchItem'
        // Define an array of column IDs you want to keep
        const columnsToKeep = [
            'name',
            'city',
            'areaPin',
            'contact',
            'email',
            'status',
        ]; // Removed 'srno' column as we will add it manually

        // Add a serial number column to the 'filteredData' array
        const filteredData = searchItem.map((item, index) => {
            const filteredItem = { srno: index + 1 }; // Add serial number
            columnsToKeep.forEach(column => {
                filteredItem[column] = item[column];
            });
            return filteredItem;
        });

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'data');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName + fileExtension);

        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };



    const handleDownloadExcel = () => {





    }

    const handleCloseImportExcel = () => {
        setOpenUserImport(false);
    };






    const label = { inputProps: { 'aria-label': 'Size switch demo' } };


    let sr = 0;

    const handleChange2 = (event) => {

        setRole(event.target.value);
    }


    const resetpassword = (e) => {


        setPassword('');
        setName('');
        setContact('');
        setEmail('');
        setAddress('');
        setAreaPin('');
        setCity('');
        setState('');
        setAddselectedrole('');
        // setConfirmpassword('');

    }














    return (

        <div>
            <Grid container spacing={0} >
                <Box sx={{ flexGrow: 6 }}>
                    <AppBar style={{ backgroundColor: '#007F6D', borderRadius: '5px' }} position="static">
                        <Toolbar variant="dense">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                User Management
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

                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    {/* <InputLabel id="demo-select-small-label">Role</InputLabel> */}
                                    <Select

                                        id="demo-select-small"
                                        value={selectedrole}
                                        onChange={handleChange}
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        {/* <MenuItem value="">
                                            Select Role
                                        </MenuItem> */}
                                        {role.map((getRole) => (
                                            <MenuItem value={getRole.id} key={getRole.id}>
                                                {getRole.name.substring(5)}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>


                            </div>

                            &nbsp;
                            <div>
                                <Button className='responsive-button' onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black', }} >
                                    <Iconify icon="eva:plus-fill" />
                                </Button>
                            </div>

                            <Tooltip title="Excel Import">
                                <Button
                                    variant="contained"
                                    onClick={() => setOpenUserImport(true)}
                                    color="primary"
                                    style={{ cursor: 'pointer', fontSize: 14, marginLeft: '3%', textAlign: 'center' }}
                                >
                                    Import
                                </Button>
                            </Tooltip>

                            <Dialog
                                open={openUserImport}
                                onClose={handleCloseimportexcle}
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
                                            <InputLabel id="products-images">Import Users(.xlsx)</InputLabel>
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
                                            >
                                                Upload Excel File
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






















                            <Tooltip title="Excel Export">
                                <Button
                                    variant="contained"
                                    onClick={exportToExcel}
                                    color="primary"
                                    style={{ cursor: 'pointer', fontSize: 14, marginLeft: '3%' }}
                                >
                                    Export
                                </Button>
                            </Tooltip>


                            <Dialog
                                open={openUser}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                style={{ height: 'auto', maxWidth: '100%' }} // Adjusted height and maxWidth for responsiveness
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Add User"}
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
                                                                    width: 90,
                                                                    height: 85,
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

                                                        <div>

                                                            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small-label"
                                                                    id="demo-select-small"
                                                                    value={addselectedrole}
                                                                    label="Role"
                                                                    onChange={handleChangeaddrole}
                                                                    required
                                                                    style={{ backgroundColor: 'white' }}
                                                                >
                                                                    {/* <MenuItem value="">
                                                                        Select Role
                                                                    </MenuItem> */}
                                                                    {role.map((getRole) => (
                                                                        <MenuItem value={getRole.id} key={getRole.id}>
                                                                            {getRole.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>




                                                        </div>



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


                                                        <div>
                                                            {roleId === 3 ? (
                                                                <TextField
                                                                    label="Skill"
                                                                    value={designation}
                                                                    onChange={(e) => setDesignation(e.target.value)}
                                                                    fullWidth
                                                                    required
                                                                    sx={{ m: 1, width: '250px' }}
                                                                    inputProps={{ maxLength: 20 }}
                                                                />
                                                            ) : null}
                                                        </div>









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
                                            <div style={{ marginBottom: '5%' }}>
                                                {/* <Button type="submit" variant="contained" color="primary" style={{ float: 'right', marginRight: '-5px' }}>
                          Submit
                        </Button>
                        <Button onClick={handleClickClose1} style={{ float: 'right', color: 'red' }}>
                          Close
                        </Button> */}


                                                <Button

                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ float: 'right' }}
                                                    disabled={btnLoading} // Disable the button when loading is true
                                                >
                                                    {btnLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                                </Button>

                                                <Button type='button' onClick={handleClickClose1} style={{ float: 'right', color: 'red', marginRight: '4%' }}>
                                                    Close
                                                </Button>



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



                <Grid item xs={12} style={{ marginTop: '2%' }}>

                    <Card >

                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ height: '65vh' }}>
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
                                        {rows.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={columns.length}>
                                                    <Typography
                                                        variant="body1"
                                                        component="div"
                                                        style={{ textAlign: 'center', padding: '20px' }}
                                                    >
                                                        No Data Available
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            searchItem
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


                                                            if (column.id === 'status') {
                                                                let labelColor;
                                                                let displayValue;

                                                                if (value === true) {
                                                                    labelColor = 'success';
                                                                    displayValue = 'Active';
                                                                } else {
                                                                    labelColor = 'error';
                                                                    displayValue = 'Disabled';
                                                                }

                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        <Label color={labelColor}>{displayValue}</Label>
                                                                    </TableCell>
                                                                );
                                                            }



                                                            if (column.id === 'button1') {
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>


                                                                        {/* <Switch
                                                                                checked={row.status}
                                                                                onChange={() => handleSwitchChange(row.id)}
                                                                                disabled={isLoading} // Disable the button when loading is true
                                                                            />
                                                                            {isLoading && <CircularProgress size={20} />} */}

                                                                        <div key={row.id}>
                                                                            {!isLoading[row.id] && (
                                                                                <Switch
                                                                                    checked={row.status}
                                                                                    onChange={() => handleSwitchChange(row.id)}
                                                                                />
                                                                            )}
                                                                            {isLoading[row.id] && (
                                                                                <CircularProgress size={24} color="secondary" />
                                                                            )}
                                                                        </div>

                                                                    </TableCell>
                                                                );
                                                            }


                                                            if (column.id === 'button') {
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        <Button onClick={() => routeChange4(row.id, row.role.id)} variant="contained"> Details </Button>
                                                                        <Dialog
                                                                            open={open}
                                                                            onClose={handleClose}
                                                                            aria-labelledby="alert-dialog-title"
                                                                            aria-describedby="alert-dialog-description"
                                                                        >
                                                                            {/* Dialog content */}
                                                                            {/* ... */}
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
                        </Paper>

                    </Card>



                </Grid>


            </Grid>

        </div>
    );

}