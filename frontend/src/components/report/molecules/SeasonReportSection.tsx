import { SeasonDataType } from '../../../pages/ReportSeasonPage';
import OddSeason from '../atoms/OddSeason';
import EvenSeason from '../atoms/EvenSeason';

const SeasonReportSection = ({ fourSeason }: SeasonDataType) => {
  return (
    <div>
      {fourSeason ? (
        <div className="flex my-[30px] w-full flex-wrap justify-around">
          <OddSeason season={fourSeason?.springClothes} name="봄" month="3·4·5" />
          <EvenSeason season={fourSeason?.summerClothes} name="여름" month="6·7·8" />
          <OddSeason season={fourSeason?.autumnClothes} name="가을" month="9·10·11" />
          <EvenSeason season={fourSeason?.winterClothes} name="겨울" month="12·1·2" />
        </div>
      ) : null}
    </div>
  );
};

export default SeasonReportSection;
