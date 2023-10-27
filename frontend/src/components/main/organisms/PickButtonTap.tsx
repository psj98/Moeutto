import React from "react";
import PickTap from "../molecules/PickTap";
import TodayDateComment from "../atoms/TodayDateComment";


const PickButtonTap = () => {
    return (
        <div>
            <TodayDateComment />
            <PickTap />
        </div>
    )
}

export default PickButtonTap;