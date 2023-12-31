// import {
//   Chart,
//   PieSeries,
//   Title
// } from '@devexpress/dx-react-chart-material-ui';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from "react-chartjs-2";

// import colors from 'src/theme/colors';

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, CircularProgress, Typography } from '@mui/material';
import DonutChart from 'react-donut-chart';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

// ChartJS.register(ArcElement, Tooltip, Legend);

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

CardBackLogServices.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  completed: PropTypes.number,
  sx: PropTypes.object,
};


export default function CardBackLogServices({ title, total, completed, icon, color, sx, ...other }) {


  return (
    <div style={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(0, 130, 148, 1)', borderRadius: '12px' }}>
      <div className='row'>

        <div className='col-md-3 col-sm-4 col-3'>
          <Iconify icon="mdi:clipboard-text-clock" width="60px" />
        </div>

        <div className='col-md-9 col-sm-8 col-9'>
          <Card
            sx={{
              py: 2,
              boxShadow: 5,
              textAlign: 'start',
              // color: (theme) => theme.palette[color].darker,
              // bgcolor: (theme) => theme.palette[color].lighter,

              justifyContent: 'center',
              alignItems: 'center',
              color: 'rgba(255, 255, 255, 1)',
              bgcolor: 'rgba(0, 130, 148, 1)',
              ...sx,
            }}
            {...other}
          >

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <Typography variant="h3">BackLog</Typography>
              <Typography variant="h3">Incomplete</Typography>
              {/* <Typography variant="h3">{fShortenNumber(total)}</Typography> */}
              <Typography variant="h3">{total !== 0 ? total : "0"}</Typography>
            </div>


          </Card>
        </div>
      </div>
      
    </div>
  );
}
