

import React, { useState, useEffect, useRef } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import './custom.css';


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
import baseUrl from '../../../utils/baseUrl';
import Iconify from '../../../components/iconify';





const columns = [
  { id: 'id', label: 'Sr.No', minWidth: 100 },
  { id: 'imageName', label: ' Image', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'category', label: ' Category', minWidth: 100 },

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




export default function StickyHeadTable() {
  const [count, setCount] = useState(1)
  const [rows, setRows] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  // const [contactNo, setContactNo] = useState('');
  // const [meter, setMeter] = useState('');
  // const [rcd, setRcd] = useState('');
  // const [mcb, setMcb] = useState('');
  const inputRef = useRef(null);
  // const [sla, setSla] = useState('');
  // const [connector, setConnector] = useState('');
  // const [led, setLed] = useState('');
  // const [purchasedate, setPurchasedate] = useState('');
  // const [warrantyperiod, setWarrantyperiod] = useState('');

  // const [dateofmanufacturing, setManufacturing] = useState('');
  // const [dateofinstallation, setInstallation] = useState('');
  // const [nextsheduledmaintenance, setNextsheduledmaintenance] = useState('');
  // const [controller, setController] = useState('');
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");

  const searchItem = rows.filter(row => {
    return (search === '')
      || (row.category.name.toLowerCase().includes(search.toLowerCase()))
      || (row.name.toLowerCase().includes(search.toLowerCase())) ?
      row : null;

  })



  const searchHandler = (event) => {
    console.log(event)
    event.preventDefault();
    setSearch(event.target.value);
    inputRef.current.focus();
  }




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [openUser, setUserOpen] = React.useState(false);
  const [data, setData] = useState({})
  const handleClickOpen = (row) => {
    setOpen(true);
    setData(row);
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



  // Form submission handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Perform actions with form data, e.g., validation or sending data to a server
  //   // Example: console.log(name, contactNo, email, address);

  //   // Reset form fields
  //   setName('');
  //   setContactNo('');
  //   setSla('');
  //   setManufacturing('');
  //   setMeter('');
  //   setRcd('');
  //   setMcb('');
  //   setConnector('');
  //   setLed('');
  //   setPurchasedate('');
  //   setWarrantyperiod('');
  //   setInstallation('');
  //   setNextsheduledmaintenance('');
  //   setController('');
  // };







  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    fetch(`${baseUrl}/api/user/product-master/`, {
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
    return () => { };
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
        <Box sx={{ flexGrow: 6 }}>
          <AppBar style={{ backgroundColor: '#007F6D' }} position="static">
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Products
              </Typography>





              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>



                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  key="password"
                  value={search}
                  ref={inputRef}
                  autoFocus
                  onChange={searchHandler}

                />

              </Search>
              &nbsp;&nbsp;

              <div >

                <Button className='responsive-button' onClick={handleClickOpenUserPopup} variant="contained" style={{ backgroundColor: 'white', color: 'black' }} startIcon={<Iconify icon="eva:plus-fill" />}>Add Product</Button>

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

                  <DialogContentText>

<Container maxWidth="sm">
  <form >
    <Grid container spacing={5}>
      <Grid item xs={6}>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}

          fullWidth
          required
          // style={{ padding: '7px', width: '250px' }}
          sx={{ m: 1, width: '250px' }}
        />
       

      </Grid>
    </Grid>
    <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '18px', paddingTop: '-3px', marginLeft: '423px' }}>
      Submit
    </Button>
    <Button  style={{ color: 'red', paddingRight: '22px', marginLeft: '327PX', marginTop: '-63px' }} >Close</Button>
  </form>
</Container>




</DialogContentText>
                  </DialogContent>

                </Dialog>
              </div>



            </Toolbar>
          </AppBar>
        </Box>



        <Grid item xs={12} >
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
                      {searchItem
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                let value = row[column.id];
                                if (column.id === "category")
                                  value = value.name;
                              

                                else if (column.id === "imageName") {


                                  return (
                                    <TableCell>
                                      <img style={{ height: "7vh" }} src={`/products_images/${value}`} alt='product' />
                                    </TableCell>
                                  )

                                }

                                if (column.id === 'button') {
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      <Button onClick={() => handleClickOpen(row)} variant="contained"> Details </Button>
                                      <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        data={data}
                                      >
                                        <DialogTitle id="alert-dialog-title">
                                          {"View Details"}
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText>

                                            <div style={{ padding: '20px', }}>

                                              <img style={{ width: "15rem", height: "15vh", margin: "auto" }} alt="Bx bxs lock alt" src={`/products_images/${data.imageName}`} />

                                              <Grid container spacing={15}>
                                                <Grid item xs={6}>

                                                  <ul style={{ listStyleType: "none" }}>
                                                    <li>Product Id : </li>
                                                    <li>Product Name :</li>
                                                    <li>Category Id :</li>
                                                    <li>Category Name:</li>
                                                    <li>Description :</li>

                                                  </ul>
                                                </Grid>
                                                {
                                                  Object.keys(data).length === 0 ? "" :
                                                    (<Grid item xs={6}>
                                                      <ul style={{ listStyleType: "none" }}>
                                                        <li >{data.id}</li>
                                                        <li>{data.name}</li>
                                                        <li>{data.category.id}</li>
                                                        <li>{data.category.name}</li>
                                                        <li>{data.description}</li>
                                                      </ul>

                                                    </Grid>)
                                                }




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
                  rowsPerPageOptions={[5, 10, 15, 25, 100]}
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