
import { Pie } from '@ant-design/plots';
import { useGetDashboardStatusQuery } from '../../../redux/features/dashboard/dashboardApi';

const DemoPieChart = () => {

const  {data:getdata } = useGetDashboardStatusQuery();
  const {totalBid, totalProduct} = getdata || {};
  console.log('totalBid:', totalBid);
  console.log('totalProduct:', totalProduct);

  const data = [
    { type: 'Total Bid', value: totalBid },
    { type: 'Total Product', value: totalProduct },
  ];

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    radius: 1,
    autoFit: true,
    style: {
      backgroundColor: '#EEF9FE', // chart background
    },
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fontWeight: 600,
        fill: '#222', // label text color
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.type,
        value: `${datum.value} (${((datum.value / 110) * 100).toFixed(1)}%)`,
      }),
    },
    legend: {
      position: 'top',
      rowPadding: 5,
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'P&L\nTotal growth\n65%',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          fill: '#48B1DB', // accent text color
        },
      },
    ],
    color: ['#48B1DB', '#FF7F50'], // Primary + Coral
  };

  return (
    <div style={{ backgroundColor: '#EEF9FE', padding: '0.5rem', borderRadius: '12px' }}>
      {/* Set the height here */}
      <Pie {...config} height={420} />  {/* Adjust the height as needed */}
    </div>
  );
};

export default DemoPieChart;
