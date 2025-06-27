import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export interface IncomeExpense {
  income: number;
  expense: number;
}

interface Props {
    months:string[] |undefined
    data: IncomeExpense[] | undefined;
}  

export default function ChartBar({ data , months}: Props) {
  if (!data || data.length < 3 ||!months) return <div>داده‌ای برای نمایش وجود ندارد</div>;

  return (
    <BarChart
      xAxis={[{ data: months }]}
      series={[
        {
          label: 'درآمد',
          data: [data[0].income, data[1].income, data[2].income],
                    // color: '#FFFFFF', // سفید

        },
        {
          label: 'هزینه',
          data: [data[0].expense, data[1].expense, data[2].expense],
                    // color: '#FFFFFF', // سفید

        },
      ]}
      height={200}
      slotProps={{
    legend: {
      sx: {
         color:"white"
      },
    },
  }}

    />
  );
}
