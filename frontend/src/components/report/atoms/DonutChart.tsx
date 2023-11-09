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
  owner: string;
  colorAmountArray: ColorAmountProp[]; // Define the prop here
}

export function DonutChart({ owner, colorAmountArray }: DonutChartProps) {
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
    <div className="flex justify-evenly w-[100%] h-[300px] mb-6">
      <div className="w-[50%]">
        <Doughnut data={data} />
      </div>
      <div className="rounded-[30px] my-auto p-4 bg-gray-200 flex flex-col justify-center w-[30%] h-[100%] text-center">
        <div className="text-WebBody2 mb-5">
          {owner === '당신' ? '당신이' : '모으또 평균 유저가'} 가장 좋아하는 색은?
          <div style={{ background: backgroundArray[0] }} className="my-2 text-WebBody2 font-bold">
            {labels[0]}입니다.
          </div>
        </div>

        {labels.map((item, index) => (
          <div style={{ color: backgroundArray[index] }} className="block w-[100%]">
            {index + 1}위 {item} {amount[index]}벌
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
