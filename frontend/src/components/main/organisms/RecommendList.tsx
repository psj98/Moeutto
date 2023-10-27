import RecommendItem from "../molecules/RecommendItem";
import TodayBox from "../atoms/TodayBox";

const RecommendList = () => {
    const recommendations = [1, 2, 3];

    return (
        <>
        <div className="flex gap-3">
             {recommendations.map((item, index) => (
                <div className={`flex flex-col items-center border w-1/3 h-2/3 rounded-md shadow-md ${index === 0 ? 'border-pink-hot' : 'border-gray'} pb-4`}>
                    {index === 0 && 
                    <TodayBox />}
                    <div style={{ marginTop: index === 0 ? '-5px' : '31px' }}>
                        <RecommendItem 
                            key={index} 
                        />
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default RecommendList;