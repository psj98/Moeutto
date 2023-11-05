import React from "react";

interface TempPropsType {
    minTemperature: any;
    maxTemperature: any;
}

const RecommendListTemp: React.FC<TempPropsType> = ({ minTemperature, maxTemperature}) => {
    return (
        <>
            <div className="text-AppBody1">{minTemperature}℃/{maxTemperature}℃</div>
        </>
    )
}

export default RecommendListTemp;