import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendListDay from '../atoms/RecommendListDay';
import TodayDayWeather from '../atoms/TodayWeather';
import RecommendListTemp from '../atoms/RecommendListTemp';
import TodayBox from '../atoms/TodayBox';

interface PropsType {
  clothesListData: any;
  weatherListData: any;
}

const RecommendListOnlyWeather: React.FC<PropsType> = ({ weatherListData }) => {
  // 요일 리스트
  // 오늘
  const today = new Date();
  const week: Array<string> = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const daysList = [
    week[today.getDay()], // 오늘
    week[(today.getDay() + 1) % 7], // 내일
    week[(today.getDay() + 2) % 7], // 모레
  ];

  const navigate = useNavigate();


  return (
    <>
      <div className="flex overflow-x-auto gap-3 pt-4">
        {weatherListData !== null &&
          weatherListData?.map((item, index) => (
            <div
              className={`flex flex-col items-center border w-1/2 h-1/2 rounded-[35px] shadow-md pb-0 ${
                index === 0 ? 'bg-pink' : 'bg-[#E2E2E2]'
              } pb-4 min-w-[200px] max-w-[200px]`}>
              {index === 0 && <TodayBox />}
              <div style={{ marginTop: index === 0 ? '-5px' : '28px' }} className='flex flex-col justify-center items-center'>
                <RecommendListDay day={daysList[index]} />
                <TodayDayWeather weather={item.weather} />
                <div className='my-4'>
                    <RecommendListTemp maxTemperature={item.maxTemperature} minTemperature={item.minTemperature} />
                </div>
                <div className="bg-white/30 rounded-2xl aspect-square mb-4 w-full flex flex-col justify-center text-center p-4">
                    <div className='text-[12px] font-gray-dark'>옷 등록을 통해 <br />옷을 추천받아보세요!</div>
                    <button className='bg-pink-hot mt-2 rounded-2xl text-white p-2' onClick={() => navigate('/mycloset/add-cloth')}>옷 등록하기</button>
                    <div className='text-[10px] text-white text-center mt-2'>카테고리별 1개 이상의 <br/>옷이 있어야해요</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RecommendListOnlyWeather;
