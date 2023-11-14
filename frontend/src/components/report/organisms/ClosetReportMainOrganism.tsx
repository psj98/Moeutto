// import ReportCardSection from '../molecules/ReportCardSection';
import { CardProps } from '../../../pages/MyClosetReportPage';
import ReportCardSection from '../molecules/ReportCardSection';

const ClosetReportMainOrganism = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  const name: string = window.sessionStorage.getItem('nickname');
  // const [nickname] = name;

  return (
    <div className="w-[100%] px-3 text-center">
      <div className="text-WebBody2 font-bold mt-8">{`${name}`}님의 옷장을 분석해보았어요.</div>
      <ReportCardSection CardPropsArray={CardPropsArray} />
    </div>
  );
};

export default ClosetReportMainOrganism;
