import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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
  const analysisResult: AnalysisDataType = JSON.parse(localStorage.getItem('analysis')).data;
  const navigate = useNavigate();
  const code = JSON.parse(localStorage.getItem('analysis')).code;
  const goBackPage = () => {
    navigate('/pickpick');
  };

  if (code === 6001) {
    Swal.fire({
      icon: 'error',
      html: '데이터 파싱 에러',
      showCancelButton: false,
      confirmButtonText: '확인',
    });
    goBackPage();
  } else if (code === 6002) {
    Swal.fire({
      icon: 'error',
      html: '옷이 네벌 초과로 입력되었습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
    });
    goBackPage();
  } else if (code === 6003) {
    Swal.fire({
      icon: 'error',
      html: '같은 대분류가 여러개 입력되었습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
    });
    goBackPage();
  } else if (code === 6004) {
    Swal.fire({
      icon: 'error',
      html: '상의나 하의가 없습니다.',
      showCancelButton: false,
      confirmButtonText: '확인',
    });
    goBackPage();
  }

  return (
    <>
      <div className="text-WebBody3">오늘 입은 옷은 과연 몇 점일까요?</div>
      <ClothAnalysisTemplate analysisResult={analysisResult} />
    </>
  );
};

export default AnalysisPage;
