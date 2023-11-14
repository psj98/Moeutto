import React, { Dispatch } from "react";
import { BsGlobe } from "react-icons/bs";

interface CurrentLocationBtnPropsType {
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
}

const CurrentLocationBtn: React.FC<CurrentLocationBtnPropsType> = ({ setResetLocation }) => {
    return (
        <div className="flex mt-2 items-center">
            <BsGlobe size={25} className="text-pink absolute ms-2" />
            <button onClick={() => {
                setResetLocation((prev) => !prev)
                }}
                className="bg-white w-[280px] rounded-2xl shadow-md text-gray-dark p-2 rounded-2xl h-[40px] shadow-md text-gray-dark ps-10 flex items-center justify-center"
            >현재 위치로 설정</button>
        </div>
    )
};

export default CurrentLocationBtn;
