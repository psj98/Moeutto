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
    <div className="flex flex-col justify-center items-center mb-5">
      <div className="w-[75%] mb-8">
        <Doughnut data={data} />
      </div>
      <div className="w-[100%] flex flex-row flex-wrap items-center justify-evenly">
        {labels.map((item, index) => (
          <div
            style={{ backgroundColor: backgroundArray[index] }}
            className={`${
              item === 'white' ? 'border-black' : `border-[${backgroundArray[index]}]`
            } border rounded-3xl block px-4 py-1 mb-5`}>
            <span className={`${item === 'black' ? 'text-white' : `text-`} text-base font-bold`}>{item} </span>
            <span className={`${item === 'black' ? 'text-white' : `text-`} text-sm font-bold`}>{amount[index]}벌</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
