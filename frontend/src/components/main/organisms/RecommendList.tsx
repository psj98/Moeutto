import React, { useEffect, useState } from 'react';
import RecommendItem from '../molecules/RecommendItem';
import TodayBox from '../atoms/TodayBox';

interface PropsType {
  clothesListData: any;
  weatherListData: any;
}

const RecommendList: React.FC<PropsType> = ({ clothesListData, weatherListData }) => {
  // 요일 리스트
  // 오늘
  const today = new Date();
  const week: Array<string> = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const daysList = [
    week[today.getDay()], // 오늘
    week[(today.getDay() + 1) % 7], // 내일
    week[(today.getDay() + 2) % 7], // 모레
  ];

  // 2개 배열 하나로 합치기 (하나의 컴포넌트에 전달하기 위함)
  // 상태로 combinedList를 저장
  const [combinedList, setCombinedList] = useState<any>([]);

  useEffect(() => {
    // clothesListData와 weatherListData를 합쳐서 combinedList 생성
    const newCombinedList = clothesListData?.map((clothesItem, index) => ({
      ...clothesItem,
      ...weatherListData[index],
    }));

    // combinedList 상태 업데이트
    setCombinedList(newCombinedList);
  }, [clothesListData, weatherListData]);

  return (
    <>
      <div className="flex gap-3">
        {combinedList !== null &&
          combinedList?.map((item, index) => (
            <div
              className={`flex flex-col items-center border w-1/3 h-1/2 rounded-2xl shadow-md pb-0 ${
                index === 0 ? 'bg-pink' : 'border-gray'
              } pb-4 min-w-[150px] max-w-[170px]`}>
              {index === 0 && <TodayBox />}
              <div style={{ marginTop: index === 0 ? '-5px' : '28px' }}>
                <RecommendItem
                  key={index}
                  clothesListData={item.clothesInfo}
                  maxTemperature={item.maxTemperature}
                  minTemperature={item.minTemperature}
                  weather={item.weather}
                  day={daysList[index]}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RecommendList;
