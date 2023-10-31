import ClosetReportOrganisms from '../organisms/ClosetReportOrganisms';

import { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  colorProps: ColorAmountProp[];
}

const ClosetReportTemplate = ({ colorProps }: ColorReportProps) => {
  return <ClosetReportOrganisms owner="당신의" colorProps={colorProps} />;
};

export default ClosetReportTemplate;
