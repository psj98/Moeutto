import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import ClosetReportSeasonOrganism from '../organisms/ClosetReportSeasonOrganism';

const ClosetReportSeasonTemplate = ({ fourSeason }: SeasonDataType) => {
  return (
    <div className="w-[100%] flex flex-col justify-center">
      <ClosetReportSeasonOrganism fourSeason={fourSeason} />
    </div>
  );
};

export default ClosetReportSeasonTemplate;
