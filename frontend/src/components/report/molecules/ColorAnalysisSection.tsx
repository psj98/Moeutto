import DonutChart, { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  owner: string;
  colorProps: ColorAmountProp[];
}

const ColorAnalysisSection = ({ owner, colorProps }: ColorReportProps) => {
  return (
    <div className="w-[80%] text-center my-4 mx-auto">
      <div>{owner} 옷장에는</div>
      <DonutChart owner={owner} colorAmountArray={colorProps}></DonutChart>
    </div>
  );
};

export default ColorAnalysisSection;
