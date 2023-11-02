import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import OddSeason from '../atoms/OddSeason';
import EvenSeason from '../atoms/EvenSeason';

const SeasonReportSection = ({ fourSeason }: SeasonDataType) => {
  return (
    <div>
      <div className="flex mb-[60px]">
        <OddSeason season={fourSeason.springClothes} name="봄" />
        <EvenSeason season={fourSeason.summerClothes} name="여름" />
        <OddSeason season={fourSeason.autumnClothes} name="가을" />
        <EvenSeason season={fourSeason.winterClothes} name="겨울" />
      </div>
    </div>
  );
};

export default SeasonReportSection;
