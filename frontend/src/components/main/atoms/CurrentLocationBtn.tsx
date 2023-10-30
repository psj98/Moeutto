import React, { Dispatch } from "react";
import { BsGlobe } from "react-icons/bs";

interface CurrentLocationBtnPropsType {
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
}

const CurrentLocationBtn: React.FC<CurrentLocationBtnPropsType> = ({ setResetLocation }) => {
    return (
        <div className="flex">
            <BsGlobe size={25} />
            <button onClick={() => {
                setResetLocation((prev) => !prev)
            }}>현재 위치로 설정</button>
        </div>
    )
}

const CurrentLocationBtn: React.FC<CurrentLocationBtnProps> = ({ resetToCurrentLocation }) => {
  return (
    <>
      <button onClick={resetToCurrentLocation} className="bg-pink-hot">
        현재 위치로 설정하기
      </button>
    </>
  );
};

export default CurrentLocationBtn;
