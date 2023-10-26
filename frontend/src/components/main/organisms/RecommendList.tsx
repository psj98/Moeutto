import RecommendItem from "../molecules/RecommendItem";
import TodayBox from "../atoms/TodayBox";

const RecommendList = () => {
    const recommendations = [1, 2, 3];

    return (
        <>
        <div className="flex">
             {recommendations.map((item, index) => (
                <div className={`flex flex-col items-center border rounded-md ${index === 0 ? 'border-pink' : 'border-gray'}`}>
                    {index === 0 && <TodayBox />}
                    <RecommendItem key={index} />
                </div>
            ))}
        </div>
        </>
    )
}

export default RecommendList;