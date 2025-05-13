import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the data for the chart
const data = [
  { name: '10:30 AM', uv: 1000 },
  { name: '11:00 AM', uv: 2000 },
  { name: '11:30 AM', uv: 1800 },
  { name: '12:00 PM', uv: 2780 },
  { name: '12:30 PM', uv: 2890 },
  { name: '01:00 PM', uv: 3390 },
  { name: '01:30 PM', uv: 2490 },
];

const PureComponentChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
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
          fill="url(#gradient)" // Apply the gradient
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"> {/* Set the gradient direction */}
            <stop offset="0%" stopColor="#72C2E3" stopOpacity={0.8} /> {/* First color stop */}
            <stop offset="100%" stopColor="#EEF9FE" stopOpacity={0.8} /> {/* Second color stop */}
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PureComponentChart;
