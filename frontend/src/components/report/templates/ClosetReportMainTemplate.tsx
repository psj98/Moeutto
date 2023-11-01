import ReportCardSection from '../molecules/ReportCardSection';
import { CardProps } from '../../../pages/MyClosetReportPage';

const ClosetReportMainOrganism = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  return (
    <div>
      <ReportCardSection CardPropsArray={CardPropsArray} />
    </div>
  );
};

export default ClosetReportMainOrganism;
