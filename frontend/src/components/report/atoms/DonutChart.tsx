import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ColorPalette from '../../common/ColorPalette';

ChartJS.register(ArcElement, Tooltip, Legend);

/*
{
	"myAnalysisColor": [ // 내 옷장 분석
		{
			"color": String, // 색상
			"amount": int, // 개수
		}, ...
	],
	"userAnalysisColor": [ // 모든 사용자 평균 옷장 분석
		{
			"color": String, // 색상
			"amount": int, // 개수
		}, ...
	],
}

 */

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

  // let backgroundColor: string[];
  const backgroundColor: string[] = colorAmountArray.map(row => row.color);

  // function makeBackgroundColorArray() {
  //   function isMatched(element: Array, color: string) {
  //     if (element.name === color) {
  //       return true;
  //     }
  //   }

  //   backgroundColor = labels.map(color => ColorPalette.find(color);
  // }
  console.log(backgroundColor);

  const data = {
    labels,
    datasets: [
      {
        label: '#의 옷의 갯수',
        data: amount,
        backgroundColor,
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        // borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default DonutChart;
