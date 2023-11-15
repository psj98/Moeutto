import { useState, useEffect } from 'react';
import { SeasonDataType, SeasonClothesType } from '../../../pages/ReportSeasonPage';
import SeasonReportSection from '../molecules/SeasonReportSection';
import BuyRecommendSection from '../molecules/BuyRecommendSection';
import IntroComment from '../atoms/IntroComment';
import ShortReportComment from '../atoms/ShortReportComment';
import ReportComment from '../atoms/ReportComment';

const ClosetReportSeasonOrganism = ({ fourSeason }: SeasonDataType) => {
  const [mostSeason, setMostSeason] = useState('');

  function findMaxAmountSeason(seasonClothes: SeasonClothesType): string | null {
    let maxAmount = 0;
    let maxAmountSeason: string | null = null;

    // Iterate through each season
    for (const season in seasonClothes) {
      if (Object.prototype.hasOwnProperty.call(seasonClothes, season)) {
        // Calculate the total amount for the current season
        const totalAmount = seasonClothes[season].reduce((acc, category) => acc + category.amount, 0);

        // Update maxAmountSeason if the current season has a higher total amount
        if (totalAmount > maxAmount) {
          maxAmount = totalAmount;
          maxAmountSeason = season;
        }
      }
    }

    return maxAmountSeason;
  }

  useEffect(() => {
    const max = findMaxAmountSeason(fourSeason);

    if (max === 'springClothes') {
      setMostSeason('봄');
    } else if (max === 'summerClothes') {
      setMostSeason('여름');
    } else if (max === 'autumnClothes') {
      setMostSeason('가을');
    } else if (max === 'winterClothes') {
      setMostSeason('겨울');
    }
  }, []);

  return (
    <div>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-35px] left-[10px]"
        imageUrl={'/images/tree.png'}
        imageClass="w-16 inline-block"
        mainTitle={`당신의 옷장은 \n어떤 계절일까요?`}
      />

      {/* 많이 입은 옷 */}
      <div className="mb-4">
        <ReportComment
          divPadding=""
          imageUrl="/images/report-happy.png"
          imageClass="w-20 inline-block"
          mainTitle={`${sessionStorage.getItem('nickname')}님의 옷장에는`}
          subTitle={`${mostSeason}옷이 가장 많네요`}
        />
      </div>

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
