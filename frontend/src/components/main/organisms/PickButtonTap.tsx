import React, { ChangeEvent } from "react";
import PickTap from "../molecules/PickTap";
import TodayDateComment from "../atoms/TodayDateComment";

interface PickButtonTapPropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PickButtonTap: React.FC<PickButtonTapPropsType> = ({ handleImageChange }) => {
    return (
        <div>
            <TodayDateComment />
            <PickTap handleImageChange={handleImageChange} />
        </div>
    )
}

export default PickButtonTap;