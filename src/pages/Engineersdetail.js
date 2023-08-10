import React, { useState } from 'react';
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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Iconify from '../components/iconify';






const columns = [
    { id: 'customername', label: 'Srno.', minWidth: 85 },
    { id: 'area', label: 'Task', minWidth: 140 },
    { id: 'noofproduct', label: 'Customer', minWidth: 100 },
    {
        id: 'contactno',
        label: 'Address',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'joindate',
        label: 'Status',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'prr',
        label: 'Priority',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
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

function createData(customername, area, noofproduct, contactno,joindate,prr, button) {
    // const density = asset / serialno;
    return { customername, area, noofproduct, contactno,joindate,prr, button };
}



const rows = [
    createData('1', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','High', 'Details'),
    createData('2', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','Completed','Normal', 'Details'),
    createData('3', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','High', 'Details'),
    createData('4', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('4', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('5', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('6', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('7', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('8', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
    createData('9', 'Phone mather Board spea..', 'Guddu', 'Noida sector 7','In Progress','Normal', 'Details'),
 
    // createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),

];










export default function Engineersdetail() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);



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
        window.location.href = "/dashboard/Engineersdetail ";
    }
    const routeChange1 = () => {
        window.location.href = "/dashboard/Engineersdetail ";
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (



        <div>
            <Grid container spacing={1}>

                <Grid item xs={9} >




                    <Item style={{ backgroundColor: '#007F6D', height: '34%',marginLeft:'-2%' }}>
                        {/* <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '892px', fontSize: '20px' }}>
                            Customer Details

                        </Typography> */}
                        <Grid>

                        <item>
                                <h3 style={{ color: 'white', marginRight: '55%', marginTop: '4%', fontSize: '130%' }}>Sonu Gupta</h3>
                                <h4 style={{ color: 'white', marginRight: '55%', marginTop: '-2%' }}>Location noida</h4>
                            </item>






                            <item>
                                <img style={{ width: '10%', height: '10%', marginLeft: '2%', paddingBottom: '4%', marginTop: '-10%' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                            </item>

                        </Grid>

                        <item>
                              <p style={{color:'white',fontSize:'120%',marginLeft:'-90%'}}>User Id</p>
                              <p style={{color:'white',marginLeft:'-86%',}}>345455555</p>

                        </item>
                        <item>
                              <p style={{color:'white',fontSize:'120%',marginLeft:'-45%',marginTop:'-11.5%'}}>Designation</p>
                              <p style={{color:'white',marginLeft:'-36%'}}>Senior Service Engineer</p>

                        </item>


                        <item>
                            <p style={{ color: 'white', marginTop: '-11.5%', marginRight: '-12%', fontSize: '120%' }}>Contact No</p>
                            <p style={{ color: 'white', marginRight: '-12%', marginTop: '1%', }}>9787867877</p>
                        </item>

                        <item >
                            <p style={{ color: 'white', marginRight: '-69%', fontSize: '120%', marginTop: '-11%' }}>Email Id</p>
                            <p style={{ color: 'white', marginRight: '-76%', marginTop: '-1%', }}>sonu@gmail.com</p>
                        </item>






                        {/* <TextField
              id="search"
              type="search"
              label="Search"
              size="small"

              sx={{ width: 200, marginLeft: 48, marginTop: 1, paddingBottom: '25px', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'black' }} */}

                        {/* /> */}
                        {/* <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button> */}

                        <div style={{ align: ' right', marginLeft: '600px', marginTop: '-260px' }}>

                            <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ color: 'black', backgroundColor: 'white', width: '115%', marginLeft: "-17%", marginTop: '49%' }}>edit profile</Button>



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
                                    <img style={{ width: 75, height: 100, marginLeft: '230px', paddingBottom: '25px',marginTop:'-10px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                                    <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px',marginTop:'-23px' }}>Add Image</p>
                                    <DialogContentText>

                                        <Container maxWidth="sm">
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label="Name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            fullWidth
                                                            required
                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Contact No"
                                                            value={contactNo}
                                                            onChange={(e) => setContactNo(e.target.value)}
                                                            fullWidth
                                                            required
                                                            style={{ padding: '7px', width: '250px' }}

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
                                                            style={{ padding: '7px', width: '250px' }}
                                                        />
                                                        <TextField
                                                            label="Address"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            fullWidth
                                                            multilin
                                                            rows={4}
                                                            required
                                                            style={{ padding: '7px', width: '250px', height: '120px' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '-16px', paddingTop: '-3px', marginLeft: '423px' }}>
                                                    Submit
                                                </Button>
                                                <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '327PX', marginTop: '-59px' }} >Close</Button>
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



                        <div style={{ align: ' right', marginLeft: '600px', marginTop: '7px', spacing: '1px' }} >
                            {/* <Button onClick={handleClickOpenUserPopup2} variant="contained" style={{ width: '140px', height: '36px', backgroundColor: 'white', color: 'black', }} startIcon={<Iconify icon="eva:plus-fill" />}>
                                Add Product
                            </Button> */}






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



                        

                        <Box sx={{ typography: 'body1', marginTop: '20%',width:'108%',marginLeft:'-3%' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab style={{ color: 'white',marginTop:'50px',marginLeft:'3%',borderRadius:'10px',height:'-2%' }} label="Task History" value="1" />
                                        {/* <Tab style={{ color: 'white',marginTop:'50px' }} label="Complaints" value="2" /> */}
                                        {/* <Tab label="Item Three" value="3" /> */}
                                    </TabList>
                                </Box>

                                <TabPanel value="1">

                                    <Item >
                                        {/* <Card> */}

                                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                            <TableContainer sx={{ maxHeight: 440, }}>
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
                                                                                                            <Grid item xs={6}>

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

                                        {/* </Card> */}


                                    </Item>

                                </TabPanel>

                                
                                {/* <TabPanel value="3">Item Three</TabPanel> */}
                            </TabContext>
                        </Box>












                    </Item>

                


                </Grid>




                <Grid item xs={3} >
                    <Item style={{ height: '5%', backgroundColor: '#00617F', color: 'white' }}>

                        <p style={{marginTop:'2%'}}>Recent Tasks</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    <Item style={{ height: '7%', }}>

                        <img style={{ width: '20px', height: '25px', paddingTop: '10px', marginTop: '10px' }} alt="Bx bxs lock alt" src="/image1/Sony_logos.jpg" /> <p style={{ marginTop: '-10%',marginRight:'-11%' }}> New task assigned by system.</p>
                        <p style={{ marginRight: '55%', marginTop: '-11px' }}>Just now</p>
                    </Item>
                    
                   

                </Grid>












                {/* <Grid item xs={9}> */}

                {/* </Grid> */}






            </Grid>

        </div>
    );

}