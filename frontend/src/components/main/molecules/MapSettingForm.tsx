import React, { Dispatch } from "react";
import { AiOutlineClose } from "react-icons/ai";

import SearchLocation from "../atoms/SearchLocation";
import UserLocation from "../atoms/UserLocation";
import CurrentLocationBtn from "../atoms/CurrentLocationBtn";
import LocationSet from "../atoms/LocationSet";
import MapIcon from "../atoms/MapIcon";

interface MapSettingPropsType {
    currentLocation: any;
    address: string;
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
    showLocationClick: () => void;
    handleInputChange: (newValue: any) => void;
}

const MapSettingForm: React.FC<MapSettingPropsType> = ({ 
        currentLocation, 
        address,
        setResetLocation,
        showLocationClick,
        handleInputChange
     }) => {
    return (
        <>
            <div className="flex justify-center items-center w-full">
                    <LocationSet />
                <div className="flex items-center justify-end">
                    <AiOutlineClose onClick={showLocationClick} size={25} />
                </div>
            </div>
            <SearchLocation handleInputChange={handleInputChange}  />
            <CurrentLocationBtn 
                setResetLocation={setResetLocation}
            />
            <div className="flex gap-1">
                <MapIcon color={'black'} />
                <UserLocation currentLocation={currentLocation} address={address} color={'black'} />
            </div>
        </>
    )
};

export default MapSettingForm;