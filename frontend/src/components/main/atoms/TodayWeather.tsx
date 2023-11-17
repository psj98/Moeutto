import React from "react";

interface WeatherPropsType {
    weather: any;
}

const TodayDayWeather: React.FC<WeatherPropsType> = ({ weather }) => {

    // 해: 1, 구름: 2, 해&구름: 3, 비: 4, 눈: 5, 번개: 6 

    return (
       <div className="flex justify-center">
            <img src={`/images/weather/weather${weather}.png`} alt="weather" className="w-[100px] h-[80px] object-cover" />
       </div> 
    )
};

export default TodayDayWeather;