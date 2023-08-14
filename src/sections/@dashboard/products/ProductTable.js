
// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';

// // import Button from 'src/theme/overrides/Button';



// const columns = [
//   { id: 'srno', label: 'Sr.no', minWidth: 85 },
//   { id: 'image', label: '', minWidth: 140 },
//   { id: 'name', label: 'Name', minWidth: 100 },
//   {
//     id: 'assetno',
//     label: 'Asset No',
//     minWidth: 140,
//     align: 'right',
//     // format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'serialno',
//     label: 'Serial No',
//     minWidth: 140,
//     align: 'right',
//     // format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'button',
//     label: 'Action',
//     minWidth: 140,
//     align: 'right',
//     // format: (value) => value.toFixed(2),
//   },
// ];

// function createData(srno, image, name, assetno, serialno, button) {
//   // const density = asset / serialno;
//   return { srno, image, name, assetno, serialno, button };
// }

// const rows = [
//   createData(1, <img style={{ width: 45, height: 50 }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />, 'Rapid pod', 'qw345', 23, 'Action'),
//   createData(2, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_b 1.svg" />, 'Charger pod', 'qw345', 23, 'Action'),
//   createData(3, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_c 1.svg" />, 'Digi Charge', 'qw345', 23, 'Action'),
//   createData(4, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_d 1.svg" />, 'EV Tower', 'qw345', 23, 'Action'),
//   createData(5, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_e 1.svg" />, 'Rapid Tower', 'qw345', 23, 'Action'),
//   createData(6, 'img', 'sa45', 'qw345', 23, 'Action'),
//   createData(7, 'img', 'sa12', 'qw345', 23, 'Action'),
//   createData(8, 'img', 'sa34', 'qw345', 23, 'Action'),
//   createData(9, 'img', 'sa23', 'qw345', 23, 'Action'),
//   createData(10, 'img', 'sa24', 'qw345', 23, 'Action'),
//   createData(11, 'img', 'sa24', 'qw345', 23, 'Action'),
//   createData(12, 'img', 'sa12', 'qw345', 23, 'Action'),
//   createData(13, 'img', 'sa32', 'qw345', 23, 'Action'),
//   createData(14, 'img', 'sa34', 'qw345', 23, 'Action'),
//   createData(15, 'img', 'sa56', 'qw345', 23, 'Action'),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);



//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };







//   return (

//     <div>









//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];

//                       const heading = {


//                       }


//                       if (column.id === 'button') {
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             <Button onClick={handleClickOpen} variant="contained"> {value === null ? '' : String(value)} </Button>
//                             <Dialog
//                               open={open}
//                               onClose={handleClose}
//                               aria-labelledby="alert-dialog-title"
//                               aria-describedby="alert-dialog-description"
//                             >
//                               <DialogTitle id="alert-dialog-title">
//                                 {"View Details"}
//                               </DialogTitle>
//                               <DialogContent>
//                                 <DialogContentText>

//                                   <div style={{ padding: '20px', }}>

//                                     <img style={{ width: 125, height: 115, marginLeft:'125px'}} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />

//                                     <Grid container spacing={5}>
//                                       <Grid item xs={6}>

//                                         <ul>
//                                           <li > Asset id  </li>
//                                           <li> Serial no  </li>
//                                           <li>SLA        </li>
//                                           <li> Date of Manufacturing</li>
//                                           <li> Date of installation </li>
//                                           <li> Next shadule maintanance</li>
//                                           <li> Controller  </li>
//                                           <li> Meter   </li>
//                                           <li>RCD     </li>
//                                           <li>MCB     </li>
//                                           <li>Connector</li>
//                                           <li>Display  </li>
//                                           <li>LED      </li>
//                                           <li> Latitude </li>
//                                           <li>Longitude</li>
//                                         </ul>
//                                       </Grid>

//                                       <Grid item xs={6}>

//                                         <li>Rapid Pod</li>
//                                         <li>Rapid Pod TRI01 </li>
//                                         <li>24hrs</li>
//                                         <li>19/8/2023</li>
//                                         <li>15/2/2023</li>
//                                         <li>05/22023</li>
//                                         <li>Railbit</li>
//                                         <li> Schneider</li>
//                                         <li>Siemens</li>
//                                         <li>Havells</li>
//                                         <li>Phoneix</li>
//                                         <li> NP</li>
//                                         <li> Railbit</li>
//                                         <li> 27.78777</li>
//                                         <li> 77.89877</li>




//                                       </Grid>
//                                     </Grid>



//                                   </div>
//                                 </DialogContentText>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleClose} style={{ color: 'red' }} >Close</Button>
//                                 <Button onClick={handleClose} autoFocus>
//                                   Accept
//                                 </Button>
//                               </DialogActions>
//                             </Dialog>
//                           </TableCell>

//                         );


//                       }


//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {value}
//                         </TableCell>

//                       );
//                     })}
//                   </TableRow>

//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>

//    </div>



//   );

// }


import React, { useState, useEffect } from 'react';

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
import { Button, Card, Container, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';

import Iconify from '../../../components/iconify';




const columns = [
  { id: 'id', label: 'Sr.No', minWidth: 140 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'imageName', label: ' Image', minWidth: 400 },
  // {
  //   id: 'contactno',
  //   label: 'Product Type',
  //   minWidth: 150,
  //   align: 'right',
  //   // format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'joindate',
  //   label: 'Customer',
  //   minWidth: -10,
  //   align: 'right',
  //   // format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'jobno',
  //   label: 'Job No',
  //   minWidth: 100,
  //   align: 'right',
  //   // format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'constractiontype',
  //   label: 'Constraction Type',
  //   minWidth: 160,
  //   align: 'right',
  //   // format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: 'button',
    label: 'Action',
    minWidth: 70,
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

// function createData(customername, area, noofproduct, contactno, joindate,jobno,constractiontype, button) {
//   // const density = asset / serialno;
//   return { customername, area, noofproduct, contactno, joindate,jobno,constractiontype, button };
// }

// const rows = [

//   createData(1, <img style={{ width: 45, height: 50 }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />, 'Rapid pod', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),
//   createData(2, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_b 1.svg" />, 'Charger pod', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),
//   createData(3, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_c 1.svg" />, 'Digi Charge', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),
//   createData(4, <img style={{ width: 45, height: 50 }} alt="Bx bxs lock alt" src="/image1/charger_a 1.svg" />, 'Rapid pod', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),
//   createData(5, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_b 1.svg" />, 'Charger pod', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),
//   createData(6, <img style={{ width: 40, height: 45 }} alt="Bx bxs lock alt" src="/image1/charger_c 1.svg" />, 'Digi Charge', 'LT Panel', 'Adani Electrical','120004','Indoor', 'Action'),


// ];




export default function StickyHeadTable() {
  const [rows, setRows] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
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
  const [loading, setLoading] = useState(false)






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

  const routeChange = () => {
    window.location.href = "/dashboard/customerdetail";
  }



  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch("https://tricareservice.onrender.com/api/user/product-master/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },

    })

      .then(response => response.json())
      .then(json => {
        console.log("Fetched data:", json); // This line will print the data to the console
        // setUsers(json);
        setRows(json.data)

      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }




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
      <Grid container spacing={1}>
        {/* <Grid item xs={12}>
          <Item>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Customer
              </Typography>
            </Stack>


          </Item>
        </Grid> */}







        
          <Box sx={{ flexGrow: 6 }}>
            <AppBar style={{ backgroundColor: '#007F6D' }} position="static">
              <Toolbar variant="dense">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Tasks
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
                {/* <search>

                   <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button>
                </search> */}

                <Search>

                  <Button onClick={handleClickOpenUserPopup} variant="contained"  style={{backgroundColor:'white',color:'black'}}  startIcon={<Iconify icon="eva:plus-fill" />}>
              Add Products
            </Button>

            <Dialog
              open={openUser}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              style={{ height: '650px' }}
            >
              <DialogTitle id="alert-dialog-title">
                {"Add Products"}
              </DialogTitle>
              <DialogContent>
                {/* <div>
                  <img style={{ width: 75, height: 110, marginLeft: '230px', paddingBottom: '65px', marginTop: '-6px' }} alt="Bx bxs lock alt" src="/image1/images.jpg" />
                </div>
                <div>
                  <p style={{ paddingLeft: '224px', paddingTop: '-52px', paddingBottom: '27px', marginTop: '-36px' }}>Add Image</p>
                </div> */}
                <DialogContentText>

                  <Container maxWidth="sm">
                    <form onSubmit={handleSubmit}>
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
                      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}  >
                        Add Product
                      </Button>


                      <Button onClick={handleClickClose1} style={{ color: 'red', paddingRight: '22px', marginLeft: '308PX', marginTop: '-59px' }} >Close</Button>
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
            </Search>



              </Toolbar>
            </AppBar>
          </Box>



{/* 
          <Item style={{ backgroundColor: '#007F6D', height: '82%', marginTop: '-2%', width: '100%' }}> */}
            {/* <Typography variant="h4" gutterBottom style={{ color: 'white', marginRight: '892%', fontSize: '140%', marginTop: '14erm', }}>
              Products
            </Typography> */}

            {/* <TextField
              id="search"
              type="search"
              label="Search"
              size="small"

              sx={{ width: '20%', marginLeft: '18%', marginTop: '-4%', paddingBottom: '2%', borderRadius: '4px', height: 38, backgroundColor: 'white', color: 'white' }}

            /> */}
            {/* <Button sx={{ margin: 1, backgroundColor: 'white', color: 'black', marginTop: '-6%', marginLeft: '2%' }} variant="contained"><SearchIcon>cdc</SearchIcon></Button> */}




           


          {/* </Item> */}
        





        <Grid item xs={12} style={{ marginTop: '1%', marginLeft: '0%', }}>
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
                                      <Button onClick={handleClickOpen} variant="contained"> Details </Button>
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

            </Card>


          </Item>
        </Grid>












      </Grid>

    </div>
  );

}