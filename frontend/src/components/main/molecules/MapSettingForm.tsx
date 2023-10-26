import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";

import SearchLocation from "../atoms/SearchLocation";
import UserLocation from "../atoms/UserLocation";
import CurrentLocationBtn from "../atoms/CurrentLocationBtn";
import LocationSet from "../atoms/LocationSet";

interface MapSettingPropsType {
    currentLocation: any;
    address: string;
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
    showLocationClick: () => void;
}

const MapSettingForm: React.FC<MapSettingPropsType> = ({ 
        currentLocation, 
        address,
        setResetLocation,
        showLocationClick
     }) => {
    return (
        <>
            <div className="flex">
                <LocationSet />
                <AiOutlineClose onClick={showLocationClick} />
            </div>
            <SearchLocation  />
            <CurrentLocationBtn 
                setResetLocation={setResetLocation}
            />
            <UserLocation currentLocation={currentLocation} address={address} />
        </>
    )
};

export default MapSettingForm;