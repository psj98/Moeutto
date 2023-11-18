import { useEffect, useState } from "react";

import TodayTemp from "../atoms/TodayTemp";
import TodayDate from "../atoms/TodayDate";
import TodayTip from "../atoms/TodayTip";

const MainWeather = ({ weatherListData }) => {
    // 해: 1, 구름: 2, 해&구름: 3, 비: 4, 눈: 5, 번개: 6 
    const maxTemp: number = weatherListData[0].maxTemperature;
    const minTemp: number = weatherListData[0].minTemperature;
    const weatherState: number = weatherListData[0].weather;

    const weatherList1 = 
    [ "", "오늘은 날씨가 화창하고", "오늘은 날씨가 흐리고", "오늘은 구름이 있지만", "오늘은 날씨가 흐리고", "오늘은 날씨가 흐리고", "오늘은 번쩍번쩍 번개가 있어요" ]

    const weatherList2 = 
    [ "", "맑은 날이네요", "바람이 많이 부네요", "해가 있어 맑은 날이에요", "비가 올 예정이에요", "눈이 올 예정이에요", "번개를 조심하세요" ]

    const [firstTip, setFirstTip] = useState<string>("");
    const [secondTip, setSecondTip] = useState<string>("");

    useEffect(() => {
        if (minTemp <= 0) {
            setFirstTip("두꺼운 아우터를 착용하세요")
        } else {
            if (maxTemp > 10) {
                setFirstTip("오후에는 따뜻해요")
            }
            setFirstTip("보온에 신경쓰세요")
        }
    
        if (maxTemp - minTemp > 10) {
            setSecondTip("일교차가 커서 옷차림을 신경써야해요");
        } else if (weatherState === 3 || weatherState === 2) {
                    setSecondTip("구름이 있어요 날씨가 흐리네요");
                } else if (weatherState === 4) {
                    setSecondTip("비 소식이 있어요 우산을 챙기세요");
                } else if (weatherState === 5) {
                    setSecondTip("눈 소식이 있어요");
                } else {
                    setSecondTip("오늘은 날씨가 화창하네요");
                }

                
            }, [])
        window.localStorage.setItem('first', firstTip);
        window.localStorage.setItem('second', secondTip);


    return (
        <>
        <div className="relative bg-[#FFD8E5] rounded-2xl shadow-md my-4">
            <div className="p-4 mt-16 flex flex-col justify-end items-end">
                <TodayDate />
                <TodayTemp weatherListData={weatherListData} />
            </div>
            <div className="text-[#131313] font-bold text-AppBody1 p-4 mt-4">{weatherList1[`${weatherState}`]}<br/>{weatherList2[`${weatherState}`]}</div>
            <img src={`/images/weather/weather${weatherListData[0].weather}.png`} className="w-1/2 max-w-[170px] absolute left-2 -top-14"/>
        </div>
            <div className="bg-white rounded-xl shadow-md p-3 relative">
                <img src="/images/light.png" className="w-[10%] absolute -top-6 right-4" />
                <TodayTip content={firstTip} />
                <TodayTip content={secondTip} />
            </div>
        </>
    )
}

export default MainWeather;