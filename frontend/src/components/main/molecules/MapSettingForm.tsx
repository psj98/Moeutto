import React, { Dispatch } from "react";
import SearchLocation from "../atoms/SearchLocation";
import UserLocation from "../atoms/UserLocation";
import CurrentLocationBtn from "../atoms/CurrentLocationBtn";
import LocationSet from "../atoms/LocationSet";

interface MapSettingPropsType {
    currentLocation: any;
    address: string;
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;

}

const MapSettingForm: React.FC<MapSettingPropsType> = ({ 
        currentLocation, 
        address,
        setResetLocation
 
     }) => {
    return (
        <>
            <LocationSet />
            <SearchLocation  />
            <CurrentLocationBtn 
                setResetLocation={setResetLocation}
            />
            <UserLocation currentLocation={currentLocation} address={address} />
        </>
    )
};

export default MapSettingForm;