// import ReportCardSection from '../molecules/ReportCardSection';
import { CardProps } from '../../../pages/MyClosetReportPage';
import ReportCardSection from '../molecules/ReportCardSection';

const ClosetReportMainOrganism = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  return (
    <div>
      <div className="text-WebBody2 font-bold">주혁님의 옷장을 분석해보았어요.</div>
      {/* <ReportCardSection CardPropsArray={CardPropsArray} /> */}
      <ReportCardSection CardPropsArray={CardPropsArray} />
    </div>
  );
};

export default ClosetReportMainOrganism;
