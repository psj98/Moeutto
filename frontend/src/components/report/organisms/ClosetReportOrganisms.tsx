import ColorAnalysisSection from '../molecules/ColorAnalysisSection';
import { ColorAmountProp } from '../atoms/DonutChart';

interface ColorReportProps {
  owner: string;
  colorProps: ColorAmountProp[];
}

const ClosetReportOrganisms = ({ owner, colorProps }: ColorReportProps) => {
  return (
    <div>
      <ColorAnalysisSection owner={owner} colorProps={colorProps} />
    </div>
  );
};

export default ClosetReportOrganisms;
