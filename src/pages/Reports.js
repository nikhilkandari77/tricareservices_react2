

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
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import XLSX from 'sheetjs-style';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';
import Label from '../components/label/Label';
import baseUrl from '../utils/baseUrl';


import Iconify from '../components/iconify';



const columns = [
    { id: 'srno', label: 'Sr.No', minWidth: 55, align: 'center' },
    { id: 'priority', label: 'Priority', minWidth: 55, align: 'center' },
    { id: 'product', label: 'Products', minWidth: 85, align: 'center' },
    { id: 'problem', label: 'Problem', minWidth: 140, align: 'center' },
    { id: 'customer', label: 'Customer', minWidth: 100, align: 'center' },
    {
        id: 'complainttime',
        label: 'Complaint Time',
        minWidth: 140,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Estimatedenddate',
        label: 'Estimated End Date',
        minWidth: 140,
        align: 'center',


    },


    {
        id: 'status',
        label: 'Status',
        minWidth: 140,
        align: 'center',


    },

    // {
    //   id: 'button1',
    //   label: 'Action',
    //   minWidth: 140,
    //   align: 'center',
    //   // format: (value) => value.toFixed(2),
    // },
    // {
    //     id: 'button',
    //     label: 'Action',
    //     minWidth: 140,
    //     align: 'center',
    //     // format: (value) => value.toFixed(2),
    // },
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




export default function Reports() {
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
    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(true);

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

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };




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





    const routeChange = () => {
        window.location.href = "/dashboard/Reports";
    }






    // const routeChange = () => {
    //   window.location.href = "/dashboard/customerdetail";
    // }


    const routeChange4 = (id) => {



        // navigate("/dashboard/customerdetail/", { state: { userId: id } });


    };











    //   useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setLoading(true);
    //     fetch(`${baseUrl}/api/user/hasRole/2`, {
    //       method: 'GET',
    //       mode: 'cors',
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       },

    //     })

    //       .then(response => response.json())
    //       .then(json => {
    //         console.log("Fetched data:", json); // This line will print the data to the console
    //         // setUsers(json);
    //         setRows(json.data);

    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   }, []);

    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }




    const exportToExcel = () => {
        const fileName = `daily_report_${Date.now()}`;
        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        // Assuming you have an array of objects called 'searchItem'
        // Define an array of column IDs you want to keep
        const columnsToKeep = [
            'srno',
            'priority',
            'product',
            'problem',
            'customer',
            'complainttime',
            'Estimatedenddate',
            'status',
        ];

        // Filter the 'searchItem' array to keep only the desired columns
        const filteredData = searchItem.map(item => {
            const filteredItem = {};
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




    let sr = 0;

    const handleChangestate = (event) => {
        setState(event.target.value);
    };




    return (



        <div>
            <Grid container spacing={0} >
                <Box sx={{ flexGrow: 6 }}>
                    <AppBar style={{ backgroundColor: '#007F6D',borderRadius:'5px' }} position="static">
                        <Toolbar variant="dense">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                            >
                                Reports
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







                            {/* <Grid >
                            <Search> */}&nbsp;


                            {/* // </Search>

// </Grid> */}









                        </Toolbar>
                    </AppBar>
                </Box>











                <Grid item xs={12} style={{ marginTop: '3%' }}>



                   


                        <div className='container-fluid'>
                            <div className='row'>


                                <div className='col-md-3 col-sm-6'>



                                    <Card sx={{ minWidth: 175, height: 120, margin: '0 auto 20px', backgroundColor: '#3498DB ' }}>

                                        <CardContent>
                                            <Typography sx={{ fontSize: 20, color: 'white' }} color="text.secondary" gutterBottom>
                                                Total Complaints
                                            </Typography>

                                            <Typography sx={{ mb: 1.5, fontSize: 20, color: 'white' }} color="text.secondary">
                                                18
                                            </Typography>

                                        </CardContent>

                                    </Card>


                                </div>

                                <div className='col-md-3 col-sm-6'>



                                    <Card sx={{ minWidth: 175, height: 120, margin: '0 auto 20px', backgroundColor: '#C0392B' }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20, color: 'white' }} color="text.secondary" gutterBottom>
                                                Active
                                            </Typography>

                                            <Typography sx={{ mb: 1.5, fontSize: 20, color: 'white' }} color="text.secondary">
                                                5
                                            </Typography>

                                        </CardContent>

                                    </Card>


                                </div>

                                <div className='col-md-3 col-sm-6'>



                                    <Card sx={{ minWidth: 175, height: 120, margin: '0 auto 20px', backgroundColor: '#27AE60' }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20, color: 'white' }} color="text.secondary" gutterBottom>
                                                Resolve
                                            </Typography>

                                            <Typography sx={{ mb: 1.5, fontSize: 20, color: 'white' }} color="text.secondary">
                                                3
                                            </Typography>

                                        </CardContent>

                                    </Card>


                                </div>
                                <div className='col-md-3 col-sm-6'>



                                    <Card sx={{ minWidth: 175, height: 120, margin: '0 auto 20px', backgroundColor: '#2471A3' }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20, color: 'white' }} color="text.secondary" gutterBottom>
                                                Backlogs
                                            </Typography>

                                            <Typography sx={{ mb: 1.5, fontSize: 20, color: 'white' }} color="text.secondary">
                                                5
                                            </Typography>

                                        </CardContent>

                                    </Card>


                                </div>

                            </div>
                        </div>


                        <div className='container-fluid'>
                            <div className='row'>


                                <div className='col-md-3 col-sm-6'>


                                    <Card sx={{ minWidth: 175, height: 120, margin: '0 auto 20px', backgroundColor: '#BB8FCE' }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20, color: 'white' }} color="text.secondary" gutterBottom>
                                                Rejected
                                            </Typography>

                                            <Typography sx={{ mb: 1.5, fontSize: 20, color: 'white' }} color="text.secondary">
                                                5
                                            </Typography>

                                        </CardContent>

                                    </Card>



                                </div>
                            </div>
                        </div>









                        <Card style={{ marginTop: '5%' }}>


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



                                                            if (column.id === 'button') {
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        <Button onClick={() => routeChange4(row.id)} variant="contained"> Details </Button>

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


                    

                </Grid>












            </Grid>

        </div>
    );

}