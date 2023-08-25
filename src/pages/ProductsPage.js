// import ProductTable from 'src/sections/@dashboard/products/ProductTable';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar, ProductTable } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// import "./style.css";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products</title>
      </Helmet>

      <Grid  maxWidth="xs">
        {/* <Typography variant="h4" sx={{ mb: 2 }}>

          Products 
          
        </Typography> */}

        <Grid >
        
          <ProductTable />

        </Grid>


      </Grid>
    </>
  );
}
