import React from "react";

import TodayDate from "../atoms/TodayDate";
import UserName from "../atoms/UserName";
import Location from "../molecules/Location";

interface MainInfoPropsType {
    currentLocation: any;
    address: string;
    showLocationClick: () => void;
}

const MainInfo: React.FC<MainInfoPropsType> = ({ currentLocation, address, showLocationClick }) => {
    return (
        <div>
            <div>
                <UserName />
                <TodayDate />
            </div>
            <div>
                <Location currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
            </div>

        </div>
    )
}

export default MainInfo;