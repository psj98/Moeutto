import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import SeasonReportSection from '../molecules/SeasonReportSection';
import BuyRecommendSection from '../molecules/BuyRecommendSection';
import IntroComment from '../atoms/IntroComment';
import ShortReportComment from '../atoms/ShortReportComment';

const ClosetReportSeasonOrganism = ({ fourSeason }: SeasonDataType) => {
  return (
    <div>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-35px] left-[10px]"
        imageUrl="/images/earth.png"
        imageClass="w-20 inline-block"
        mainTitle="당신은 지구지킴이?"
        subTitle="6개월을 기준으로 계산해봤어요"
      />
      <div className="mt-10 font-extrabold">당신의 옷장 계절은 어떨까요?</div>
      <div className="flex flex-col items-center">
        <SeasonReportSection fourSeason={fourSeason} />
      </div>
      <div className="font-extrabold">봄 옷이 부족하네요. 사러가볼까요?</div>
      <BuyRecommendSection />
    </div>
  );
};

export default ClosetReportSeasonOrganism;
