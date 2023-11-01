import axios from "axios";
import { useEffect } from "react";

const Weather = () => {
    // 날씨 api 를 불러오는 로직 입니다.
    // const location: string = window.localStorage.getItem("address");

    const ServiceKey: string = "G6yQmPBxnK7td0JNQETr4KPoTsX9LFVDyi5AlQljW8gXXhUKuZY2VODvDAtVU2bVpsv5uIIQbMurxwuEDmxSOA%3D%3D";

    // 오늘 날짜 형식 20231101
    const today = new Date();
    const year = today.getFullYear();

    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, padStart로 자릿수 맞춤
    const day = today.getDate().toString().padStart(2, '0'); // padStart로 자릿수 맞춤

    const formattedDate = `${year}${month}${day}-1`;

    const getWeatherData = async () => {
        try {
            const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                params: {
                    ServiceKey,
                    pageNo: 1,
                    numOfRows: 10,
                    dataType: JSON,
                    base_date: formattedDate,
                    base_time: "0500",
                    // 강남구 역삼1동
                    nx: 61,
                    ny: 125
                }
            });
            
            console.log('날씨 데이터 부르기', response);
        } catch (error) {
            console.log('날씨 부르다가 에러남', error)
        }
    }

    useEffect(() => {
        getWeatherData();
    }, [])

    return (
        <>
        </>
    )
}

export default Weather;