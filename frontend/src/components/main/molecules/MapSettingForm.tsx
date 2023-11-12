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
                <div className="absolute right-3 top-3">
                    <AiOutlineClose onClick={showLocationClick} size={25} />
                </div>
            </div>
            <SearchLocation handleInputChange={handleInputChange}  />
            <CurrentLocationBtn 
                setResetLocation={setResetLocation}
            />
            <div className="flex gap-1 mt-4 mb-4">
                <MapIcon color={'gray'} />
                <UserLocation currentLocation={currentLocation} address={address} color={'black'} />
            </div>
        </>
    )
};

export default MapSettingForm;