import TodayTemp from "../atoms/TodayTemp";
import TodayDate from "../atoms/TodayDate";
import TodayTip from "../atoms/TodayTip";


const MainWeather = () => {
    return (
        <>
        <div className="relative bg-[#FFD8E5] rounded-2xl shadow-md my-4">
            <div className="p-4 mt-16 flex flex-col justify-end items-end">
                <TodayDate />
                <TodayTemp />
            </div>
            <div className="text-[#FF7C7C] text-AppBody1 p-4">오늘은 날씨가 흐리고 <br/> 바람이 많이 붑니다</div>
            <img src="/images/weather1.png" className="w-1/2 absolute -top-20"/>
        </div>
            <div className="bg-gray-button rounded-xl shadow-md p-3 relative">
                <img src="/images/light.png" className="w-[10%] absolute -top-6 right-4" />
                <TodayTip content="TIP. 보온에 신경쓰세요!" />
                <TodayTip content="TIP. 저녁에 추워요. 아우터를 챙기세요!" />
            </div>
        </>
    )
}

export default MainWeather;