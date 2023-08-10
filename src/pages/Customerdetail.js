import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';


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



const columnsCompt = [
    { id: 'productName', label: 'Product Name', minWidth: 85 },
    { id: 'productType', label: 'Product Type', minWidth: 140 },
    { id: 'serialNo', label: 'Serial No', minWidth: 100 },
    { id: 'constructionType', label: 'Construction Type', minWidth: 100 },
    { id: 'purchaseDate', label: 'Purchase Date', minWidth: 100 },
    {
        id: 'manufacturingDate',
        label: 'Manufacturing Date',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'warrantyPeriod',
        label: ' Warranty Period',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'button',
        label: 'Details',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toFixed(2),
    },
];


const columns = [
    { id: 'customername', label: 'Products', minWidth: 85 },
    { id: 'area', label: 'Complaints', minWidth: 140 },
    { id: 'noofproduct', label: 'Ticket Id', minWidth: 100 },
    {
        id: 'contactno',
        label: 'Complaint Date',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
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
        align: 'right',
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

// function createData(customername, area, noofproduct, contactno, button) {
//     // const density = asset / serialno;
//     return { customername, area, noofproduct, contactno, button };
// }

// function createData1(customername, area, noofproduct, contactno, joindate, button) {
//     // const density = asset / serialno;
//     return { customername, area, noofproduct, contactno, joindate, button };
// }

// const rows = [
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     createData('Rapid pod', 'disply issue not working', 'tk0265789', '22/1/2022', 'Details'),
//     // createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),

// ];





// const rowsCompt = [
//     createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
//     createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
//     createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
//     createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),
//     createData1('Purchase Date-19/06/2023', 'TriCare', '2 Years', '19/06/2022', '19/06/2024', 'View Details'),

//     // createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),

// ];




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







    const [rowsCompt, setRowsCompt] = useState([])
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { id } = useParams();



    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');


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


    const [value, setValue] = React.useState('1');

    const [formData, setFormData] = useState(initialFormData);
    const [isEditable, setIsEditable] = useState(false);

    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({});










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
    const handleClickOpenUserPopup = () => {
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
    const routeChange = () => {
        window.location.href = "/dashboard/Complaintdetail";
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // const handleToggleEdit = () => {
    //     setIsEditable(!isEditable);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
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


    const handleChange5 = (event) => {

        const token = localStorage.getItem('token');
        setLoading(true);
        fetch(`${baseUrl}/api/user/product-customer/details/?userId=${userId}`, {
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
                setRowsCompt(json.data)
                console.log("rowdata", rowsCompt)


            })
            .finally(() => {
                setLoading(false);
            });


    };

    // const handleChange6 = (event) => {

    //     setCategory(event.target.value);


    // };

    // const handleChange7 = (event) => {

    //     setCategory(event.target.value);


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
        handleChange5();
        // handleChange6();
        // handleChange7();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
































    return (



        <div>
            <Grid container spacing={1}>

                <Grid item xs={9} >




                    <Item style={{ backgroundColor: '#007F6D', height: '60%', display: 'auto', width: '100%', marginLeft: '-2%', marginTop: '-3%' }}>
                        {/* <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '892px', fontSize: '20px' }}>
                            Customer Details

                        </Typography> */}
                        <Grid>

                            <item>
                                <h3 style={{ color: 'white', marginRight: '55%', marginTop: '4%', fontSize: '130%' }}>{user.name}</h3>
                                <h4 style={{ color: 'white', marginRight: '55%', marginTop: '-2%' }}>city:{user.city}</h4>
                            </item>






                            <item>
                                <img style={{ width: '10%', height: '10%', marginLeft: '2%', paddingBottom: '4%', marginTop: '-10%' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                            </item>

                        </Grid>

                        <item >
                            <p style={{ color: 'white', marginRight: '78%', fontSize: '120%', marginTop: '1%' }}>Email:{user.email}</p>
                            {/* <p style={{ color: 'white', marginRight: '80%', marginTop: '-13px' }}>sonu@gmail.com</p> */}
                        </item>
                        <item>
                            <p style={{ color: 'white', marginTop: '-6.2%', marginRight: '20%', fontSize: '120%' }}>Contact:{user.contact}</p>
                            {/* <p style={{ color: 'white', marginRight: '35%', marginTop: '-1%', }}>9787867877</p> */}
                        </item>
                        {/* <item>
                            <p style={{ color: 'white', marginLeft: '23%', marginTop: '-10%', fontSize: '16px' }}> No. of Product</p>
                            <p style={{ color: 'white', marginLeft: '23%', marginTop: '-1%' }}>3</p>
                        </item> */}






                        {/* <TextField
              id="search"
              type="search"
              label="Search"
              size="small"

              sx={{ width: 200, marginLeft: 48, marginTop: 1, paddingBottom: '25px', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'black' }} */}

                        {/* /> */}
                        {/* <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button> */}

                        <div style={{ align: ' right', marginLeft: '80%', marginTop: '-27%' }}>

                            <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ color: 'black', backgroundColor: 'white', width: '100%', marginLeft: "auto", marginTop: '17%' }}>edit profile</Button>



                            <Dialog
                                open={openUser}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                style={{ height: '550px' }}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Edit"}
                                </DialogTitle>
                                <DialogContent>
                                    <img style={{ width: 75, height: 100, marginLeft: '230px', paddingBottom: '25px', marginTop: '-10px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                                    <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px', marginTop: '-20px' }}>Add Image</p>
                                    <DialogContentText>

                                        <Container maxWidth="sm">
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={6}>
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
                                                            value={contactNo}
                                                            onChange={(e) => setContactNo(e.target.value)}
                                                            fullWidth
                                                            required
                                                            // style={{ padding: '7px', width: '250px' }}
                                                            sx={{ m: 1, width: '250px' }}

                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            fullWidth
                                                            required
                                                            type="email"
                                                            // style={{ padding: '7px', width: '250px' }}
                                                            sx={{ m: 1, width: '250px' }}
                                                        />
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
                                                    </Grid>
                                                </Grid>
                                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '30px', paddingTop: '-3px', marginLeft: '438px' }}>
                                                    Submit
                                                </Button>
                                                <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '339PX', marginTop: '-60px' }} >Close</Button>
                                            </form>
                                        </Container>




                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    {/* <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', paddingBottom: '0px' }} >Close</Button> */}
                                    {/* <Button type="submit" onClick={handleSubmit} autoFocus style={{ paddingRight: '33px', paddingTop: '11px' }}>
                                    Submit
                                </Button> */}
                                </DialogActions>
                            </Dialog>

                        </div>



                        <div style={{ align: ' right', marginLeft: '80%', marginTop: '2%', spacing: '1%' }} >
                            <Button onClick={handleClickOpenUserPopup2} variant="contained" style={{ width: '100%', height: '36%', backgroundColor: 'white', color: 'black', }} >
                                Add Product
                            </Button>






                            {/* <Button  style={{  backgroundColor: 'white',color:'black', width: '170px', marginLeft:'-100px' }}>Product</Button>
                            <Button style={{  backgroundColor: 'white',color:'black', width: '170px',  }}>Component</Button> */}

                            <Dialog
                                open={openProductUser}
                                onClose={handleClickClose2}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                style={{ height: '660px' }}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Add Products"}
                                </DialogTitle>
                                <DialogContent>
                                    {/* <img style={{ width: 75, height: 100, marginLeft: '230px', paddingBottom: '25px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                                    <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px' }}>Add Image</p> */}
                                    <DialogContentText>

                                        <Container maxWidth="sm">
                                            <form onSubmit={handleSubmit2}>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="Asset Id"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            fullWidth
                                                            required
                                                            style={{ padding: '7px', width: '250px' }}
                                                        />

                                                        <TextField
                                                            label="Serial No"
                                                            value={contactNo}
                                                            onChange={(e) => setContactNo(e.target.value)}
                                                            fullWidth
                                                            required
                                                            style={{ padding: '7px', width: '250px' }}

                                                        />
                                                        <TextField
                                                            label="SLA"
                                                            value={sla}
                                                            onChange={(e) => setSla(e.target.value)}
                                                            fullWidth
                                                            required
                                                            style={{ padding: '7px', width: '250px' }}

                                                        />



                                                        <TextField
                                                            label="Date of Manufacturing"
                                                            value={dateofmanufacturing}
                                                            onChange={(e) => setManufacturing(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Date of Installation"
                                                            value={dateofinstallation}
                                                            onChange={(e) => setInstallation(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Next Sheduled Maintenance"
                                                            value={nextsheduledmaintenance}
                                                            onChange={(e) => setNextsheduledmaintenance(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Controller"
                                                            value={controller}
                                                            onChange={(e) => setController(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />

                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="Meter"
                                                            value={meter}
                                                            onChange={(e) => setMeter(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="RCD"
                                                            value={rcd}
                                                            onChange={(e) => setRcd(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="MCB"
                                                            value={mcb}
                                                            onChange={(e) => setMcb(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Connector"
                                                            value={connector}
                                                            onChange={(e) => setConnector(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="LED"
                                                            value={led}
                                                            onChange={(e) => setLed(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Purchase Date"
                                                            value={purchasedate}
                                                            onChange={(e) => setPurchasedate(e.target.value)}
                                                            fullWidth
                                                            required


                                                            style={{ padding: '7px', width: '250px' }}
                                                        />

                                                        <TextField
                                                            label="Warranty Period"
                                                            value={warrantyperiod}
                                                            onChange={(e) => setWarrantyperiod(e.target.value)}
                                                            fullWidth
                                                            required

                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button type="submit" color="primary" style={{ marginTop: '34px', paddingTop: '-3px', marginLeft: '388px', width: '116px' }}>
                                                    Submit
                                                </Button>
                                                <Button onClick={handleClickClose2} style={{ color: 'red', paddingRight: '22px', marginLeft: '327PX', marginTop: '-59px' }} >Close</Button>
                                            </form>
                                        </Container>




                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    {/* <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', paddingBottom: '0px' }} >Close</Button> */}
                                    {/* <Button type="submit" onClick={handleSubmit} autoFocus style={{ paddingRight: '33px', paddingTop: '11px' }}>
                                    Submit
                                </Button> */}
                                </DialogActions>
                            </Dialog>
                        </div>



                        <Box sx={{ typography: 'body1', marginTop: '20%', width: '108%', marginLeft: '-1%' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab style={{ color: 'white', marginLeft: '1%' }} label="Products" value="1" />
                                        <Tab style={{ color: 'white' }} label="Complaints" value="2" />
                                        {/* <Tab label="Item Three" value="3" /> */}
                                    </TabList>

                                </Box>

                                <TabPanel value="2" >

                                    <Item >
                                        <Card >

                                            <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                                                <TableContainer sx={{ maxHeight: 440 }}>
                                                    <Table stickyHeader aria-label="sticky table" >
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
                                                            {rows
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((row) => {
                                                                    return (
                                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                            {columns.map((column) => {
                                                                                const value = row[column.id];


                                                                                if (column.id === 'button') {
                                                                                    return (
                                                                                        <TableCell key={column.id} align={column.align}>


                                                                                            {/* <Button onClick={routeChange} variant="contained"> {value === null ? '' : String(value)} </Button>
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
                                                                                            </Dialog> */}
                                                                                            {/* View button dialog box */}



                                                                                            <Button onClick={routeChange} variant="contained"> {value === null ? '' : String(value)} </Button>
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

                                                                                                        <div style={{ padding: '20px', }}>

                                                                                                            <img style={{ width: 125, height: 115, marginLeft: '125px' }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />

                                                                                                            <Grid container spacing={5}>
                                                                                                                <Grid item xs={12}>

                                                                                                                    <ul>
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
                                                                                                                    </ul>











                                                                                                                </Grid>

                                                                                                                <Grid item xs={6}>

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




                                                                                                                </Grid>
                                                                                                            </Grid>



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

                                </TabPanel>

                                <TabPanel value="1">
                                    <Item>
                                        <Card>

                                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                <TableContainer sx={{ maxHeight: 440 }}>
                                                    <Table stickyHeader aria-label="sticky table">
                                                        <TableHead>
                                                            <TableRow>
                                                                {columnsCompt.map((column) => (
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
                                                            {rowsCompt
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((row) => {
                                                                    return (
                                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                            {columns.map((column) => {

                                                                                const value = row[column.id];

                                                                                console.log(column)
                                                                                if (column.id === 'button') {
                                                                                    return (
                                                                                        <TableCell key={column.id} align={column.align}>

                                                                                            {/* view dialog box customerdetail */}

                                                                                            <Button onClick={handleClickOpen} variant="contained"> Details </Button>
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












                    </Item>

                </Grid>




                <Grid item xs={3} >
                    <Item style={{ height: '50px', backgroundColor: '#00617F', color: 'white', marginTop: '-10.5%' }}>
                        <p style={{ marginTop: '1%' }}>Recent Activities</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Add new product sony phone</li>
                        <p style={{ marginLeft: '138px', marginTop: '4%' }}>10/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>
                    <Item style={{ height: '60px', }}>
                        <li>Recent sony device complaint.</li>
                        <p style={{ marginLeft: '138px', marginTop: '3px' }}>4/10/2023</p>
                    </Item>




                </Grid>












                {/* <Grid item xs={9}> */}

                {/* </Grid> */}






            </Grid>

        </div>
    );

}