import React from "react";

import MapIcon from "../atoms/MapIcon";
import UserLocation from "../atoms/UserLocation";
import SetLocationBtn from "../atoms/SetLocationBtn";

interface LocationPropsType {
    currentLocation: any;
    address: string;
    showLocationClick: () => void;
}

const Location: React.FC<LocationPropsType> = ({ currentLocation, address, showLocationClick }) => {
    return (
        <div className="flex items-center gap-1 -mt-2">
            <MapIcon color={"DCDCDC"} />
            <UserLocation currentLocation={currentLocation} address={address} color={'[#DCDCDC]'} />
            <SetLocationBtn showLocationClick={showLocationClick} />
        </div>
    )
}

export default Location;