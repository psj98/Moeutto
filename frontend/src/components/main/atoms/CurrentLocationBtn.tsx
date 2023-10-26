import React from "react";

interface CurrentLocationBtnProps {
    resetToCurrentLocation: () => void;
  }

const CurrentLocationBtn: React.FC<CurrentLocationBtnProps> = ({ resetToCurrentLocation }) => {
    return (
        <>
            <button onClick={resetToCurrentLocation} className="bg-pink-hot">현재 위치로 설정하기</button>
        </>
    )
}

export default CurrentLocationBtn;