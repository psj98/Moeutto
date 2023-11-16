import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';

const TodayTemp = ({ weatherListData }) => {
  console.log('받은 가짜 데이터', weatherListData[0]);

  // console.log('오늘의 최고, 최저 기온 확인하기', weatherListData)

  // useEffect(() => {
  //     console.log(weatherListData)

  // }, [weatherListData])

  // let minTemp: number = 0.0;

  // useEffect(() => {
  //     minTemp = weatherListData?.minTemperature;

  //     console.log(minTemp)

  //     console.log(weatherListData)
  // }, [])

  return (
    <>
      <div className="flex text-[18px]">
        <div className="text-[#0D1282] tracking-wider me-2 flex justify-center items-center">
          <FaCaretDown />
          {weatherListData[0].minTemperature}℃
        </div>
        <div className="text-[#D71313] tracking-wider flex justify-center items-center">
          <FaCaretUp />
          {weatherListData[0].maxTemperature}℃
        </div>
      </div>
    </>
  );
};

export default TodayTemp;
