const TodayTemp = ({ weatherListData }) => {
    console.log('받은 가짜 데이터', weatherListData[0])

    // console.log('오늘의 최고, 최저 기온 확인하기', weatherListData)

    // useEffect(() => {
    //     console.log(weatherListData)

    // }, [weatherListData])

    // let minTemp: number = 0.0;

    // useEffect(() => {
    //     minTemp = weatherListData?.minTemperature;
        
    //     console.log(minTemp)

    //     console.log(weatherListData)
    // }, [])

    return (
        <>
        <div className="flex text-AppBody1">
            <div className="text-[#0D009E] tracking-wider">{weatherListData[0].minTemperature}℃</div>
            <div className="text-[#EE002B] tracking-wider">{weatherListData[0].maxTemperature}℃</div>
        </div>
        </>
    )
}

export default TodayTemp;