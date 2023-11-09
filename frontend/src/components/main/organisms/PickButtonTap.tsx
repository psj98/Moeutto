import React from "react";
import PickTap from "../molecules/PickTap";
import MainComment from "../atoms/MainComment";


const PickButtonTap = () => {
    return (
        <div className="mb-8">
            <MainComment title={"오늘 날씨에 잘 어울릴까요?"} />
            <PickTap />
        </div>
    )
}

export default PickButtonTap;