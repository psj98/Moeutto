import TodayWeatherCard from '../molecules/TodayWeatherCard';
import TotalScoreSection from '../molecules/TotalSCoreSection';

const ClothAnalysisOrganism = () => {
  return (
    <>
      <TodayWeatherCard idx={1} /> // api 연결되면 idx는 동적으로 변함
      <TotalScoreSection />
    </>
  );
};

export default ClothAnalysisOrganism;
