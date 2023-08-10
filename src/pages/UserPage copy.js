

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, Stack, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';






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




export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

 
  
  


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

 

 


  return (
    
    <div>
    
    {/* <Container> */}

    

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Customer
        </Typography>
        </Stack>
        
        
      <Grid item xs={12}>

      
      
      <Grid item xs={12}>
        
        <Button onClick={handleClickOpenUserPopup} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Customer
        </Button>
        
        <Dialog
          open={openUser}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{height:'660px'}}
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Customer"}
          </DialogTitle>
          <DialogContent>
           <img style={{ width: 75, height: 100, marginLeft:'230px',paddingBottom:'25px'}} alt="Bx bxs lock alt" src="/image1/images.jpg"  />
                                 <p style={{paddingLeft:'224px',paddingTop:'-52px',paddingBottom:'27px'}}>Add Image</p>
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
          style={{padding:'7px',width:'280px'}}
        />
        <TextField
          label="Contact No"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          fullWidth
          required
          style={{padding:'7px',width:'280px'}}
          
        />
        </Grid>
        
        <Grid item xs={12}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          type="email"
          style={{padding:'7px',width:'280px'}}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
          style={{padding:'7px',width:'280px',height:'90px'}}
        />
        </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{marginTop:'85px',paddingTop:'-3px'}}>
          Submit
        </Button>
      </form>
    </Container>




            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose1} style={{color:'red', paddingRight:'22px',paddingBottom:'0px'}} >Close</Button>
            {/* <Button type="submit"  onClick={handleSubmit} autoFocus style={{paddingRight:'33px',paddingTop:'11px'}}>
              Submit
            </Button> */}
          </DialogActions>
        </Dialog>


     
               
{/* 
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
        sx={{ width: 400, paddingBottom:'30px'}}
      /> */}

     
        
        </Grid>
        



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
                                <Button onClick={handleClickOpen} variant="contained"> {value === null ? '' : String(value)} </Button>
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
                                         This is Customer page

                                        </Container>
                                      </div>




                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose} style={{color:'red'}} >Close</Button>
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
     
      </Grid>
    {/* </Container> */}
    
    </div>
  );

}