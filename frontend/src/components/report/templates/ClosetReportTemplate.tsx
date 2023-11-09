import ClosetReportOrganisms from '../organisms/ClosetReportOrganisms';
import { AnalysisData } from '../../../pages/ReportColorPage';
import ReportComment from '../atoms/ReportComment';

const ClosetReportTemplate = ({ analysisData }: { analysisData: AnalysisData }) => {
  const myAnalysisColorMost = analysisData.myAnalysisColor[0]?.color;
  const otherAnalysisColorMost = analysisData.otherAnalysisColor[0]?.color;

  return (
    <div className="w-[100%] flex flex-col justify-center">
      {/* 분석 문구 */}
      <div className="mb-5">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-palette.png"
          imageClass="w-16 inline-block"
          mainTitle="OO님의 옷장에는"
          subTitle={`${myAnalysisColorMost} 색 옷이 제일 많네요`}
        />
      </div>

      <ClosetReportOrganisms colorProps={analysisData.myAnalysisColor} />

      {/* 분석 문구 */}
      <div className="mb-5">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-palette.png"
          imageClass="w-16 inline-block"
          mainTitle="모으또 유저의 옷장에는"
          subTitle={`${otherAnalysisColorMost} 색 옷이 제일 많네요`}
        />
      </div>

      <ClosetReportOrganisms colorProps={analysisData.otherAnalysisColor} />
    </div>
  );
};

export default ClosetReportTemplate;
