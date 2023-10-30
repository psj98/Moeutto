import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'; // specific한 타입의 차트 import 필요

ChartJS.register(
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend
); // activate chartJS 하는 코드임

// chart의 속성을 정의함
const options = {
  indexAxis: 'y' as const, // 인덱스 축은 기본이 x인데 y로 바꿈
  maxBarThickness: 20, // 막대 두께 20으로 제한함
  borderRadius: 100,
  scales: {
    x: {
      max: 100, // x축 최대값은 100
      min: 0, // x축 최소값은 0
      beginAtZero: true, // 0부터 시작함
      display: true, // 가로축 없애기
      stacked: true, // horizontal 로 만들기
      // ticks: { stepSize: 1 }, // 칸 크기
      grid: {
        // grid 안 보이게 숨김
        display: false,
        drawBorder: false,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      // beginAtZero: true,
      display: false, // 세로축 없애기
      stacked: true, // horizontal 로 만들기
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const },
    title: { display: false },
  },
};

const HorizontalStackedBar = () => {
  const data = {
    labels: ['Total Score'],
    datasets: [
      {
        label: 'Outer',
        data: [10],
        backgroundColor: '#6FA8FF',
        // https://github.com/chartjs/Chart.js/issues/9217#issuecomment-1366100375 참고
        borderRadius: [
          { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
          // { topLeft: 0, topRight: 0, bottomLeft: 12, bottomRight: 12 },
        ],
        borderSkipped: false, // To make all side rounded
      },
      {
        label: 'Top',
        data: [20],
        backgroundColor: '#FF7C7C',
        borderRadius: [
          { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
          // { topLeft: 0, topRight: 0, bottomLeft: 12, bottomRight: 12 },
        ],
        borderSkipped: false, // To make all side rounded
      },
      {
        label: 'Bottom',
        data: [25],
        backgroundColor: '#FFE177',
        borderRadius: [
          { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
          // { topLeft: 0, topRight: 0, bottomLeft: 12, bottomRight: 12 },
        ],
        borderSkipped: false, // To make all side roundeds
      },
      {
        label: 'Item',
        data: [5],
        backgroundColor: '#5FDA64',
        borderRadius: [
          { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
          // { topLeft: 0, topRight: 0, bottomLeft: 12, bottomRight: 12 },
        ],
        borderSkipped: false, // To make all side rounded
      },
    ],
  };

  return (
    <div className="overflow-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalStackedBar;
