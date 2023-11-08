import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const colorArray = ['#FAA0BF', '#FFBAD2', '#FFEBF6', '#E2E2E2'];

export interface HalfDoughnutChartData {
  categoryName: string;
  amount: number;
  percent: number;
}

interface HalfDoughnutChartProp {
  halfDoughnutChartProp: HalfDoughnutChartData[];
}

export function HalfDoughnutChart({ halfDoughnutChartProp }: HalfDoughnutChartProp) {
  const [labels, setlabels] = useState<string[]>([]);
  const [percentData, setPercentData] = useState<number[]>([]);

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    rotation: -90,
    circumference: 180,
    // cutout: '60%',
    maintainAspectRatio: true,
    responsive: true,
  };

  useEffect(() => {
    // 카테고리 이름
    setlabels(
      halfDoughnutChartProp?.map(row => {
        return row.categoryName;
      })
    );

    // 퍼센트
    setPercentData(halfDoughnutChartProp?.map(row => row.percent));
  }, [halfDoughnutChartProp]);

  const data = {
    labels,
    datasets: [
      {
        label: '값(%) ',
        data: percentData,
        backgroundColor: colorArray,
        borderColor: '#FFFFFF',
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}

export default HalfDoughnutChart;
