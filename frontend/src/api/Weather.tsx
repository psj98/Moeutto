// import axios from "axios";
// import { useEffect, useState } from "react";

export {}

// const Weather = () => {
//     // 날씨 api 를 불러오는 로직 입니다.
//     // const location: string = window.localStorage.getItem("address");

//     // const ServiceKey: string = "";

//     // 오늘 날짜 형식 20231101
//     // const today = new Date();
//     // const year = today.getFullYear();

//     // const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, padStart로 자릿수 맞춤
//     // const day = today.getDate().toString().padStart(2, '0'); // padStart로 자릿수 맞춤

//     // const formattedDate = `${year}${month}${day}-1`;

//     const [weatherData, setWeatherData] = useState<any>();
//     // const [sky, setSky] = useState<string>("");
//     // const [pty, setPty] = useState<string>("");

//     const getWeatherData = async () => {
//         try {
//             // const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
//                 params: {
//                     ServiceKey: "G6yQmPBxnK7td0JNQETr4KPoTsX9LFVDyi5AlQljW8gXXhUKuZY2VODvDAtVU2bVpsv5uIIQbMurxwuEDmxSOA==" ,
//                     pageNo: "1",
//                     numOfRows: "500",
//                     dataType: "JSON",
//                     base_date: "20231031",
//                     base_time: "0500",
//                     // 강남구 역삼1동
//                     nx: "61",
//                     ny: "125"
//                 }
//             });
            
//             console.log('날씨 데이터 부르기', response.data.response.body.items);
//             setWeatherData(response.data.response.body.items.item)

//         } catch (error) {
//             console.log('날씨 부르다가 에러남', error)
//         }
//     }

//     useEffect(() => {
//         getWeatherData();
        
//     }, [])

//     console.log('날씨 리스트', weatherData)

    
//     if (weatherData && Array.isArray(weatherData)) {
//         const weatherInfo = {
//             sky: null,
//             pty: null,
//             tmn: null,
//             tmx: null,
//             wsd: null
//           };
          
//           // 하늘
//           const skyValue = weatherData.find(item => item.category === "SKY");

//           weatherInfo.sky = skyValue ? skyValue.fcstValue : null;
          
//           // 강수
//           const ptyValue = weatherData.find(item => item.category === "PTY");

//           weatherInfo.pty = ptyValue ? ptyValue.fcstValue : null;
          
//           // 최고
//           const tmnValue = weatherData.find(item => item.category === "TMN");

//           weatherInfo.tmn = tmnValue ? tmnValue.fcstValue : null;
          
//           // 최저
//           const tmxValue = weatherData.find(item => item.category === "TMX");

//           weatherInfo.tmx = tmxValue ? tmxValue.fcstValue : null;
          

//           // 풍속
//           const wsdValue = weatherData.find(item => item.category === "WSD");

//           weatherInfo.wsd = wsdValue ? wsdValue.fcstValue : null;
          
//           // Log the constructed weather information object
//           console.log("Constructed Weather Information:", weatherInfo);
//     } else {
//         console.log("Weather data is undefined or not an array.");
//     }
    

//     return (
//         <>
//         </>
//     )
// }

// export default Weather;