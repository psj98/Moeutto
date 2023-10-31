import ColorAnalysisSection from '../molecules/ColorAnalysisSection';
import { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  owner: string;
  colorProps: ColorAmountProp[];
}

const ClosetReportOrganisms = ({ owner, colorProps }: ColorReportProps) => {
  return <ColorAnalysisSection owner={'당신'} colorProps={colorProps} />;
};

export default ClosetReportOrganisms;
