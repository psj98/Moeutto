import React from "react";

interface CurrentLocationBtnProps {
    // resetToCurrentLocation: () => void;
}

const CurrentLocationBtn: React.FC<CurrentLocationBtnProps> = () => {
    return (
        <div className="flex">
            <img src="/images/location.png" alt="map" />
            {/* <button onClick={resetToCurrentLocation}>현재 위치로 설정</button> */}
        </div>
    )
}

export default CurrentLocationBtn;