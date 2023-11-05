import TodayTemp from "../atoms/TodayTemp";
import TodayDate from "../atoms/TodayDate";

const MainWeather = () => {
    return (
        <>
            <div className="my-4 bg-[#FFD8E5] rounded-2xl shadow-md">
                <img src="/images/weather1.png" alt="" />
                <TodayDate />
                <TodayTemp />
                <div className="text-[#FF7C7C] text-AppBody1">오늘은 날씨가 흐리고 <br/> 바람이 많이 붑니다</div>
            </div>
            <div className="bg-gray-button rounded-xl shadow-md p-2">
                <div className="text-AppBody2 font-bold">TIP. 보온에 신경쓰세요!</div>
                <div className="text-AppBody2 font-bold">TIP. 저녁에 추워요. 아우터를 챙기세요!</div>
            </div>
        </>
    )
}

export default MainWeather;