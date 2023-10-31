

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
import { Icon } from '@iconify/react';
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
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Card, Container, TextField, Typography, DialogContent, DialogContentText, Grid, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import DetailsIcon from '@mui/icons-material/Details';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';
import LazyLoad from 'react-lazyload';
import './custom.css';
import { Info, InfoSharp } from '@mui/icons-material';

import baseUrl from '../../../utils/baseUrl';
import Iconify from '../../../components/iconify';
import ImageSlide from './ImageSlide'





const columns = [
  { id: 'sr', label: 'Sr.No', minWidth: 10, align: 'center' },
  { id: 'imageList', label: ' Image', minWidth: 50, align: 'center' },
  { id: 'id', label: 'Product Id', minWidth: 100, align: 'center' },
  { id: 'name', label: 'Name', maxWidth: "60", align: 'center' },
  { id: 'category', label: ' Category', minWidth: 10, align: 'center' },

  {
    id: 'button',
    label: 'Action',
    minWidth: "7rem",
    align: 'center',
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
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState({})
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [circularProgress, setCircularProgress] = useState(false);
  const destroyData = () => {
    setName('');
    setCategory('')
    setDescription('')
    setImages([])
    setId(null);
    setImageList([]);
    setDeleteImages([]);
    setExcelFile(null);
  }

  const handleSubmitExcel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("excelSheet", excelFile[0]);
    try {
      setCircularProgress(true);
      const response = await fetch(`${baseUrl}/api/user/product-master/import/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`

        },

        body: formData,
      }).finally(() => {
        setLoading(false);
      });

      if (response.ok) {
        console.log('Product added successfully');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
        toast.success('Product added successfully'); // Display success toast
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        const errorMessage = await response.text().then(text=>JSON.parse(text)); // Extract backend error message
        console.error('Invalid product data format', errorMessage);
        toast.error(`Invalid product data format: ${errorMessage.message}`);
    }
    } catch (error) {
      console.error('Error while adding product:', error);
      toast.error('Error while adding product'); // Display error toast
    } finally {
      setCircularProgress(false); // Set loading back to false after submission is complete
    }


  };


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


  const searchItem = rows.filter(row => (search === '') || columns.map((column) => row[column.id] !== undefined && row[column.id] !== null
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
    const newRowsPerPage = event.target.value;

    // Set the loading state to true when changing rowsPerPage
    setLoading(true);

    // Update the rowsPerPage state
    setRowsPerPage(newRowsPerPage);

    // Simulate fetching data or any asynchronous operation
    // Replace this with your actual data fetching logic
    setTimeout(() => {
      // After data is fetched or processed, set loading back to false
      setLoading(false)
    }, 3000);
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
    ;
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
        setRefresh((prevRefresh) => !prevRefresh);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 0) {
      if (images.length > 4) {
        toast.error("images must be upto 4");
        return "";
      }
      let size = 0;
      images.forEach(image => {
        size += image.size
        return "";
      });
      if (size > 10e6) {
        toast.error("images must be upto 10mb");
        return "";
      }
    }
    setLoading(true);

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
      }).finally(() => {
        setLoading(false);
      });

      if (response.ok) {
        console.log('Product added successfully');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
        toast.success('Product added successfully'); // Display success toast
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        console.error('Failed to add product');
        toast.error('Failed to add product'); // Display error toast
      }
    } catch (error) {
      console.error('Error while adding product:', error);
      toast.error('Error while adding product'); // Display error toast
    }
    return "";

  };


  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (deleteImages.length > 0)
      submitDeleteImages(token)

    if (images.length > 0) {
      if (images.length > 4) {
        toast.error("images must be upto 4");
        return;
      }
      let size = 0;
      images.forEach(image => {
        size += image.size
        return "";
      });
      if (size > 10e6) {
        toast.error("images must be upto 10mb");
        return;
      }
    }


    setCircularProgress(true)

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
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        setCircularProgress(false)
        console.error('Failed to update product');
        toast.error('Failed to update product'); // Display error toast
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      toast.error('Error while updating product'); // Display error toast
    }
  };
  const handleDeleteOption = async (row) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");

    if (!isConfirmed) {
      // User canceled the deletion
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/user/product-master/${row.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`

        }
      });

      if (response.ok) {
        console.log('Product Deleted successfully');
        destroyData();
        handleClickClose1();
        handleUpdateClose();
        toast.success('Product deleted successfully'); // Display success toast
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        console.error('operation not allowed', response);
        toast.error('Operation not allowed'); // Display error toast
      }
    } catch (error) {
      console.error('Error while updating product:', error);
      toast.error('Error while updating product'); // Display error toast
    }
  }


  useEffect(() => {
    setLoading(true);
    setCircularProgress(false)
    fetch(`${baseUrl}/api/user/product-master/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
          Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
          if (!response.ok) {
              // Handle non-OK responses (e.g., 404 Not Found, 500 Internal Server Error)
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(json => {
          console.log("Fetched data:", json); // This line will print the data to the console
          // setUsers(json);
          setRows(json.data.map((row, i) => ({ ...row, sr: i + 1 })));
          getCategories(token);
      })
      .catch(error => {
          // Handle errors that occurred during the fetch
          console.error('Error during fetch:', error);
          toast.error('Services not available');
      })
      .finally(() => {
          setLoading(false);
      });

  }, [refresh]);
  //  [updateForm, openUser]
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



    navigate("/admin/customers/details", { state: { userId: id } });


  }


  const CustomNextArrow = (props) => (
    <button
      {...props}
      style={{
        display: 'block',
        position: 'absolute',
        top: '50%',
        right: 2,
        transform: 'translateY(-50%)',
        backgroundColor: 'transparent', // Set the background color for the next arrow
        color: 'black', // Set the text color
        border: 'none',
        borderRadius: '50%',
        padding: 5,
        cursor: 'pointer',
        fontSize: "3vw"
      }}
    >
      {" > "}
    </button>

  );



  const CustomPrevArrow = (props) => (
    <button
      {...props}
      style={{
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: 2,
        zIndex: 9994542,
        transform: 'translateY(-50%)',
        backgroundColor: 'transparent', // Set the background color for the previous arrow
        color: 'black', // Set the text color
        border: 'none',
        borderRadius: '50%',
        padding: 5,
        cursor: 'pointer',
        fontSize: "3vw"
      }}
    >
      {" < "}
    </button>
  );


  if (loading) {
    return <div>Loading...</div>;
  }


  return (



    <div>
      <Grid container spacing={1} item xs={12}>



        <Box sx={{ flexGrow: 6 }} item xs={12}>
          <AppBar style={{ backgroundColor: '#007F6D', borderRadius: "3px" }} position="static">
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

                        <form onSubmit={handleSubmit}>
                          <br />
                          <Grid container spacing={3}>
                            {/* First Column */}

                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                inputProps={{ maxLength: 50 }}

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
                                  required
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
                                  <InputLabel id="products-images">Upload image</InputLabel>

                                  <Input
                                    type="file"
                                    onChange={(e) => imageHandler(e)}
                                    id="products-images"
                                    inputProps={{ multiple: true, accept: ['.png'] }}
                                  />

                                </Grid >
                              </Grid><br />
                              <Grid item xs={12}>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  type='submit'
                                  disabled={circularProgress}
                                >
                                  {circularProgress ? <CircularProgress /> : "Submit"
                                  }
                                </Button>

                                <Button
                                  onClick={handleClickClose1}
                                  style={{ color: 'red', }}
                                >
                                  Close
                                </Button>
                              </Grid>

                            </Grid>
                          </Grid><br />

                        </form>
                        <form onSubmit={handleSubmitExcel}>
                          <Grid container spacing={3}>

                            <Grid item xs={6}>
                              <Grid >
                                <InputLabel id="products-images">Import Products(.xlsx)</InputLabel>
                                <Input
                                  type="file"
                                  onChange={(e) => setExcelFile(Array.from(e.target.files))}
                                  id="products-images"
                                  inputProps={{ accept: ['.xlsx'] }}
                                  required
                                />
                              </Grid>
                            </Grid>

                            <Grid item xs={6} style={{ position: "relative", display: "flex", alignItems: "flex-end", }}>
                              <Button
                                type='submit'
                                variant="contained"
                                style={{ color: 'white', background: "green" }}
                                disabled={circularProgress}
                              >
                                {circularProgress ? <CircularProgress size={24} color="inherit" /> : 'Import'}
                              </Button>
                            </Grid>

                          </Grid>
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


                                else if (column.id === "imageList") {



                                  return (
                                    <TableCell>
                                      <div style={{ display: "flex", margin: "auto", textAlign: "center", alignItems: "center" }}>
                                        {value === undefined || value === null || value.length === 0 ? (
                                          <img style={{ height: "10vh", margin: "auto" }} src="/products/logo.png" alt='product' />
                                        ) : (
                                          // <LazyLoad height={100} offset={100}>
                                          <img style={{ height: "10vh", margin: "auto" }} loading="lazy" src={`${baseUrl}${value[0]}`} alt='product' />
                                        )}
                                      </div>
                                    </TableCell>
                                  )

                                }
                                else if (column.id === 'button') {
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      <Button onClick={() => handleClickOpen(row)} title="Details" ><InfoSharp color="primary" /></Button>
                                      <Button onClick={() => handleUpdateOpen(row)} title="Update" ><UpdateIcon color='info' />
                                      </Button>
                                      <Button onClick={() => handleDeleteOption(row)} title="Delete" ><DeleteIcon color='error' /></Button>

                                      <Dialog
                                        open={updateForm}
                                        onClose={handleUpdateClose}


                                        fullWidth
                                        maxWidth="md"

                                        style={{
                                          backgroundColor: 'transparent',
                                          boxShadow: 'none',
                                        }}
                                      >
                                        <DialogTitle id="alert-dialog-title" >
                                          {"Update Product"}
                                        </DialogTitle>
                                        <DialogContent >

                                          <DialogContentText>

                                            <Container maxWidth="md">

                                              <form onSubmit={handleSubmit2} encType="multipart/form-data">
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
                                                      multiline
                                                      inputProps={{ maxLength: 50 }}
                                                      required
                                                    />

                                                    {/* Repeat for other fields in the first column */}
                                                  </Grid>

                                                  {/* Second Column */}
                                                  <Grid item xs={12} sm={6}>

                                                    <FormControl sx={{ minWidth: 170 }} size="medium" fullWidth>
                                                      <InputLabel id="demo-select-small-label">Category</InputLabel>
                                                      <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        value={category}
                                                        label="Select Category"
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        required
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

                                                      <Grid marginTop={2}>
                                                        <InputLabel id="products-images">Upload image</InputLabel>

                                                        <Input
                                                          type="file"
                                                          onChange={(e) => setImages(Array.from(e.target.files))}
                                                          id="products-images"
                                                          inputProps={{ multiple: true, accept: ['.png'] }}
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                  <Grid item md={12}>
                                                    <TextField
                                                      label="Description"
                                                      value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
                                                      fullWidth
                                                      required
                                                      multiline
                                                      margin="normal" // Added margin for spacing between fields
                                                    /><br /><br />
                                                    <div style={{ textAlign: "center" }}><h5>Select images for delete</h5></div>
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
                                                          checkedIcon={<div>selected<img src="/assets/icons/delete_icon.png" alt={`${img}`} /></div>} />

                                                      </Grid>
                                                    )
                                                  }

                                                </Grid>
                                                <DialogActions>
                                          
                                                  <Button
                                                  
                                                    variant="contained"
                                                    color="primary"
                                                    type='submit'
                                                    disabled={circularProgress}
                                                  >
                                                    {circularProgress ? <CircularProgress /> : "Submit"
                                                    }
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
                                      <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        data={data}
                                        fullWidth
                                        maxWidth="xl"
                                      >
                                        <DialogTitle id="alert-dialog-title" style={{ border: "2px solid black", borderRadius: "0 0 10px 10px" }}>
                                          <h3>Product Details</h3>
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
                                                  <br />
                                                  <Carousel

                                                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                                      hasPrev && <CustomPrevArrow onClick={onClickHandler} />
                                                    }
                                                    renderArrowNext={(onClickHandler, hasNext, label) =>
                                                      hasNext && <CustomNextArrow onClick={onClickHandler} />
                                                    }




                                                  >


                                                    {
                                                      imageList.map(img =>
                                                        <div style={{ padding: "0 3vw 0 3vw", }}><img style={{ height: "100%", width: "100%" }} src={`${baseUrl}/resources/products/${id}/${img}`} alt={`${img}`} /></div>
                                                      )
                                                    }
                                                    {/* <p className="legend">Legend 3</p> */}



                                                  </Carousel>
                                                </div>


                                                <div className='col-md-6'>
                                                  <div><br />
                                                    <table width={"80%"} style={{ margin: "auto", textAlign: "left", color: "black" }}>
                                                      <tr>
                                                        <th><b>Product Id :</b></th><td>{id}</td>
                                                      </tr>
                                                      <tr>
                                                        <th><b>Product Name :</b></th><td>{name}</td>
                                                      </tr>
                                                      <tr>
                                                        <th><b>Category Name : </b></th><td>{categories.filter(c => c.id === category).map(c => c.name)}</td>

                                                      </tr>

                                                    </table>
                                                  </div>
                                                  <Box
                                                    sx={{
                                                      display: 'flex',

                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      minHeight: '40vh', // Set the minimum height to full viewport height
                                                    }}

                                                  >



                                                    <div style={{ overflowWrap: 'break-word', width: "100%" }}>
                                                      <h4 style={{ textAlign: "center", color: "black" }}>Description</h4>

                                                      <br />
                                                      <div style={{ border: "2px solid black", padding: "1vw", borderRadius: "10px" }}>
                                                        <p >{description}</p>
                                                      </div>
                                                    </div>



                                                  </Box>

                                                </div>
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
                                    <div style={{ overflowWrap: 'break-word', width: "7rem", textAlign: "center", margin: "auto" }}>{value}</div>
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
                  count={searchItem.length}
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

    </div >
  );

}