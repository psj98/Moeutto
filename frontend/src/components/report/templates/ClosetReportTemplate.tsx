import ClosetReportOrganisms from '../organisms/ClosetReportOrganisms';

import { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  colorProps: ColorAmountProp[];
}

const ClosetReportTemplate = ({ colorProps }: ColorReportProps) => {
  return (
    <div className="w-[100%] flex flex-col justify-center">
      <ClosetReportOrganisms owner="당신" colorProps={colorProps} />
      <ClosetReportOrganisms owner="모으또 평균 유저" colorProps={colorProps} />
    </div>
  );
};

export default ClosetReportTemplate;
