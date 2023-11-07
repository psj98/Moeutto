import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';
import ReportAvg from '../components/report/atoms/ReportAvg';

const ReportCostPage = () => {
  return (
    <>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname="모드리치" imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-55px] left-[-10px]"
        imageUrl="/images/wallet.png"
        imageClass="w-36 inline-block"
        mainTitle="지갑은 괜찮아요?"
        subTitle="6개월을 기준으로 계산해봤어요"
      />

      {/* 분석 문구 */}
      <div className="mb-10">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-cost.png"
          imageClass="w-20 inline-block"
          mainTitle="내 옷장의 가치는 얼마일까?"
          subTitle={`당신의 옷장 가치는 높은 편입니다.\n안 입는 옷을 기부하는건 어떨까요?`}
        />
      </div>

      {/* 옷장 가격 */}
      <ReportAvg
        image={{ url: '/images/money.png', alt: '돈 이미지' }}
        myCloset={{ title: '나의 옷장', value: '50만원' }}
        avgCloset={{ title: '모으또 옷장 평균', value: '65만원' }}
      />
    </>
  );
};

export default ReportCostPage;
