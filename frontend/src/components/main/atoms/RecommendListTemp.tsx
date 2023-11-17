import React from "react";

interface TempPropsType {
    minTemperature: any;
    maxTemperature: any;
}

const RecommendListTemp: React.FC<TempPropsType> = ({ minTemperature, maxTemperature}) => {
    console.log('그래서 최고, 최저 온도를 구했니?', minTemperature, maxTemperature)

    return (
        <>
            <div className="text-AppBody1">{minTemperature}℃/{maxTemperature}℃</div>
        </>
    )
}

export default RecommendListTemp;