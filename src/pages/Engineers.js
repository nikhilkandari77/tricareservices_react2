// import React, { useState } from 'react';

// import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import Iconify from '../components/iconify';








// export default function Engineers() {

//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [name, setName] = useState('');
//     const [contactNo, setContactNo] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');






//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     const [open, setOpen] = React.useState(false);
//     const [openUser, setUserOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleClickOpenUserPopup = () => {
//         setUserOpen(true);
//     }
//     const handleClickClose1 = () => {
//         setUserOpen(false);
//     }
//     const handleClickOpen1 = () => {
//         setUserOpen(false);
//     }



//     // Form submission handler
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Perform actions with form data, e.g., validation or sending data to a server
//         // Example: console.log(name, contactNo, email, address);

//         // Reset form fields
//         setName('');
//         setContactNo('');
//         setEmail('');
//         setAddress('');
//     };






//     const routeChange = () => {
//         window.location.href = "/Engineers";
//     }



//     // const handleChange = (event, newValue) => {
//     //     setValue(newValue);
//     // };



//     return (

//         <div>


//             <Grid container spacing={1}>

//                 <Grid item xs={12}>

//                     <Item style={{ backgroundColor: '#007F6D', height: '76px' }}>
//                         <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '892px', fontSize: '20px', marginTop: '15px' }}>
//                             Customer List
//                         </Typography>

//                         <TextField
//                             id="search"
//                             type="search"
//                             label="Search"
//                             size="small"

//                             sx={{ width: 200, marginLeft: 52, marginTop: -5, paddingBottom: '25px', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'white' }}

//                         />
//                         <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black', marginTop: -7, marginLeft: '21px' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button>




//                         <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ width: '200px', height: '40px', marginLeft: '150px', backgroundColor: 'white', color: 'black', marginTop: '-65px', marginRight: '16px' }} startIcon={<Iconify icon="eva:plus-fill" />}>
//                             New Customer
//                         </Button>

//                         <Dialog
//                             open={openUser}
//                             onClose={handleClose}
//                             aria-labelledby="alert-dialog-title"
//                             aria-describedby="alert-dialog-description"
//                             style={{ height: '650px' }}
//                         >
//                             <DialogTitle id="alert-dialog-title">
//                                 {"Add Customer"}
//                             </DialogTitle>
//                             <DialogContent>
//                                 <div>
//                                     <img style={{ width: 75, height: 110, marginLeft: '230px', paddingBottom: '65px', marginTop: '-6px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
//                                 </div>
//                                 <div>
//                                     <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px', marginTop: '-36px' }}>Add Image</p>
//                                 </div>
//                                 <DialogContentText>

//                                     <Container maxWidth="sm">
//                                         <form onSubmit={handleSubmit}>
//                                             <Grid container spacing={5}>
//                                                 <Grid item xs={6}>
//                                                     <TextField
//                                                         label="Name"
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                         fullWidth
//                                                         required
//                                                         style={{ padding: '7px', width: '250px' }}
//                                                     />
//                                                     <TextField
//                                                         label="Contact No"
//                                                         value={contactNo}
//                                                         onChange={(e) => setContactNo(e.target.value)}
//                                                         fullWidth
//                                                         required
//                                                         style={{ padding: '7px', width: '250px' }}

//                                                     />
//                                                 </Grid>

//                                                 <Grid item xs={6}>
//                                                     <TextField
//                                                         label="Email"
//                                                         value={email}
//                                                         onChange={(e) => setEmail(e.target.value)}
//                                                         fullWidth
//                                                         required
//                                                         type="email"
//                                                         style={{ padding: '7px', width: '250px' }}
//                                                     />
//                                                     <TextField
//                                                         label="Address"
//                                                         value={address}
//                                                         onChange={(e) => setAddress(e.target.value)}
//                                                         fullWidth
//                                                         multilin
//                                                         rows={4}
//                                                         required
//                                                         style={{ padding: '7px', width: '250px', height: '120px' }}
//                                                     />
//                                                 </Grid>
//                                             </Grid>
//                                             <Button type="submit" variant="contained" color="primary" style={{ marginTop: '-16px', paddingTop: '-3px', marginLeft: '423px' }}>
//                                                 Submit
//                                             </Button>
//                                             <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '327PX', marginTop: '-63px' }} >Close</Button>
//                                         </form>
//                                     </Container>




//                                 </DialogContentText>
//                             </DialogContent>
//                             <DialogActions>
//                                 {/* <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', paddingBottom: '0px', marginBottom: '0px' }} >Close</Button>
//                 <Button type="submit" onClick={handleSubmit} autoFocus style={{ paddingRight: '33px', paddingTop: '11px' }}>
//                   Submit
//                 </Button> */}
//                             </DialogActions>
//                         </Dialog>

//                 </Item>
//                 </Grid>
//             </Grid>

//         </div>



//     );



// }


import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
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
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputBase from '@mui/material/InputBase';






import Iconify from '../components/iconify';



const columns = [
    { id: 'customername', label: 'Customer Name', minWidth: 85 },
    { id: 'area', label: 'Area', minWidth: 140 },
    { id: 'noofproduct', label: 'No of Product', minWidth: 100 },
    {
        id: 'contactno',
        label: 'Contact No',
        minWidth: 140,
        align: 'right',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'joindate',
        label: 'Join Date',
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

function createData(customername, area, noofproduct, contactno, joindate, button) {
    // const density = asset / serialno;
    return { customername, area, noofproduct, contactno, joindate, button };
}

const rows = [
    createData('rohit', 'nagpur', 'Rapid pod', '8987767674', '23/2/2023', 'Details'),
    createData('mohit', 'nagpur', 'Charger pod', '7564444444', '23/2/2023', 'Details'),
    createData('sumit', 'nagpur', 'Digi Charge', '8987767674', '23/3/2023', 'Details'),
    createData('denesh', 'nagpur', 'EV Tower', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'Rapid Tower', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa45', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa12', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa34', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa23', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa24', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa24', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa12', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa32', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa34', '8987767674', '23/4/2023', 'Details'),
    createData('rohan', 'nagpur', 'sa56', '8987767674', '23/4/2023', 'Details'),
];




export default function Engineers() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const [name, setName] = useState('');
    // const [contactNo, setContactNo] = useState('');
    // const [email, setEmail] = useState('');
    // const [address, setAddress] = useState('');


    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [areapin, setAreapin] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');






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
    }
    const handleClickOpen1 = () => {
        setUserOpen(false);
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
    };

    const routeChange = () => {
        window.location.href = "/Engineers";

    }

    const routeChange1 = () => {
        window.location.href = "/dashboard/Engineersdetail ";
    }

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






















    return (



        <div>
            <Grid container spacing={5}>









                <Grid item xs={12} >
                    <Box sx={{ flexGrow: 6 }}>
                        <AppBar style={{ backgroundColor: '#007F6D' }} position="static">
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





                                <Grid >
                                    <Search>

                                        <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black', }} >
                                            Add Engineer
                                        </Button>


                                        <Dialog
                                            open={openUser}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            style={{ height: '550px' }}
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Add Engineer"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <div>
                                                    <img style={{ width: 75, height: 110, marginLeft: '230px', paddingBottom: '65px', marginTop: '-6px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                                                </div>
                                                <div>
                                                    <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px', marginTop: '-36px' }}>Add Image</p>
                                                </div>
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
                                                                    <TextField
                                                                        label="Area pin"
                                                                        value={areapin}
                                                                        onChange={(e) => setAreapin(e.target.value)}
                                                                        fullWidth
                                                                        required
                                                                        // style={{ padding: '7px', width: '250px' }}
                                                                        sx={{ m: 1, width: '250px' }}

                                                                    />
                                                                    <TextField
                                                                        label="Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                                    <TextField
                                                                        label="Confirm Password"
                                                                        value={password}
                                                                        onChange={(e) => setState(e.target.value)}
                                                                        fullWidth
                                                                        required
                                                                        type="password"
                                                                        // style={{ padding: '7px', width: '250px' }}
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
                                                {/* <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', paddingBottom: '0px', marginBottom: '0px' }} >Close</Button>
                <Button type="submit" onClick={handleSubmit} autoFocus style={{ paddingRight: '33px', paddingTop: '11px' }}>
                  Submit
                </Button> */}
                                            </DialogActions>
                                        </Dialog>








                                    </Search>

                                </Grid>









                            </Toolbar>
                        </AppBar>
                    </Box>






                    {/* <Item style={{ height: '70%', marginTop: '-2%', backgroundColor: '#007F6D', width: '100%' }}> */}
                    {/* <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '892px', fontSize: '16px', marginTop: '15px', }}>
                            <p> Service  </p>
                        </Typography>
                        <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '78%', fontSize: '16px', marginTop: '-39px', }}>
                            <p>  Engineers </p>
                        </Typography> */}

                    {/* <TextField
                            id="search"
                            type="search"
                            label="Search"
                            size="small"

                            sx={{ width: '20%', marginLeft: '18%', marginTop: '-5.3%', paddingBottom: '2%', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'white' }}

                        /> */}
                    {/* <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black', marginTop: '-8.5%', marginLeft: '2%' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button>
 */}


                    {/* 
                        <Button onClick={handleClickOpenUserPopup} variant="contained" style={{ width: '20%', height: '72%', marginLeft: '77%', backgroundColor: 'white', color: 'black', marginTop: '-14%', marginRight: '-2%', }} startIcon={<Iconify icon="eva:plus-fill" />}>
                            Add Engineer
                        </Button> */}


                    {/* </Item> */}
                </Grid>


                <Grid container spacing={0}>
                    <Grid item xs={1} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '2%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Junior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>

                                    <img style={{ width: '50%', height: '15%', marginLeft: '24%', paddingBottom: '20%', marginTop: '-1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/dummy_eng.png" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-10%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '2%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Senior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>
                                    <img style={{ width: '50%', height: '15%', marginLeft: '25%', paddingBottom: '20%', marginTop: '1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/dummy_eng.png" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-11%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid>
                    <Grid item xs={1} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '2%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Junior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>

                                    <img style={{ width: '50%', height: '15%', marginLeft: '24%', paddingBottom: '20%', marginTop: '-1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/dummy_eng.png" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-10%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '2%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Senior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>
                                    <img style={{ width: '50%', height: '15%', marginLeft: '25%', paddingBottom: '20%', marginTop: '1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/dummy_eng.png" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-11%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid>
                </Grid>


                {/* <Grid container spacing={0} style={{ marginTop: '3%' }}> */}
                {/* <Grid item xs={1} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '-13%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Senior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>
                                    <img style={{ width: '50%', height: '15%', marginLeft: '25%', paddingBottom: '20%', marginTop: '1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/software-engineer-portrait-smiling-young-vietnamese-69422682.webp" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-11%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid> */}
                {/* <Grid item xs={3} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '-13%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Junior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>

                                    <img style={{ width: '50%', height: '15%', marginLeft: '24%', paddingBottom: '20%', marginTop: '-1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/software-engineer-portrait-smiling-young-vietnamese-69422682.webp" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-10%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid> */}
                {/* <Grid item xs={3} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '-13%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Junior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>

                                    <img style={{ width: '50%', height: '15%', marginLeft: '24%', paddingBottom: '20%', marginTop: '-1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/software-engineer-portrait-smiling-young-vietnamese-69422682.webp" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-10%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid> */}
                {/* <Grid item xs={3} md={3}>
                        <Item><Card style={{ backgroundColor: '#F0F0F0', marginTop: '-13%', marginLeft: '12%' }}>
                            <CardContent>
                                <Typography style={{ marginTop: '-12%' }}>
                                    Junior Engineer
                                </Typography>




                                <Typography sx={{ fontSize: '20%' }} gutterBottom>

                                    <img style={{ width: '50%', height: '15%', marginLeft: '24%', paddingBottom: '20%', marginTop: '-1px', color: '#131313' }} alt="Bx bxs lock alt" src="/image1/software-engineer-portrait-smiling-young-vietnamese-69422682.webp" />
                                </Typography>
                                <Typography style={{ fontSize: '130%', marginTop: '-15%', color: '#131313' }} >
                                    Sumit Kumar
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '120%' }}>
                                    Service Engineers
                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }} >
                                    Inprogress -22

                                </Typography>
                                <Typography style={{ color: '#131313', fontSize: '100%' }}>
                                    Completed -24

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={routeChange1} style={{ marginLeft: '25%', color: '#131313', marginTop: '-10%', backgroundColor: 'lightblue' }}>View Profile</Button>
                            </CardActions>
                        </Card></Item>
                    </Grid>
                </Grid> */}




































            </Grid>

        </div>
    );

}