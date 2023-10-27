import React from "react";

interface PropsType {
    day: any;
}

const RecommendListDay: React.FC<PropsType> = ({ day }) => {

    return (
        <div className="font-bold text-WebBody2">
           { day }
        </div>
    )
}

export default RecommendListDay;