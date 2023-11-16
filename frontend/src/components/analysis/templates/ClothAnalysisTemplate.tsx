import ClothAnalysisOrganism from '../organisms/ClothAnalysisOrganism';
import { AnalysisDataType } from '../../../pages/AnalysisPage';

const ClothAnalysisTemplate = ({ analysisResult }: { analysisResult: AnalysisDataType }) => {
  return <ClothAnalysisOrganism analysisResult={analysisResult}/>;
};

export default ClothAnalysisTemplate;
