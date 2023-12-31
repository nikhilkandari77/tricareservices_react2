import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, colors } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  const state = {
    options: {
      plotOptions: { bar: { columnWidth: '30%' } },
      fill: { type: chartData.map((i) => i.fill) },
      chart: {
        id: "engineersworkload"
      },
      xaxis: {
        categories: chartLabels
      }
    },
    series: chartData
  };

  return (
    <Card >
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 0, pb: 0 }} dir="ltr">
        <ReactApexChart options={state.options}
              series={state.series}
              type="bar" height={300} />


      </Box>
    </Card>
  );
}
