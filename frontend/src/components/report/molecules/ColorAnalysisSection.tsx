import DonutChart, { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  colorProps: ColorAmountProp[];
}

const ColorAnalysisSection = ({ colorProps }: ColorReportProps) => {
  return (
    <div className="w-[80%] text-center my-4 mx-auto">
      <DonutChart colorAmountArray={colorProps}></DonutChart>
    </div>
  );
};

export default ColorAnalysisSection;
