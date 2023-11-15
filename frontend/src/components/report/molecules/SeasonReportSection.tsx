import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import OddSeason from '../atoms/OddSeason';
import EvenSeason from '../atoms/EvenSeason';

const SeasonReportSection = ({ fourSeason }: SeasonDataType) => {
  return (
    <div>
      {fourSeason ? (
        <div className="flex mb-[60px] w-full flex-wrap">
          <OddSeason season={fourSeason?.springClothes} name="봄" />
          <EvenSeason season={fourSeason?.summerClothes} name="여름" />
          <OddSeason season={fourSeason?.autumnClothes} name="가을" />
          <EvenSeason season={fourSeason?.winterClothes} name="겨울" />
        </div>
      ) : null}
    </div>
  );
};

export default SeasonReportSection;
