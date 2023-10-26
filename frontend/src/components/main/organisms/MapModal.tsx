import React, { Dispatch, SetStateAction } from "react";
import ShowMap from "../atoms/ShowMap";
import MapSettingForm from "../molecules/MapSettingForm";

interface MapModalPropsType {
    currentLocation: any;
    address: string;
    locationState: boolean;
    setCurrentLocation: Dispatch<SetStateAction<{ latitude: number; longitude: number } | null>>;
    setAddress: Dispatch<React.SetStateAction<string>>;
    setResetLocation: Dispatch<React.SetStateAction<boolean>>;
    resetLocation: boolean;
    showLocationClick: () => void;
}

const MapModal: React.FC<MapModalPropsType> = ({ 
        currentLocation, 
        address, 
        locationState,
        setCurrentLocation,
        setAddress,
        setResetLocation,
        resetLocation,
        showLocationClick
    }) => {

    return (
        <>
        {locationState &&
        <div className="border border-pink rounded-md flex flex-col items-center">
            <MapSettingForm 
                setResetLocation={setResetLocation}
                currentLocation={currentLocation} 
                address={address} 
                showLocationClick={showLocationClick}
            />
            <ShowMap 
                setCurrentLocation={setCurrentLocation} 
                setAddress={setAddress}  
                resetLocation={resetLocation}
            />
        </div>
        }
        </>
    )
};

export default MapModal;