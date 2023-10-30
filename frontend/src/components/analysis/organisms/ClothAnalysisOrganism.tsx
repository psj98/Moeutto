import TodayWeatherCard from '../molecules/TodayWeatherCard';
import Graph from '../molecules/Graph';

const ClothAnalysisOrganism = () => {
  return (
    <>
      <TodayWeatherCard idx={1} /> 
      {/* api 연결되면 idx는 동적으로 변함 */}
      <Graph />
    </>
  )
};

export default ClothAnalysisOrganism;
