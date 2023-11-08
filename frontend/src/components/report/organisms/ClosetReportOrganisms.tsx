import ColorAnalysisSection from '../molecules/ColorAnalysisSection';
import { ColorAmountProp } from '../atoms/DonutChart';

export interface ColorReportProps {
  colorProps: ColorAmountProp[];
}

const ClosetReportOrganisms = ({ colorProps }: ColorReportProps) => {
  return (
    <div>
      <ColorAnalysisSection colorProps={colorProps} />
    </div>
  );
};

export default ClosetReportOrganisms;
