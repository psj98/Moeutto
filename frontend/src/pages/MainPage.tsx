import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import Weather from "../api/Weather";

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

  // // 옷 추천 리스트
  const [clothesListData, setClothesListData] = useState<any>([]);
  // const navigate = useNavigate();
  const clothesData = async () => {
    const requesBody = [
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: '2023-11-13', // 날짜 - "2023-11-02"
      },
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: '2023-11-14', // 날짜 - "2023-11-02"
      },
      {
        // 날씨 정보
        sky: 0, // 하늘 상태
        pty: 0, // 강수 형태
        tmn: 0, // 일 최저 기온
        tmx: 0, // 일 최고 기온
        wsd: 0, // 풍속
        date: '2023-11-15', // 날짜 - "2023-11-02"
      },
    ];

    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/ai-rec-outfits/combine', requesBody);

      console.log('추천 착장 조회 성공', response.data.data);
      
      if (response.data.data) {
        setClothesListData(response.data.data);
      } else {
        setClothesListData([]);
      }

      return response.data;
    } catch (error) {
      console.log('옷 목록 데이터 조회 실패', error);

      // if (error.response.data.status === 500) {
      //     navigate('/mycloset/add-cloth')
      //     // alert('보유한 옷이 적어 추천이 불가능합니다. 옷을 등록해주세요.')
      // }

      // 보유한 옷이 적어 추천이 불가능합니다.

      return null;
    }
  };

  // 날씨 기반 리스트
  const [weatherListData, setWeatherListData] = useState<any>([]);

  useEffect(() => {
    clothesData();
    console.log('날씨 데이터 잘 받는거 확인했잖아', weatherListData)
  }, []);


  // 중간 점검 이후 덤프 데이터로 다시 UI 구성하는 코드 입니다. 
  // 날씨 api 논의 후 다시 작성할 예정.
  // 날씨 정보 (프론트에서 open API로 직접 불러온 정보 3일치 날씨 데이터 가공)
  // 해: 1, 구름: 2, 해&구름: 3, 비: 4, 눈: 5, 번개: 6 

 const weatherListDataFake = [
      // 추천 날씨 목록
      {
        minTemperature: 3, // 최저 기온
        maxTemperature: 9, // 최고 기온
        weather: 4, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: -2, // 최저 기온
        maxTemperature: 5, // 최고 기온
        weather: 5, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: -3, // 최저 기온
        maxTemperature: 8, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
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
            <UserName />
            
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
      <Weather setWeatherListData={setWeatherListData} />
    </div>
  );
};

export default MainPage;
