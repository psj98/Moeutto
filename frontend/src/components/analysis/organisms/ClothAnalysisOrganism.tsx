import TodayWeatherCard from '../molecules/TodayWeatherCard'; // 날씨 정보 카드
import TotalScoreSection from '../molecules/TotalScoreSection'; // 총 점수 막대 그래프
import Graph from '../molecules/Graph'; // 하단 그래프
import ClothScoreSection from '../molecules/ClothScoreSection';
import { AnalysisDataType } from '../../../pages/AnalysisPage';
/*
response
{
	"id": int, // AI 착장 id
	"regDate": DateTime, // 착장 등록 날짜
	"clothesResult": [ // 옷 적합도 결과
  { 
			"clothesId": int, // 옷 id
			"largeCategoryId": String // 대분류 카테고리 id
			"imageUrl": String // 옷 이미지
			"result": String, // 검사 결과
			"fitnessNum": int // 적합도 수치
		}, ...
	],
	"clothesFeature": {
		"temperature": int, // 따뜻한 정도 (낮을수록 시원)
		"darkness": int, // 색상 밝기 정도 (낮을수록 밝음)
		"seasonX": int, // 계절 정보 x좌표 (여름, 겨울)
		"seasonY": int // 계절 정보 y좌표 (봄, 가을)
	},
	"weatherInfo": {
    "minTemperature": int, // 최저 기온
		"maxTemperature": int, // 최고 기온
		"weather": int, // 날씨 정보 (맑음, 구름 많음 등)
	}
}

*/

const ClothAnalysisOrganism = ({ analysisResult }: { analysisResult: AnalysisDataType }) => {
  // api 연결되면 idx는 동적으로 변함
  return (
    <div className="flex flex-col items-center">
      {/*  컴포넌트 가운데 정렬'} */}

      <TodayWeatherCard idx={3} />
      <TotalScoreSection clothesResult={analysisResult?.clothesResult} />
      <ClothScoreSection clothesResult={analysisResult?.clothesResult} />
      <Graph />
    </div>
  );
};

export default ClothAnalysisOrganism;
