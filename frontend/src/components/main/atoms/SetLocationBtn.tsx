import React from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SetLocationBtnPropsType {
    showLocationClick: () => void;
}


const SetLocationBtn: React.FC<SetLocationBtnPropsType> = ({ showLocationClick }) => {
    return (
        <div>
                <IoIosArrowDown
                    onClick={showLocationClick}
                    color="FAA0BF"
                />
        </div>
    )
}

export default SetLocationBtn;