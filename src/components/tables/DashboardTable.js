import * as React from 'react';
import { useState,useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Label from '../label/Label';

import baseUrl from '../../utils/baseUrl';

const columns = [
  { id:"SR", label: 'S.No', minWidth: 10 },
  { id: 'id', label: 'TaskId', minWidth: 100 },
  {
    id:'productCustomer',
    subId:'productName',
    label: 'Product',
    minWidth: 150,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'problem',
    label: 'Task',
    minWidth: 470,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'customerName',
    label: 'Customer',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  { id: 'createdDateTime', label: 'Complaint Time', align: 'center', minWidth: 170 },
  { id: 'engineerName', label: 'Engineer', align: 'center', minWidth: 170 },
  { id: 'estimatedDate', label: 'Estimated End Time', align: 'center', minWidth: 170 },
  { id: 'complaintStatus', label: 'Status', align: 'center', minWidth: 170 },
  { id: 'priority', label: 'Priority', align: 'center', minWidth: 170 },
  { id: 'action', label: 'Action', align: 'center', minWidth: 170 },
];



export default function DashboardTable({token}) {
  const navigate=useNavigate();
 
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const[rows,setRows]=useState([])

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const routeChange1 = (id) => {
    navigate("/Dashboard/Taskdetail",{state:{taskId:id}});
}


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
          console.log(dataTemp[0].productCustomer.productName);
          setRows(json.data);
          
    })
  
  }, []);



  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
          </TableHead>
          <TableBody>
            { 
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      
                     const value=column.id==="productCustomer"?row[column.id][column.subId]:row[column.id]
                     
                      if (column.id === 'compaintStatus') {
                        console.log(value);
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
                          console.log(value);
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
                       
                      
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {value === null? '' : String(value)}
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