import ClothAnalysisTemplate from '../components/analysis/templates/ClothAnalysisTemplate';
import Coordinate from '../components/analysis/atoms/Coordinate';

const AnalysisPage = () => {
  return (
    <>
      <div className="text-WebBody3">오늘 입은 옷은 과연 몇 점일까요?</div>
      <ClothAnalysisTemplate />
      <Coordinate />
    </>
  );
};

export default AnalysisPage;
