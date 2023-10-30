import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, // y
  //   BarElement,
  //   Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'; // specific한 타입의 차트 import 필요
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale, // y
  //   BarElement,
  //   Title,
  Tooltip,
  Legend
); // activate chartJS

export const options = {
  indexAxis: 'y' as const, // horizontal로 만듭니다
  scales: {
    x: {
      // bar 너비 조정
      // categoryPercentage: 0.7,
      // maxBarThickness: 20,
      stacked: true,
      gridLines: {
        display: false,
      },
    },

    y: {
      beginAtZero: true,
      stacked: true, // single row로 만들기
      grid: {
        display: false,
      },
    },
  },
  elements: {
    bar: {
      // borderWidth: 1,
      // borderCapStyle: 'round', // 선 끝을 둥글게
      // borderJoinStyle: 'bevel', // 꺾이는 모서리를 둥글게
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
  // cornerRadius: 50, // roundedBar.js 적용했을 경우
};

const HorizontalStackedBar = () => {
  const data = {
    labels: ['Total'],
    datasets: [
      {
        label: 'Outer',
        data: [10],
        backgroundColor: '#6FA8FF',
      },
      {
        label: 'Top',
        data: [20],
        backgroundColor: '#FF7C7C',
      },
      {
        label: 'Bottom',
        data: [25],
        backgroundColor: '#FFE177',
      },
      {
        label: 'Item',
        data: [5],
        backgroundColor: '#5FDA64',
      },
    ],
  };

  return (
    <div className="h-[100px] w-[80%]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalStackedBar;
