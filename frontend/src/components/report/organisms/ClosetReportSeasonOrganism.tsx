import React, { useState, useEffect } from 'react';
import { SeasonDataType, SeasonClothesType } from '../../../pages/ReportSeasonPage';
import SeasonReportSection from '../molecules/SeasonReportSection';
import BuyRecommendSection from '../molecules/BuyRecommendSection';
import IntroComment from '../atoms/IntroComment';
import ShortReportComment from '../atoms/ShortReportComment';
import ReportComment from '../atoms/ReportComment';

const ClosetReportSeasonOrganism = ({ fourSeason }: SeasonDataType) => {
  const [mostSeason, setMostSeason] = useState('');
  const [leastSeason, setLeastSeason] = useState('');

  function findMaxMinAmountSeason(seasonClothes: SeasonClothesType): { max: string; min: string } {
    let maxAmount = 0;
    let maxAmountSeason: string | null = null;
    let minAmount = 10000000000;
    let minAmountSeason: string | null = null;

    // Iterate through each season
    for (const season in seasonClothes) {
      // 'season' 변수에는 현재 시즌의 속성이 할당됩니다.
      if (Object.prototype.hasOwnProperty.call(seasonClothes, season)) {
        // 이 블록 내에서 현재 시즌에 대한 작업을 수행합니다.
        const totalAmount = seasonClothes[season].reduce((acc, category) => acc + category.amount, 0);

        // Update maxAmountSeason if the current season has a higher total amount
        if (totalAmount > maxAmount) {
          maxAmount = totalAmount;
          maxAmountSeason = season;
        }
        if (totalAmount < minAmount) {
          minAmount = totalAmount;
          minAmountSeason = season;
        }
      }
    }
    return { max: maxAmountSeason, min: minAmountSeason };
  }

  useEffect(() => {
    const { max, min } = findMaxMinAmountSeason(fourSeason);
    const findSeasonName = (a: string, fun: React.Dispatch<React.SetStateAction<string>>) => {
      if (a === 'springClothes') {
        fun('봄');
      } else if (a === 'summerClothes') {
        fun('여름');
      } else if (a === 'autumnClothes') {
        fun('가을');
      } else if (a === 'winterClothes') {
        fun('겨울');
      }
    };

    findSeasonName(max, setMostSeason);
    findSeasonName(min, setLeastSeason);
  }, [fourSeason]);

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
          subTitle={`${mostSeason} 옷이 가장 많네요`}
        />
      </div>

      <div className="mt-10 font-extrabold">당신의 옷장 계절은 어떨까요?</div>
      <div className="flex flex-col items-center">
        <SeasonReportSection fourSeason={fourSeason} />
      </div>
      <div className="font-extrabold">{`${leastSeason} 옷이 부족하네요. 사러가볼까요?`}</div>
      <BuyRecommendSection />
    </div>
  );
};

export default ClosetReportSeasonOrganism;
