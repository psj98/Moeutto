import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import SeasonReportSection from '../molecules/SeasonReportSection';
import BuyRecommendSection from '../molecules/BuyRecommendSection';

const ClosetReportSeasonOrganism = ({ fourSeason }: SeasonDataType) => {
  return (
    <div>
      <div>당신의 옷장 계절은 어떨까요?</div>
      <div className="flex flex-col items-center">
        <SeasonReportSection fourSeason={fourSeason} />
      </div>
      <div>봄 옷이 부족하네요. 사러가볼까요?</div>
      <BuyRecommendSection />
    </div>
  );
};

export default ClosetReportSeasonOrganism;
