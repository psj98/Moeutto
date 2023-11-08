import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

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
// import AddTap from '../components/main/atoms/AdTap';
// import { authInstance } from '../api/api';

// 날씨 api 사용
// import Weather from "../api/Weather";

const MainPage = () => {
  //   const navigate = useNavigate();
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
  };

  // 지도 다시 불러오기
  const [resetLocation, setResetLocation] = useState<boolean>(false);

  // 주소 검색 이벤트 핸들러
  const [newLocation, setNewLocation] = useState<string>('');

  const handleInputChange = (newValue: any) => {
    setNewLocation(newValue);
  };

  // // 옷 추천 리스트
  // const [clothesListData, setClothesListData] = useState<any>([]);
  // // const navigate = useNavigate();
  // const clothesData = async () => {
  //   const requesBody = [
  //     {
  //       // 날씨 정보
  //       sky: 0, // 하늘 상태
  //       pty: 0, // 강수 형태
  //       tmn: 0, // 일 최저 기온
  //       tmx: 0, // 일 최고 기온
  //       wsd: 0, // 풍속
  //       date: '2023-11-02', // 날짜 - "2023-11-02"
  //     },
  //     {
  //       // 날씨 정보
  //       sky: 0, // 하늘 상태
  //       pty: 0, // 강수 형태
  //       tmn: 0, // 일 최저 기온
  //       tmx: 0, // 일 최고 기온
  //       wsd: 0, // 풍속
  //       date: '2023-11-03', // 날짜 - "2023-11-02"
  //     },
  //     {
  //       // 날씨 정보
  //       sky: 0, // 하늘 상태
  //       pty: 0, // 강수 형태
  //       tmn: 0, // 일 최저 기온
  //       tmx: 0, // 일 최고 기온
  //       wsd: 0, // 풍속
  //       date: '2023-11-04', // 날짜 - "2023-11-02"
  //     },
  //   ];

  //   try {
  //     // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
  //     const axiosInstance = authInstance({ ContentType: 'application/json' });
  //     const response = await axiosInstance.post('/ai-rec-outfits/combine', requesBody);

  //     console.log('추천 착장 조회 성공', response.data.data);
  //     setClothesListData(response.data.data);

  //     return response.data;
  //   } catch (error) {
  //     console.log('옷 목록 데이터 조회 실패', error);

  //     // if (error.response.data.status === 500) {
  //     //     navigate('/mycloset/add-cloth')
  //     //     // alert('보유한 옷이 적어 추천이 불가능합니다. 옷을 등록해주세요.')
  //     // }

  //     // 보유한 옷이 적어 추천이 불가능합니다.

  //     // throw new Error('옷 목록 데이터 조회 실패');
  //     return null;
  //   }
  // };

  // 날씨 기반 리스트
  // const [weatherListData, setWeatherListData] = useState<any>([]);

  useEffect(() => {
    // setWeatherListData(RecommendClothesListData.recommenWeatherInfo);
  }, []);

  // clothesListData.length > 0 ? (
  //     <div>
  //         <br />
  //         {/* 날씨 기반 추천 리스트 */}
  //         <RecommendList clothesListData={clothesListData} weatherListData={weatherListData} />
  //     </div>
  // ) : (
  //     <div className="border border-pink-hot w-1/4 h-[50px] flex items-center justify-center rounded-2xl font-WebBody1 font-bold text-pink" onClick={() => navigate('/mycloset/add-cloth')}>옷 등록하러 가기</div>
  // )}


  // 중간 점검 이후 덤프 데이터로 다시 UI 구성하는 코드 입니다. 
  // 날씨 api 논의 후 다시 작성할 예정.
  // 날씨 정보 (프론트에서 open API로 직접 불러온 정보 3일치 날씨 데이터 가공)
  const weatherListData = [
      // 추천 날씨 목록
      {
        minTemperature: 10, // 최저 기온
        maxTemperature: 20, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: 15, // 최저 기온
        maxTemperature: 25, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
      },
      {
        minTemperature: 5, // 최저 기온
        maxTemperature: 10, // 최고 기온
        weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
      },
    ]
  
  // 옷 정보
  const clothesListData = [
    {
      "clothesInfo": [
        {
          "clothesId": 1, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 2, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes2.png"
        },
        {
          "clothesId": 3, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes3.png"
        },
        {
          "clothesId": 4, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes4.png"
        }
      ],
      "recData": "2023-11-10"
    },
    {
      "clothesInfo": [
        {
          "clothesId": 1, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 2, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 3, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 4, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        }
      ],
      "recData": "2023-11-10"
    },
    {
      "clothesInfo": [
        {
          "clothesId": 1, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 2, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 3, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        },
        {
          "clothesId": 4, 
          "largeCategoryId": "100100",
          "imageUrl": "/images/clothes1.png"
        }
      ],
      "recData": "2023-11-10"
    }
  ]

  useEffect(() => {
    const body = document.body;

    body.style.background = '#FFF7F9';

    return () => {
      body.style.background = '';
    };
  }, []);
  

  return (  
    <div className='relative'>
      <div className='flex justify-center my-4'>
        <img src="/images/logo.png" alt="logo" className='w-1/3 min-w-[130px]' />
      </div>

      {/* 알림 */}
      <Alert />

        <div className="flex flex-col p-4 mb-4">
          {/* 주소 */}
          <MainInfo currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
          
          {/* 날씨 정보 */}
          <MainWeatherTap />
          <div className='mt-6 bg-white rounded-2xl shadow-md p-4 mb-[70px]'>
            
            {/* 사용자 이름 */}
            <UserName />
            
            {/* 날씨 기반 추천 리스트 */}
            <RecommendList clothesListData={clothesListData} weatherListData={weatherListData} />
          </div>
          
          {/* 골라골라 */}
          <PickButtonTap />

          {/* 옷장분석 */}
          <AnalysisTap />

          {/* 달력 컴포넌트화 시킬 예정 */}
          <div className='bg-white rounded-2xl shadow-md p-4 relative'>
            <div className='flex'>
              <MainComment title={`오늘 입은 옷을 \n기록해보세요`} />
              <img src="/images/camera3D.png" alt="camera" className='w-1/3 absolute -top-6 right-0' />
            </div>
            <div className='flex justify-center items-center mt-6 border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative'>
              <Calendar />
            </div>
      
          </div>

          {/* 광고 입니다 */}
          {/* <AddTap /> */}
    
          {/* 지도  */}
          {locationState && (
            <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[50vw] max-w-[400px] min-w-[300px]">
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
    </div>
  );
};

export default MainPage;
