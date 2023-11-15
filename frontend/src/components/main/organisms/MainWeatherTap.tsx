import MainWeather from "../molecules/MainWeather"

const MainWeatherTap = ({ weatherListData }) => {
    return (
        <>
            <div className="mb-6">
                <MainWeather weatherListData={weatherListData} />
            </div>
        </>
    )
}

export default MainWeatherTap;