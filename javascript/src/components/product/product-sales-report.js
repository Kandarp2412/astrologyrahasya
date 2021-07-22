import Chart from 'react-apexcharts';
import { Box, Card, CardHeader, Divider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const data = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      data: [0, 20, 40, 30, 30, 44, 90],
      name: 'Revenue'
    }
  ]
};

export const ProductSalesReport = (props) => {
  const theme = useTheme();

  const chart = {
    options: {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['rgba(49, 129, 237, 1)'],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient'
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      stroke: {
        curve: 'straight'
      },
      theme: {
        mode: theme.palette.mode
      },
      tooltip: {
        mode: theme.palette.mode
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        categories: data.categories,
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    },
    series: data.series
  };

  return (
    <Card
      variant="outlined"
      {...props}
    >
      <CardHeader title="ReportsSales" />
      <Divider />
      <Box sx={{ px: 1 }}>
        <Chart
          height="350"
          type="area"
          {...chart}
        />
      </Box>
    </Card>
  );
};
