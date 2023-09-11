

import React, { useState, useEffect, useRef, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import './custom.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import { Button, Card, Container, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';
import baseUrl from '../../../utils/baseUrl';
import Iconify from '../../../components/iconify';
import ImageSlide from './ImageSlide'




const columns = [
  { id: 'Sr.No', label: 'Sr.No', minWidth: 10 },
  { id: 'imageName', label: ' Image', minWidth: 50 },
  { id: 'id', label: 'Product Id', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'category', label: ' Category', minWidth: 100 },

  {
    id: 'button',
    label: 'Action',
    minWidth: 70,
    align: 'left',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'update',
    label: 'Update',
    minWidth: 70,
    align: 'left',
    // format: (value) => value.toFixed(2),
  }
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




export default function StickyHeadTable() {
  const [updateForm, setUpdateOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [images, setImages] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(0)
  const [description, setDescription] = useState('')
  const [data, setData] = useState({})
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [imageList, setImageList] = useState([]);

  const destroyData = () => {
    setName('');
    setCategory('')
    setDescription('')
    setImages([])
    setId(null);
    setImageList([]);
    setDeleteImages([]);
  }
  const setRowData = (row) => {
    setId(row.id);
    setName(row.name);
    setCategory(row.category.id)
    setDescription(row.description)
    if (row.imageName !== null && row.imageName !== undefined) {
      setImageList(row.imageName.split(','))
    }

  }
  const imageHandler = (e) => {
    const array = Array.from(e.target.files);
    setImages(array);

  }
  const token = localStorage.getItem('token');

  // const searchItem = rows.filter(row => {
  //   return (search === '')
  //     || (row.category.name.toLowerCase().includes(search.toLowerCase()))
  //     || (row.name.toLowerCase().includes(search.toLowerCase())) ?
  //     row : null;

  // })
  const searchItem = rows.filter(row => (search === '') || columns.map((column) => row[column.id] !== undefined
      && row[column.id].toString().toLowerCase().includes(search.toLocaleLowerCase())).reduce((x, y) => x || y)
      || (row.category.name.toLowerCase().includes(search.toLowerCase()))
      ? row : null)

  const deleteImagesHandler = (e) => {
    if (deleteImages.includes(e.target.value))
      setDeleteImages(deleteImages.filter(img => img !== e.target.value))
    else
      setDeleteImages([...deleteImages, e.target.value])
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

  const handleClickOpen = (row) => {
    setRowData(row);
    setOpen(true);

  };

  const handleClose = () => {
    destroyData();
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

  const handleUpdateOpen = (row) => {
    setRowData(row);
    setUpdateOpen(true);
  }
  const handleUpdateClose = () => {
    destroyData();
    setUpdateOpen(false);
  }

  const submitDeleteImages = async () => {
    const imageListForm = new FormData()
    deleteImages.map(image => imageListForm.append("imageList", image))
    console.log(deleteImages)
    try {
      const response = await fetch(`${baseUrl}/api/user/product-master/image/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`

        },

        body: imageListForm,
      });

      if (response.ok) {
        console.log('image deleted');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
      } else {
        console.error('failed to delete');
      }
    } catch (error) {
      console.error('error for deletion', error);
    }
  }



  // Form submission handler
  const handleSubmit = async () => {


    const formData = new FormData();
    formData.append("name", name);
    formData.append("category.id", category);
    formData.append("description", description);
    for (let i = 0; i < images.length; i += 1) {
      formData.append(`images`, images[i])
    }
    try {
      const response = await fetch(`${baseUrl}/api/user/product-master/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`

        },

        body: formData,
      });

      if (response.ok) {
        console.log('Product added successfully');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
        toast.success('Product added successfully'); // Display success toast
      } else {
        console.error('Failed to add product');
        toast.error('Failed to add product'); // Display error toast
      }
    } catch (error) {
      console.error('Error while adding product:', error);
      toast.error('Error while adding product'); // Display error toast
    }
  };



  const handleSubmit2 = async () => {


    if (deleteImages.length > 0)
      submitDeleteImages(token)



    const formData = new FormData();
    if (id !== null)
      formData.append("id", id);
    formData.append("name", name);
    formData.append("category.id", category);
    formData.append("description", description);
    for (let i = 0; i < images.length; i += 1) {
      formData.append(`images`, images[i])
    }
    try {
      const response = await fetch(`${baseUrl}/api/user/product-master/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`

        },

        body: formData,
      });

      if (response.ok) {
        console.log('Product updated successfully');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
        toast.success('Product updated successfully'); // Display success toast
      } else {
        console.error('Failed to update product');
        toast.error('Failed to update product'); // Display error toast
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      toast.error('Error while updating product'); // Display error toast
    }
  };


  useEffect(() => {
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
        setRows(json.data);
        getCategories(token);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [updateForm, openUser]);

  const getCategories = (token) => {
    fetch(`${baseUrl}/api/user/category/`, {
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
        setCategories(json.data)

      })

  }


  const routeChange4 = (id) => {



    navigate("/dashboard/customerdetail/", { state: { userId: id } });


  }


  if (loading) {
    return <div>Loading...</div>;
  }


  let sr = 0;

  return (



    <div>
      <Grid container spacing={1} item xs={12}>



        <Box sx={{ flexGrow: 6 }} item xs={12}>
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
                  autoFocus
                  onChange={(e) => setSearch(e.target.value)}

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
                        {images.length === 0 ? "" :
                          <Grid sx={12} margin={"normal"}>
                            <img src={URL.createObjectURL(images[0])} alt='product' />
                          </Grid>
                        }

                        <form >
                          <br />
                          <Grid container spacing={3}>
                            {/* First Column */}

                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                required
                              />
                              <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                required
                                multiline
                                margin="normal" // Added margin for spacing between fields
                              />
                              {/* Repeat for other fields in the first column */}
                            </Grid>

                            {/* Second Column */}
                            <Grid item xs={12} sm={6}>

                              <FormControl sx={{ minWidth: 170 }} size="small" fullWidth>
                                <InputLabel id="demo-select-small-label">Category</InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={category}
                                  label="Select Category"
                                  onChange={(e) => setCategory(e.target.value)}
                                  fullWidth
                                >

                                  {categories.map(getCategory => (
                                    <MenuItem value={getCategory.id} key={getCategory.id}>
                                      {getCategory.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {/* Repeat for other fields in the second column */}
                              <Grid item xs={12}>
                                <Grid marginTop={4}>
                                  <InputLabel id="products-images">upload image</InputLabel>

                                  <Input
                                    type="file"
                                    onChange={(e) => imageHandler(e)}
                                    id="products-images"
                                    inputProps={{ multiple: true, accept: '.png' }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid><br />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={handleClickClose1}
                            style={{ color: 'red', }}
                          >
                            Close
                          </Button>
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
                <TableContainer sx={{ maxHeight: "70vh" }}>
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
                      {
                        searchItem
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                  let value = row[column.id];
                                  if (column.id === "category")
                                    value = value.name;

                                  else if (column.id === "Sr.No") {
                                    sr += 1
                                    value = sr;
                                  }
                                  else if (column.id === "imageName") {


                                    if (value !== null && value.toString().indexOf(",") > 0) {
                                      value = value.toString().substring(0, value.toString().indexOf(","));
                                      // console.log(value.toString().indexOf(","),value);
                                    }
                                    return (
                                      <TableCell margin={0}>

                                        {
                                          value === "" || value === undefined || value === null ?
                                            <img style={{ height: "10vh" }} src="/products/logo.png" alt='product' />
                                            :
                                            <img style={{ height: "10vh" }} src={`${baseUrl}/resources/products/${row.id}/${value}`} alt='product' />
                                        }

                                      </TableCell>
                                    )

                                  }
                                  else if (column.id === 'update') {

                                    return (
                                      <TableCell key={column.id} align={column.align}>

                                        <Button color="error" onClick={() => handleUpdateOpen(row)} variant="contained">Update</Button>

                                        <Dialog
                                          open={updateForm}
                                          onClose={handleUpdateClose}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                          style={{ height: '650px' }}
                                        >
                                          <DialogTitle id="alert-dialog-title">
                                            {"Update Product"}
                                          </DialogTitle>
                                          <DialogContent>

                                            <DialogContentText>

                                              <Container maxWidth="sm">

                                                <form encType="multipart/form-data">
                                                  <br />
                                                  <Grid container spacing={3}>
                                                    {/* First Column */}

                                                    <Grid item xs={12} sm={6}>
                                                      <TextField
                                                        label="Product Id"
                                                        value={id}
                                                        onChange={(e) => setId(e.target.value)}
                                                        fullWidth
                                                        required
                                                        disabled
                                                      // Added margin for spacing between fields
                                                      />
                                                      <TextField
                                                        label="Product Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        fullWidth
                                                        margin="normal"
                                                        required
                                                      />
                                                      <TextField
                                                        label="Description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        fullWidth
                                                        required
                                                        multiline
                                                        margin="normal" // Added margin for spacing between fields
                                                      />
                                                      {/* Repeat for other fields in the first column */}
                                                    </Grid>

                                                    {/* Second Column */}
                                                    <Grid item xs={12} sm={6}>

                                                      <FormControl sx={{ minWidth: 170 }} size="small" fullWidth>
                                                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                                                        <Select
                                                          labelId="demo-select-small-label"
                                                          id="demo-select-small"
                                                          value={category}
                                                          label="Select Category"
                                                          onChange={(e) => setCategory(e.target.value)}
                                                          fullWidth
                                                        >

                                                          {categories.map(getCategory => (
                                                            <MenuItem value={getCategory.id} key={getCategory.id}>
                                                              {getCategory.name}
                                                            </MenuItem>
                                                          ))}
                                                        </Select>
                                                      </FormControl>
                                                      {/* Repeat for other fields in the second column */}
                                                      <Grid item xs={12}>
                                                        <Grid marginTop={4}>
                                                          <InputLabel id="products-images">upload image</InputLabel>

                                                          <Input
                                                            type="file"
                                                            onChange={(e) => setImages(Array.from(e.target.files))}
                                                            id="products-images"
                                                            inputProps={{ multiple: true, accept: '.png' }}
                                                          />
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid><br />


                                                  <br />
                                                  <Grid container spacing={3}>
                                                    {
                                                      imageList.map(img =>

                                                        <Grid item xs={4} sm={4} margin={"normal"}>
                                                          {/* <button value={img} className="btn btn-default" onClick={(e)=>{setDeleteImages([...deleteImages,e.target.alt])}}>
                                                        <img src={`${baseUrl}/resources/products/${id}/${img}`}  alt={`${img}`} />
                                                      </button> */}
                                                          <Checkbox
                                                            value={img}
                                                            onClick={deleteImagesHandler}
                                                            icon={<img src={`${baseUrl}/resources/products/${id}/${img}`} alt={`${img}`} />}
                                                            checkedIcon={<img src="/assets/icons/delete_icon.png" alt={`${img}`} />} />

                                                        </Grid>
                                                      )
                                                    }

                                                  </Grid>
                                                  <DialogActions>
                                                    <Button

                                                      variant="contained"
                                                      color="primary"
                                                      onClick={handleSubmit2}
                                                    >
                                                      Submit
                                                    </Button>
                                                    <Button
                                                      onClick={handleUpdateClose}
                                                      style={{ color: 'red', }}
                                                    >
                                                      Close
                                                    </Button>
                                                  </DialogActions>



                                                </form>
                                              </Container>
                                              {
                                                console.log("image delete", deleteImages)
                                              }



                                            </DialogContentText>
                                          </DialogContent>

                                        </Dialog>
                                      </TableCell>

                                    );
                                  }


                                  else if (column.id === 'button') {
                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        <Button onClick={() => handleClickOpen(row)} variant="contained"> Details </Button>
                                        <Dialog
                                          open={open}
                                          onClose={handleClose}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                          data={data}
                                          fullWidth
                                          maxWidth="lg"
                                        >
                                          <DialogTitle id="alert-dialog-title">
                                            {"View Details"}
                                          </DialogTitle>
                                          <DialogContent>
                                            <DialogContentText>

                                              <div className='Container'>

                                                {/* {
                                                  imageList.map(img =>
                                                    <img src={`${baseUrl}/resources/products/${id}/${img}`} alt={`${img}`} />
                                                  )
                                                } */}
                                                <div className='row'>
                                                  <div className='col-md-6'>
                                                    <Carousel
                                                      showThumbs={false}
                                                      dynamicHeight={false}

                                                    >
                                                      <div>
                                                        <img width="100%" src="/products_images/front 23-01-2023.png" alt='p1' />
                                                        {/* <p className="legend">Legend 1</p> */}
                                                      </div>
                                                      <div>
                                                        <img src="assets/2.jpeg" alt='p2' />
                                                        {/* <p className="legend">Legend 2</p> */}
                                                      </div>
                                                      <div>
                                                        <img src="/products_images/front 23-01-2023.png" alt='p3' />
                                                        {/* <p className="legend">Legend 3</p> */}
                                                      </div>
                                                    </Carousel>
                                                  </div>


                                                  <div className='col-md-6'>

                                                    <Box
                                                      sx={{
                                                        display: 'flex',

                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        minHeight: '40vh', // Set the minimum height to full viewport height
                                                      }}
                                                    >

                                                      <table width={"100%"} style={{ lineHeight: "40px" }}>
                                                        <tr>
                                                          <th><b>Product Id :</b></th><td>{id}</td>
                                                        </tr>
                                                        <tr>
                                                          <th><b>Product Name :</b></th><td>{name}</td>
                                                        </tr>
                                                        <tr>
                                                          <th><b>Category Id : </b></th><td>{category}</td>
                                                        </tr>
                                                        <tr>
                                                          <th><b>Category Name: </b></th><td>{categories.filter(c => c.id === id).map(c => c.name)}</td>
                                                        </tr>
                                                      </table>

                                                    </Box>

                                                  </div>
                                                </div>
                                                <div className='row'>
                                                <h5>Description</h5>

                                                  <Box
                                                    sx={{
                                                      display: 'flex',

                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }}
                                                  >
                                                    <p>{description}</p>

                                                  </Box>
                                                </div>


                                              </div>




                                            </DialogContentText>
                                          </DialogContent>
                                          <DialogActions>
                                            <Button onClick={handleClose} style={{ color: 'red' }} >Close</Button>

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

                            ))}
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