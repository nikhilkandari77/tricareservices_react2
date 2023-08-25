/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, TextField, Typography, Grid, } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS file for styling

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate, useNavigate } from 'react-router-dom';
import baseUrl from '../utils/baseUrl';
import Label from '../components/label/Label';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


// const createRows = () => {
//   for(let i =0;i<users.length;++1){
//     let rows = [
//       createData(users[i].id,users[i].name,users[i].city,users[i].contact,users[i].email,"100")
//     ]
//   }
//   return rows
// }
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




export default function Task() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name, setName] = useState('');
    const [contactno, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    const [areapin, setAreapin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({});
    const [isFormOpen, setIsFormOpen] = useState(true);

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const [tasktype, setTasktype] = React.useState('');
    const [status, setStatus] = useState('');

    const [date, setDate] = useState('');






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



    const handleChange3 = (event) => {

        setStatus(event.target.value);


    };


    const [datas, setData] = useState([]);

    const columns = [
        { id: "sr", field: "sr", headerName: 'S.No', maxWidth: 10 },
        { id: 'id', field: 'id', headerName: 'ComplaintId', minWidth: 50 },
        {
            id: 'productCustomer',
            field: 'productCustomer',
            subId: 'productName',
            headerName: 'Product',
            minWidth: 120,
            renderCell: (params) => (
                <a>{params.row.productCustomer.productName}</a>
            ),
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'problem',
            field: 'problem',
            headerName: 'Problem',
            // format: (value) => value.toLocaleString('en-US'),
            minWidth: 120,
        },
        {
            id: 'customerName',
            field: 'customerName',
            headerName: 'Customer',
            minWidth: 70,
            // format: (value) => value.toFixed(2),
        },
        {
            id: 'createdDateTime', field: 'createdDateTime', headerName: 'Complaint Time', minWidth: 170,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            type: "date"
        },
        { id: 'engineerName', field: 'engineerName', headerName: 'Engineer', minWidth: 70 },
        {
            id: 'estimatedDateTime', field: 'estimatedDateTime', headerName: 'Estimated End Time', minWidth: 170,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
            type: "date"
        },
        { id: 'complaintStatus', field: 'complaintStatus', headerName: 'Status', minWidth: 170 },
        {
            id: 'priority', field: 'priority', headerName: 'Priority', minWidth: 70,

            renderCell: (params) => (
                <Label

                    color={params.row.priority === "High" ? "error" : params.row.priority === "Medium" ? "warning" : "success"}
                >
                    {params.row.priority}
                </Label>
            )

        },
        // { id: 'action',field: 'action', label: 'Action', align: 'center', minWidth: 70 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => routeChange1(params.id)}
                >
                    Details
                </Button>
            ),
        },
    ];






    const token = localStorage.getItem('token');


    // const searchItem = rows.filter(row => {
    //     return (search === '')
    //       || (row.productCustomer.productName.toLowerCase().includes(search.toLowerCase()))
    //       || (row.problem.toLowerCase().includes(search.toLowerCase())) 
    //       || (row.customerName.toLowerCase().includes(search.toLowerCase()))
    //       || (row.engineerName!==null?row.engineerName.toLowerCase().includes(search.toLowerCase()):row)
    //       || (row.complaintStatus.toLowerCase().includes(search.toLowerCase()))?
    //       row : null;

    //   })
    const searchItem = rows.filter(row => {
        return (search === '') || columns.map((column) => row[column.id] !== undefined
            && row[column.id].toString().toLowerCase().includes(search.toLocaleLowerCase())).reduce((x, y) => x || y)
            || (row.productCustomer.productName.toLowerCase().includes(search.toLowerCase()))
            ? row : null;
    })



    console.log()



    const routeChange1 = (id) => {
        // console.log(id)
        navigate("/Dashboard/Taskdetail", { state: { taskId: id } });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}/api/user/complaint/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            },

        })

            .then(response => response.json())
            .then(json => {
                console.log("Fetched data:", json.data); // This line will print the data to the console
                setRows(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);





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

    //    let sr = 0;







    return (
        <div >
            <Grid >
                <Box sx={{ flexGrow: 6 }}>
                    <AppBar style={{ backgroundColor: '#449355' }} position="static">
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
                                    key="password"
                                    value={search}
                                    autoFocus
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Search>


                        </Toolbar>
                    </AppBar>
                </Box>


                <Grid item xs={12} >
                    <Item>
                        <Card >


                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                                <TableContainer sx={{ maxHeight: 500 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        {/* <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell

                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead> */}


                                        <div style={{ height: 400, width: '100%' }}>
                                            <DataGrid rows={rows} columns={columns} pageSize={10}
                                                rowsPerPageOptions={[10, 20]}
                                            />
                                        </div>




                                        {/* <TableBody>
                                            {
                                                searchItem
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
                                        </TableBody> */}
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </Paper>

                        </Card>


                    </Item>
                </Grid>












            </Grid>

        </div>

    );

}