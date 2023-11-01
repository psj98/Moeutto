import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ColorPalette from '../../common/ColorPalette';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface ColorAmountProp {
  color: string;
  amount: number;
}

interface DonutChartProps {
  colorAmountArray: ColorAmountProp[]; // Define the prop here
}

export function DonutChart({ colorAmountArray }: DonutChartProps) {
  const labels: string[] = colorAmountArray.map(row => row.color); // color 키의 값들의 object를 값을 뽑아 array로 만든다.

  const amount: number[] = colorAmountArray.map(row => row.amount);

  // labels에 존재하는 컬러를 기준으로 backgroundArray를 동적으로 생성해야 합니다
  const backgroundArray = labels.map(row => {
    // labels = [ 'red', 'blue' ]
    const color = row; // "red", "blue"
    const record = ColorPalette.find(function (item, index, arr) {
      return item.name === color; // return { name: 'red', kr: '빨강', background: '#FFA7A7' }
    });

    return record?.background; // '#FFA7A7'
  });

  const data = {
    labels,
    datasets: [
      {
        label: '#의 옷의 갯수',
        data: amount,
        backgroundColor: backgroundArray,
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} />
    </>
  );
}

export default DonutChart;
