import React from "react";
import SearchLocation from "../atoms/SearchLocation";
import UserLocation from "../atoms/UserLocation";
import CurrentLocationBtn from "../atoms/CurrentLocationBtn";
import LocationSet from "../atoms/LocationSet";

interface MapSettingPropsType {
    // resetToCurrentLocation: () => void;
    currentLocation: any;
    address: string;

}

const MapSettingForm: React.FC<MapSettingPropsType> = ({ 
        // resetToCurrentLocation, 
        currentLocation, 
        address,

     }) => {
    return (
        <>
            <LocationSet />
            <SearchLocation  />
            <CurrentLocationBtn 
            // resetToCurrentLocation={resetToCurrentLocation} 
            />
            <UserLocation currentLocation={currentLocation} address={address} />
        </>
    )
};

export default MapSettingForm;