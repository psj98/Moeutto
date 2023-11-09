import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';
import ReportAvg from '../components/report/atoms/ReportAvg';

const ReportVolumePage = () => {
  return (
    <>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname="모드리치" imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-45px] left-[0px]"
        imageUrl="/images/box.png"
        imageClass="w-24 inline-block"
        mainTitle="집이 넓어요?"
        subTitle="6개월을 기준으로 계산해봤어요"
      />

      {/* 분석 문구 */}
      <ReportComment
        imageUrl="/images/report-closet.png"
        imageClass="w-16 inline-block"
        mainTitle="내 옷장에는 몇 벌의 옷이 있을까요?"
        subTitle={`당신은 엄청난 맥시멀리스트입니다!`}
      />

      {/* 옷 개수 */}
      <ReportAvg
        imageUrl="/images/hanger.png"
        imageAlt="옷걸이 이미지"
        myClosetTitle="나의 옷장"
        myClosetValue="48벌"
        avgClosetTitle="모으또 옷장 평균"
        avgClosetValue="56벌"
      />
    </>
  );
};

export default ReportVolumePage;
