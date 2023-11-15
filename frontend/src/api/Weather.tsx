import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ setWeatherListData }) => {
    // 날씨 api 를 불러오는 로직 입니다.
    // const location: string = window.localStorage.getItem("address");

    // const ServiceKey: string = "";

    // 오늘 날짜 형식 20231101
    const today = new Date();
    const todayDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;

    // 어제 날짜
    // const yesterday = (parseInt(todayDate, 10)-1).toString();

    // 내일 날짜
    const tomorrow = (parseInt(todayDate, 10)+1).toString();

    // 내일 모레
    const aftertomorrow = (parseInt(todayDate, 10)+2).toString();

    // 날씨 리스트 받기
    const [weatherData, setWeatherData] = useState<any>();

    // 3일의 최고, 최저 온도 리스트
    const weatherListData = [
        // 추천 날씨 목록
        {
          minTemperature: null, // 최저 기온
          maxTemperature: null, // 최고 기온
          weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
        },
        {
          minTemperature: null, // 최저 기온
          maxTemperature: null, // 최고 기온
          weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
        },
        {
          minTemperature: null, // 최저 기온
          maxTemperature: null, // 최고 기온
          weather: 1, // 날씨 정보 (맑음, 구름 조금 등)
        },
      ]

    const getWeatherData = async () => {
      console.log('2. 날씨 데이터 함수 시작')
        try {
            const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                params: {
                    ServiceKey: "G6yQmPBxnK7td0JNQETr4KPoTsX9LFVDyi5AlQljW8gXXhUKuZY2VODvDAtVU2bVpsv5uIIQbMurxwuEDmxSOA==" ,
                    pageNo: "1",
                    numOfRows: "1000",
                    dataType: "JSON",
                    base_date: todayDate,
                    base_time: "0500",
                    // 강남구 역삼1동
                    nx: "61",
                    ny: "125"
                }
            });
            
            console.log('날씨 데이터 부르기', response.data.response.body.items?.item);

            const weatherItems = response.data.response.body.items?.item;


            if (weatherItems && Array.isArray(weatherItems)) {
              setWeatherData(weatherItems);
            } else {
              console.log('날씨 데이터를 찾을 수 없습니다')
            }
    

        } catch (error) {
            console.log('날씨 부르다가 에러남', error)
        }
    }

    useEffect(() => {
        console.log('1. 날씨 api 호출하기')
        console.log(getWeatherData);
        // getWeatherData();
        console.log('3. 날씨 api호출 함수가 끝났음')
        setTimeout(() => {
          console.log('4. 데이터 가공 시작')
          if (weatherData && Array.isArray(weatherData)) {
              console.log('날씨 데이터가 존재하고, 배열인가?', weatherListData)
              // 3일간의 날씨 정보
              // 오늘
              const todayMax = weatherData.find(data => data.fcstDate === todayDate && data.category === 'TMX');
              const todayMin = weatherData.find(data => data.fcstDate === todayDate && data.category === 'TMN');
              // 내일
              const tomorrowMax = weatherData.find(data => data.fcstDate === tomorrow && data.category === 'TMX');
              const tomorrowMin = weatherData.find(data => data.fcstDate === tomorrow && data.category === 'TMN');
              // 내일 모레
              const aftertomorrowMax = weatherData.find(data => data.fcstDate === aftertomorrow && data.category === 'TMX');
              const aftertomorrowMin = weatherData.find(data => data.fcstDate === aftertomorrow && data.category === 'TMN');
              
              // 데이터 가공하기
              weatherListData[0].maxTemperature = todayMax ? todayMax.fcstValue : null;
              weatherListData[0].minTemperature = todayMin ? todayMin.fcstValue : null;
              weatherListData[1].maxTemperature = tomorrowMax ? tomorrowMax.fcstValue : null;
              weatherListData[1].minTemperature = tomorrowMin ? tomorrowMin.fcstValue : null;
              weatherListData[2].maxTemperature = aftertomorrowMax ? aftertomorrowMax.fcstValue : null;
              weatherListData[2].minTemperature = aftertomorrowMin ? aftertomorrowMin.fcstValue : null;
      
            } else {
              console.log('5. 데이터 없어서 가공 실패')
            }
      
            // 데이터 메인페이지에 저장하기
            console.log('날씨 데이터 하위 컴포넌트에서 잘 저장하고 있는지 확인', weatherListData)
            setWeatherListData(weatherListData);
          }, 3000)
          console.log('6. 데이터 저장하기 성공', weatherListData)
    }, [])

    return null
}

export default Weather;