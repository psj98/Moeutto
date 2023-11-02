import ClosetReportOrganisms from '../organisms/ClosetReportOrganisms';
import { AnalysisData } from '../../../pages/ReportColorPage';

const ClosetReportTemplate = ({ analysisData }: { analysisData: AnalysisData }) => {
  return (
    <div className="w-[100%] flex flex-col justify-center">
      <ClosetReportOrganisms owner="당신" colorProps={analysisData.myAnalysisColor} />
      <ClosetReportOrganisms owner="모으또 평균 유저" colorProps={analysisData.otherAnalysisColor} />
    </div>
  );
};

export default ClosetReportTemplate;
