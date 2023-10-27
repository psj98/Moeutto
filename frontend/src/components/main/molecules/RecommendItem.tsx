import TodayDayWeather from "../atoms/TodayWeather";
import RecommendListDay from "../atoms/RecommendListDay";
import RecommendListTemp from "../atoms/RecommendListTemp";
import RecommendListClothesItem from "../atoms/RecommendListClothesItem";


const RecommendItem = () => {
    const clothesArray1: Array<number> = [1, 2];
    const clothesArray2: Array<number> = [3, 4];
    
    return (
        <>
            <RecommendListDay />
            <TodayDayWeather />
            <RecommendListTemp />
            <div className="flex">
                {clothesArray1.map((number, index) => (
                    <RecommendListClothesItem key={index} number={number} />
                ))}
            </div>
            <div className="flex">
                {clothesArray2.map((number, index) => (
                    <RecommendListClothesItem key={index} number={number} />
                ))}
            </div>
        </>
    )
}

export default RecommendItem;
