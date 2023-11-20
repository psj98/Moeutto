import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import MainInfo from '../components/main/organisms/MainInfo';
import PickButtonTap from '../components/main/organisms/PickButtonTap';
import RecommendList from '../components/main/organisms/RecommendList';
import MapModal from '../components/main/organisms/MapModal';
import AnalysisTap from '../components/main/organisms/AnalysisTap';
import UserName from '../components/main/atoms/UserName';
import MainWeatherTap from '../components/main/organisms/MainWeatherTap';
import Alert from '../components/common/Alert';
import MainComment from '../components/main/atoms/MainComment';
import Calendar from '../components/calendar/organisms/Calendar';
import Scroll from '../components/common/scroll/molecules/Scroll';
import RecommendListOnlyWeather from '../components/main/organisms/RecommendListOnlyWeather';
// import AddTap from '../components/main/atoms/AdTap';
import { authInstance } from '../api/api';

// 날씨 api 사용
// import Weather from "../api/Weather";

// 다시 추천 CSS
const rotate = keyframes`
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 30px;
  height: 30px;
`;

const LoaderCircle = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 6px solid #FF78A5;
  border-top-color: #E2E2E2;
  border-radius: 100%;
  animation: ${rotate} 2s ease-out infinite;
`;


const MainPage = () => {
    const navigate = useNavigate();
  // 현재 위치
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 법정동 주소
  const [address, setAddress] = useState<string>(() => {
    return window.localStorage.getItem('address') || '';
  });

  // 주소 로컬 스토리지에 저장하기
  useEffect(() => {
    window.localStorage.setItem('address', address);
  }, [address]);

  // 지도 출력
  const [locationState, setLocationState] = useState<boolean>(false);

  // 지도 화면 출력 클릭 이벤트
  const showLocationClick = () => {
    setLocationState(!locationState);
    console.log('주소 불러오는거 클릭함')
  };

  // 지도 다시 불러오기
  const [resetLocation, setResetLocation] = useState<boolean>(false);

  // 주소 검색 이벤트 핸들러
  const [newLocation, setNewLocation] = useState<string>('');

  const handleInputChange = (newValue: any) => {
    setNewLocation(newValue);
  };

  // // 옷 추천 리스트 POST  추천
  const [clothesListData, setClothesListData] = useState<any>([]);
  
  // 옷 추천 로딩 중
  const [recommendLoading, setRecommendLoading] = useState<boolean>(false);

  // 오늘 날짜
  const today = new Date().toISOString().slice(0, 10);

  // 내일 날짜
  const now = new Date();
  const tomorrow = new Date(now);

  tomorrow.setDate(now.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().slice(0, 10);

  // 내일 모레
  const dayAfterTomorrow = new Date(now);

  dayAfterTomorrow.setDate(now.getDate() + 2);
  const formattedDayAfterTomorrow = new Date(dayAfterTomorrow).toISOString().slice(0, 10);

  const clothesData = async () => {
    const requesBody = [
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: today, // 날짜 - "2023-11-02"
      },
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: formattedTomorrow, // 날짜 - "2023-11-02"
      },
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: formattedDayAfterTomorrow, // 날짜 - "2023-11-02"
      },
    ];

    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/ai-rec-outfits/combine', requesBody);

      // 일정 시간 지연시켜서 로딩중 보이게
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('추천 착장 만들기 성공', response.data.data);
      setRecommendLoading(true);
      
      if (response.data.data) {
        setClothesListData(response.data.data);
      } else {
        setClothesListData([]);
      }

      return response.data;
    } catch (error) {
      console.log('추천 착장 만들기 실패', error);

      return null;
    }
  };

  // 옷 추천 리스트 GET 조회
  const OnlyGetRecommendClothesData = async () => {
    console.log('2. 조회만 하는 api 실행 시작')
    
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/ai-rec-outfits');

      console.log('************추천 착장 조회만 하는 거 성공', response);
      setRecommendLoading(true);

      // 저장된 추천 데이터가 없는 경우
      if (response.data.message === '현재 날짜에 추천된 착장이 없습니다.') {
        // 추천 받을 수 있는 api를 실행시킨다
        clothesData();
      }
      
      if (response.data.data) {
        setClothesListData(response.data.data);
      } else {
        setClothesListData([]);
      }

      return response.data;
    } catch (error) {
      console.log('옷 목록 조회만 하는거 실패', error);

      return null;
    }
  };

  const reRecommend = () => {
    setRecommendLoading(false);
    clothesData();
  }
  

  // 날씨 기반 리스트
  // const [weatherListData, setWeatherListData] = useState<any>([]);

  useEffect(() => {
    // 화면을 키면 조회만 되는 api에서 데이터를 받아온다
    console.log('1. 조회만 하는 api 실행 전')

    // 조회만 할거면 무조건 이걸로 해야됨 -> 대신 재추천 못 받음
    // OnlyGetRecommendClothesData();
    console.log(OnlyGetRecommendClothesData)
    // 새로 고침 할 때마다 바뀜
    clothesData();

    // 데이터가 없는 경우 or 다시 추천을 받고 싶은 경우 실행되는 api
    // clothesData();
  }, []);


  // 해: 1, 구름: 2, 해&구름: 3, 비: 4, 눈: 5, 번개: 6 
 const weatherListDataFake = [
      // 추천 날씨 목록
      {
        minTemperature: 1, // 최저 기온
        maxTemperature: 10, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: 0, // 최저 기온
        maxTemperature: 12, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: 2, // 최저 기온
        maxTemperature: 14, // 최고 기온
        weather: 3, // 날씨 정보 (맑음, 구름 조금 등)
      },
    ]


  return (  
    <div className='relative'>
      <div className='flex justify-center my-4'>
        <img src="/images/logo.png" alt="logo" className='w-1/3 min-w-[130px]' />
      </div>

      {/* 알림 */}
      <div className='absolute z-50 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[400px] min-w-[300px]'>
        <Alert />
      </div>
        <div className="flex flex-col p-4 mb-4">
          {/* 주소 */}
          <MainInfo currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
          
          {/* 날씨 정보 */}
          <MainWeatherTap weatherListData={weatherListDataFake} />
          <div className='mt-6 bg-white rounded-2xl shadow-md p-4 mb-[70px]'>
            
            {/* 사용자 이름 */}
            <div className='flex'>
              <UserName />
              {recommendLoading ? (
              // 재추천 안되는 이슈로 hidden으로 숨기기
                <button 
                  className='hidden flex items-center justify-center bg-pink rounded-2xl text-white text-AppBody2 p-2 absolute right-6'
                  onClick={reRecommend}
                >
                    다시 추천
                </button>
              ) : (
                <div className='hidden absolute right-10'>
                  <LoaderContainer>
                    <LoaderCircle />
                  </LoaderContainer>
                </div>
              )}
            </div>
            
            {/* 날씨 기반 추천 리스트 */}
            {clothesListData && clothesListData.length > 0 ? (
              <>
                <RecommendList clothesListData={clothesListData} weatherListData={weatherListDataFake} />
              </>
            ) : (
              <>
              {/* 옷 추천이 안되는 경우 날씨 컴포넌트 띄우기 */}
                <RecommendListOnlyWeather clothesListData={clothesListData} weatherListData={weatherListDataFake} />
              </>
            )}
          </div>
          
          {/* 골라골라 */}
          <PickButtonTap />

          {/* 옷장분석 */}
          <AnalysisTap />

          {/* 달력 컴포넌트화 시킬 예정 */}
          <div className='bg-white rounded-2xl shadow-md p-4 relative'
            onClick={() => navigate('/calendar')}
          >
            <div className='flex'>
              <MainComment title={`오늘 입은 옷을 \n기록해보세요`} />
              <img src="/images/camera3d.png" alt="camera" className='w-1/3 absolute -top-6 right-0' />
            </div>
            <div className='flex justify-center items-center mt-6 border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative'>
              <Calendar state={1} />
            </div>

          </div>

          {/* 광고 입니다 */}
          {/* <AddTap /> */}
    
          {/* 지도  */}
          {locationState && (
            <div className="absolute z-50 left-1/2 transform -translate-x-1/2 h-[60%] w-[80%] max-w-[400px] min-w-[300px]">
              <MapModal
                currentLocation={currentLocation}
                address={address}
                locationState={locationState}
                setCurrentLocation={setCurrentLocation}
                setAddress={setAddress}
                resetLocation={resetLocation}
                setResetLocation={setResetLocation}
                showLocationClick={showLocationClick}
                handleInputChange={handleInputChange}
                newLocation={newLocation}
              />
            </div>
          )}
        </div>
        <div className="fixed bottom-1/3 right-0 me-[5vw]">
          <Scroll />
      </div>
      {/* <Weather setWeatherListData={setWeatherListData} /> */}
    </div>
  );
};

export default MainPage;
