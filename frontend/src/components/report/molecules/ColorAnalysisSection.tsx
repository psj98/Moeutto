import DonutChart, { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  owner: string;
  colorProps: ColorAmountProp[];
}

const ColorAnalysisSection = ({ owner, colorProps }: ColorReportProps) => {
  return (
    <div className="w-[80%] text-center my-4 mx-auto">
      <div>{owner}의 옷장에는</div>
      <div className="flex justify-between">
        <div className="w-[60%]">
          <DonutChart colorAmountArray={colorProps}></DonutChart>
        </div>
        <div className="w-[40%]">컬러 차트 들어갈 예정</div>
      </div>
    </div>
  );
};

export default ColorAnalysisSection;
