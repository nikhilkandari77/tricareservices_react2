/* eslint-disable react/jsx-key */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {  styled } from '@mui/material/styles';

import {  Button,Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Label from '../label/Label';

import baseUrl from '../../utils/baseUrl';

const columns = [
  { id: "sr", label: 'S.No', minWidth: 10 },
  { id: 'priority', label: 'Priority', align: 'center', minWidth: 70 },
  { id: 'id', label: 'Complaint Id', align: 'center', minWidth: 50 },
  {
    id: 'productCustomer',
    subId: 'productName',
    label: 'Product',
    minWidth: 60,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'problem',
    label: 'Problem',
    minWidth: 150,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'customerName',
    label: 'Customer',
    minWidth: 60,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  { id: 'createdDateTime', label: 'Complaint Time', align: 'center', minWidth: 110 },
  { id: 'engineerName', label: 'Engineer', align: 'center', minWidth: 70 },
  { id: 'estimatedDateTime', label: 'Estimated End Time', align: 'center', minWidth: 110 },
  { id: 'complaintStatus', label: 'Status', align: 'center', minWidth: 70 },
  
  { id: 'action', label: 'Action', align: 'center', minWidth: 70 },
];
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


export default function DashboardTable({ token }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [rows, setRows] = useState([]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const routeChange1 = (id) => {
    if(id!==undefined&&id!==null)
    navigate("/Dashboard/Taskdetail", { state: { taskId: id } });
  };


  function formatDate(dateString) {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  function formatDateTime(dateString) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  let sr = 0;

  useEffect(() => {


    fetch(`${baseUrl}/api/user/complaint/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then(response => response.json())
      .then(json => {



        const dataTemp = json.data;
        // console.log(dataTemp[0].productCustomer.productName);
        setRows(json.data);
        // console.log(`Rows ${  dataTemp}`);

      });

  }, []);

  //   const [searched, setSearched] = useState("");

  // const requestSearch = (searchedVal) => {
  //   const filteredRows = rows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows);
  // };

  //   const cancelSearch = () => {
  //     setSearched("");
  //     requestSearch(searched);
  //   };

  const searchItems = rows.filter(row => (search === '') || columns.map((column) => row[column.id] !== undefined&&row[column.id]!==null
      && row[column.id].toString().toLowerCase().includes(search.toLocaleLowerCase())).reduce((x, y) => x || y)
      ? row : null)


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ flexGrow: 6 }}>
        <AppBar style={{ backgroundColor: '#449355' }} position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Complaints
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
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <TableContainer sx={{ minHeight: "40vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{
              "& th": {
                fontSize: "1rem",
                color: "white",
                backgroundColor: "#449355"
              }
            }}>
              {columns.map((column) => (
                <TableCell

                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              searchItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {

                      const value = column.id === "productCustomer" ? row[column.id][column.subId] : row[column.id];

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
                            <Button onClick={() => routeChange1(row.id)} variant="contained">Details</Button>
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

                      if (column.id === 'estimatedDateTime') {

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


                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value === null ? '' : String(value)}
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
  );
}