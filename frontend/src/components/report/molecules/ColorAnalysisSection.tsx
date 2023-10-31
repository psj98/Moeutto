import DonutChart, { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  owner: string;
  colorProps: ColorAmountProp[];
}

const ColorAnalysisSection = ({ owner, colorProps }: ColorReportProps) => {
  return (
    <div className="w-[100%] text-center">
      <div>{owner}의 옷장에는</div>
      <DonutChart colorAmountArray={colorProps}></DonutChart>
    </div>
  );
};

export default ColorAnalysisSection;
