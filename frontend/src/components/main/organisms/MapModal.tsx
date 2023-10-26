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
}

const MapModal: React.FC<MapModalPropsType> = ({ 
        currentLocation, 
        address, 
        locationState,
        setCurrentLocation,
        setAddress,
    }) => {


    return (
        <>
        {locationState &&
        <div>
            <MapSettingForm 
                // resetToCurrentLocation={resetToCurrentLocation} 
                currentLocation={currentLocation} 
                address={address} 
            />
            <ShowMap 
                setCurrentLocation={setCurrentLocation} 
                setAddress={setAddress}  
            />
        </div>
        }
        </>
    )
};

export default MapModal;