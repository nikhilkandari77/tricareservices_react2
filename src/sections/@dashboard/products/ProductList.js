import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};


export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
    
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={3} md={12}>
          {/* <ShopProductCard product={product} /> */}
          
            <producttable/>

        </Grid>
        
      ))} 
      
    </Grid>
    
  );
}
