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
}

const RecommendItem: React.FC<PropsType> = ({
    maxTemperature,
    minTemperature,
    weather,
    clothesListData
}) => {
    // console.log('옷 리스트 순회', clothesInAIOutfit)
    const clothesArray1: any = clothesListData.slice(0, 2);
    const clothesArray2: any = clothesListData.slice(2, 4);
    
    console.log('옷 리스트 마지막 단계', clothesArray1);

    return (
        <div className="flex flex-col justify-center items-center p-4 gap-y-2">
            <RecommendListDay />
            <TodayDayWeather weather={weather} />
            <RecommendListTemp maxTemperature={maxTemperature} minTemperature={minTemperature} />
            <div className="flex justify-center">
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
    )
}

export default RecommendItem;
