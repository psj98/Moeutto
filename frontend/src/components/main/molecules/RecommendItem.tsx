import React from "react";
import TodayDayWeather from "../atoms/TodayWeather";
import RecommendListDay from "../atoms/RecommendListDay";
import RecommendListTemp from "../atoms/RecommendListTemp";
import RecommendListClothesItem from "../atoms/RecommendListClothesItem";

interface PropsType {
    clothesListData: any;
    maxTemperature: any;
    minTemperature: any;
    weather: any;
    day: any;
}

const RecommendItem: React.FC<PropsType> = ({
    maxTemperature,
    minTemperature,
    weather,
    clothesListData,
    day
}) => {

    const clothesArray1: any = clothesListData.slice(0, 2);
    let clothesArray2: any = clothesListData.slice(2, 4);

    // 추천 아이템이 3가지인 경우
    if (clothesListData.length === 3) {
        clothesArray2 = clothesListData.slice(2, 3);
    }
    
    return (
        <div className="flex flex-col justify-center items-center p-4 gap-y-2">
            <RecommendListDay day={day} />
            <TodayDayWeather weather={weather} />
            <RecommendListTemp maxTemperature={maxTemperature} minTemperature={minTemperature} />
            <div className="bg-white/30 rounded-2xl aspect-square">
                <div className="flex justify-center h-auto">
                    {clothesArray1.map((item, index) => (
                        <RecommendListClothesItem 
                            key={index} 
                            clothesId={item.clothesId}
                            imgUrl={item.imageUrl}
                            number={item} 
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    {clothesArray2.map((item, index) => (
                        <RecommendListClothesItem 
                            key={index} 
                            clothesId={item.clothesId}
                            imgUrl={item.imageUrl}
                            number={item} 
                        />
                    ))}
                </div>
            </div>
      
        </div>
    )
}

export default RecommendItem;
