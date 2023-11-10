import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartUsabilityProps {
  percent?: number;
}

export function PieChartUsability({ percent }: PieChartUsabilityProps) {
  const data = {
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: ['#FFBAD2', '#F5F5F5'],
        borderWidth: 0,
        borderRadius: 100,
      },
    ],
  };

  const options = {
    cutout: '80%',
    events: [],
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
}

export default PieChartUsability;
