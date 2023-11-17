// import ReportCardSection from '../molecules/ReportCardSection';
import { CardProps } from '../../../pages/MyClosetReportPage';
import ReportCardSection from '../molecules/ReportCardSection';
import profileImage from '../../../assets/images/profile.png';

const ClosetReportMainOrganism = ({ CardPropsArray }: { CardPropsArray: CardProps[] }) => {
  const name: string = window.sessionStorage.getItem('nickname');
  // const [nickname] = name;

  return (
    <div className="py-1 relative bg-[#f6f6f6] pt-[70px] pb-[20px] h-full mt-24 w-full flex flex-col items-center">
      <img
        src={profileImage}
        className="absolute rounded-full w-[120px] object-cover border-[10px] top-[-60px] border-[#f6f6f6]"
      />
      <div className="text-WebBody2 font-bold mb-4">
        {`${name}`}
        <span className="text-WebBody2">님의 옷장을 분석해보았어요.</span>
      </div>
      <ReportCardSection CardPropsArray={CardPropsArray} />
    </div>
  );
};

export default ClosetReportMainOrganism;
