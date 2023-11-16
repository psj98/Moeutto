import ClothAnalysisTemplate from '../components/analysis/templates/ClothAnalysisTemplate';

export interface ClothesResultType {
  clothesId: number; // 옷 아이디
  largeCategoryId: string; // 대분류
  imageUrl: string; // 옷 주소
  result: string; // 옷 코멘트
  fitnessNum: number; // 옷 점수
}

export interface ClothesFeatureType {
  temperature: number;
  darkness: number;
  seasonX: number;
  seasonY: number;
}

export interface WeatherInfoType {
  minTemperature: number;
  maxTemperature: number;
  weather: number;
}

export interface AnalysisDataType {
  id: number;
  regDate: string;
  clothesResult: ClothesResultType[];
  clothesFeature: ClothesFeatureType;
  weatherInfo: WeatherInfoType;
}

const AnalysisPage = () => {
  const analysisResult: AnalysisDataType = JSON.parse(localStorage.getItem('analysis'));

  return (
    <>
      <div className="text-WebBody3">오늘 입은 옷은 과연 몇 점일까요?</div>
      <ClothAnalysisTemplate analysisResult={analysisResult} />
    </>
  );
};

export default AnalysisPage;
