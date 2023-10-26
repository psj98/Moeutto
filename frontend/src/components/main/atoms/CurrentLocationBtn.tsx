import React, { Dispatch } from "react";
import { BsGlobe } from "react-icons/bs";

interface CurrentLocationBtnPropsType {
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
}

const CurrentLocationBtn: React.FC<CurrentLocationBtnPropsType> = ({ setResetLocation }) => {
    return (
        <div className="flex">
            <BsGlobe />
            <button onClick={() => {
                setResetLocation((prev) => !prev)
            }}>현재 위치로 설정</button>
        </div>
    )
}

export default CurrentLocationBtn;