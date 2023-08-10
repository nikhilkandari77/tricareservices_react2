// import {
//   Chart,
//   PieSeries,
//   Title
// } from '@devexpress/dx-react-chart-material-ui';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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

CardTodayServices.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  radius: '100%',
  position: 'relative',
  legend: {
    display: false, // Disable the legend
  },
};



export default function CardTodayServices({ title, total,completed, icon, color, sx, ...other }) {


  const data = {
    labels: [`Completed `, `In Progress `],
    datasets: [
      {
        label: 'Services',
        data: [completed ,total - completed ],
        backgroundColor: [
          
          'rgb(46, 204, 32, 1)',
          'rgb(255,255,0)',
        ],
        borderColor: [
          
          'rgb(46, 204, 32, 1)',
          'rgb(255,255,0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card
      sx={{
        py: 2,
        px: 10,
        boxShadow: 10,   
        textAlign: 'start',
        // color: (theme) => theme.palette[color].darker,
        // bgcolor: (theme) => theme.palette[color].lighter,
        width: '350px', // Specify the desired width
        height: '180px', // Specify the desired height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(255, 255, 255, 1)',
        bgcolor: 'rgba(0, 91, 167, 1)',
        ...sx,
      }}
      {...other}
    >

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
          <Typography variant="h3">Today</Typography>
          <Typography variant="h3">Services</Typography>
          <Typography variant="h3">{fShortenNumber(total)}</Typography>
      </div>

      {/* <Typography variant="h3">Today</Typography>

      <Typography variant="h3">Services</Typography>

      <Typography variant="h3">{fShortenNumber(total)}</Typography> */}

      {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography> */}
      
      {/* <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%',
      }}
      >
        <Doughnut data={data} options={options} />
      </div> */}
        

    </Card>
  );
}
