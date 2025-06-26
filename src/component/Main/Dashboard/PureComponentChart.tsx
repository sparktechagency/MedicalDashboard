import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetTransactionRatioQuery } from '../../../redux/features/dashboard/dashboardApi';

const PureComponentChart = () => {
  const { data: dataget, isLoading, error } = useGetTransactionRatioQuery(undefined);
  // console.log("Data from API:", dataget);

  // Transform API data to chart format and set as fallback data
  const fallbackData = dataget?.map(item => ({
    name: item.monthName,
    uv: item.monthlyIncome
  })) || [];

  // Use the transformed API data as chart data
  const chartData = fallbackData;

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    // Still render chart with fallback data
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#72C2E3" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#EEF9FE" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
        <Tooltip
          formatter={(value) => {
            const numericValue = typeof value === 'number' ? value : 0;
            return `$${(numericValue / 1000).toFixed(2)}k`;
          }}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PureComponentChart;