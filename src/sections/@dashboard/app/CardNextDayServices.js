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

CardNextDayServices.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  completed: PropTypes.number,
  sx: PropTypes.object,
};


export default function CardNextDayServices({ title, total, completed, icon, color, sx, ...other }) {


  return (
    <div style={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(68, 147, 85, 1)', borderRadius: '12px' }}>
      <div className='row'>
        <div className='col-md-3 col-sm-4 col-3'>
          <div style={{ textAlign: "center", margin: "10% 0 0 20%", backgroundColor: "white", color: "black", borderRadius: "30px" }}>
            <b style={{ color: "red", lineHeight: 1 }}>{new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toLocaleString('en-EN', { weekday: "long" }).substring(0, 3).toUpperCase()}</b>
            <h3 style={{ lineHeight: 1 }}>{new Date().getDate() + 1}</h3>
          </div>
        </div>
        <div className='col-md-9 col-sm-8 col-9'>
          <Card
            sx={{
              py: 2,
              backgroundColor: 'rgba(68, 147, 85, 1)',
              color: 'rgba(255, 255, 255, 1)',
              // color: (theme) => theme.palette[color].darker,
              // bgcolor: (theme) => theme.palette[color].lighter,

              textAlign: "center",
              margin: "auto"




            }}
            {...other}
          >

            <div style={{ alignItems: 'center', }}>
              <Typography variant="h3">Next Day</Typography>
              <Typography variant="h3">Scheduled</Typography>
              {/* <Typography variant="h3">{fShortenNumber(total)}</Typography> */}
              <Typography variant="h3">{total !== 0 ? total : "0"}</Typography>
            </div>


          </Card>
        </div>
      </div>
    </div>
  );
}
