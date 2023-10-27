import TodayDayWeather from "../atoms/TodayWeather";
import RecommendListDay from "../atoms/RecommendListDay";
import RecommendListTemp from "../atoms/RecommendListTemp";
import RecommendListClothesItem from "../atoms/RecommendListClothesItem";


const RecommendItem = () => {
    const clothesArray1: Array<number> = [1, 2];
    const clothesArray2: Array<number> = [3, 4];
    
    return (
        <div className="flex flex-col justify-center items-center gap-y-2">
            <RecommendListDay />
            <TodayDayWeather />
            <RecommendListTemp />
            <div className="flex justify-center">
                {clothesArray1.map((number, index) => (
                    <RecommendListClothesItem key={index} number={number} />
                ))}
            </div>
            <div className="flex justify-center">
                {clothesArray2.map((number, index) => (
                    <RecommendListClothesItem key={index} number={number} />
                ))}
            </div>
      
        </div>
    )
}

export default RecommendItem;
