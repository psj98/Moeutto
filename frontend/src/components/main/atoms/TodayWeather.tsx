import React from "react";

interface WeatherPropsType {
    weather: any;
}

const TodayDayWeather: React.FC<WeatherPropsType> = ({ weather }) => {

    return (
       <div className="flex justify-center">
            <img src={`/images/weather${weather}.png`} alt="weather" className="w-2/3" />
       </div> 
    )
};

export default TodayDayWeather;