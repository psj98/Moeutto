import React from "react";

interface SetLocationBtnPropsType {
    showLocationClick: () => void;
}

const SetLocationBtn: React.FC<SetLocationBtnPropsType> = ({ showLocationClick }) => {
    return (
        <div>
            <img 
                src="/images/setlocationicon.png" 
                alt="setlocation" 
                onClick={showLocationClick}
                width={20}
            />
        </div>
    )
}

export default SetLocationBtn;