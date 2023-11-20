// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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

// const analysisResult: AnalysisDataType = JSON.parse(localStorage.getItem('analysis')).data;
// const navigate = useNavigate();
// const code = JSON.parse(localStorage.getItem('analysis')).code;

const AnalysisPage = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisDataType | undefined | Boolean>(undefined);

  useEffect(() => {
    if (localStorage.getItem('analysis')) {
      setAnalysisResult(JSON.parse(localStorage.getItem('analysis')).data);
    }
  }, []);
  return (
    <>
      <div className="text-WebBody3 pt-5 ps-5">오늘 입은 옷은 과연 몇 점일까요?</div>
      {analysisResult !== undefined && analysisResult !== false ? (
        <ClothAnalysisTemplate analysisResult={analysisResult as AnalysisDataType} />
      ) : null}
    </>
  );
};

export default AnalysisPage;
