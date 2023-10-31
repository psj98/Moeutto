import TodayWeatherCard from '../molecules/TodayWeatherCard'; // 날씨 정보 카드
import TotalScoreSection from '../molecules/TotalSCoreSection'; // 총 점수 막대 그래프
import Graph from '../molecules/Graph'; // 하단 그래프

const ClothAnalysisOrganism = () => {
  // api 연결되면 idx는 동적으로 변함
  return (
    <>
      <TodayWeatherCard idx={1} />
      <TotalScoreSection />
      <Graph />
    </>
  );

};

export default ClothAnalysisOrganism;
