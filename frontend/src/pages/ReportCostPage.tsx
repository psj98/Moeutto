import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';

const ReportCostPage = () => {
  return (
    <>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname="모드리치" imageUrl="/images/analysis.png" />

      {/* 분석 문구 */}
      <ReportComment
        imageUrl="/images/wallet.png"
        mainTitle="지갑은 괜찮아요?"
        subTitle="6개월을 기준으로 계산해봤어요"
      />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageUrl="/images/analysis-cost.png"
        mainTitle="내 옷장의 가치는 얼마일까?"
        subTitle={`당신의 옷장 가치는 높은 편입니다.\n안 입는 옷을 기부하는건 어떨까요?`}
      />

      {/* 옷장 가격 */}
      <div className="flex flex-row justify-evenly mb-10">
        {/* 내 옷장 */}
        <div className="p-3 rounded-2xl bg-gray-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
          <div className="w-32 flex flex-col  items-center justify-center ">
            <p className="text-base font-bold">나의 옷장</p>
            <div>
              <img className="w-20 inline-block" src="/images/money.png" alt="돈 이미지" />
            </div>
            <p className="text-base font-bold">50만원</p>
          </div>
        </div>
        {/* 모으또 옷장 평균 */}
        <div className="p-3 rounded-2xl bg-gray-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
          <div className="w-32 flex flex-col  items-center justify-center ">
            <p className="text-base font-bold">모으또 옷장 평균</p>
            <div>
              <img className="w-20 inline-block" src="/images/money.png" alt="돈 이미지" />
            </div>
            <p className="text-base font-bold">50만원</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCostPage;
