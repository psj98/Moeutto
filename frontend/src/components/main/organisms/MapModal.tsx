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
    handleInputChange: (newValue: any) => void;
    newLocation: string;
}

const MapModal: React.FC<MapModalPropsType> = ({ 
        currentLocation, 
        address, 
        locationState,
        setCurrentLocation,
        setAddress,
        setResetLocation,
        resetLocation,
        showLocationClick,
        handleInputChange,
        newLocation
    }) => {

    return (
        <>
        {locationState &&
        <div className="border-2 border-pink rounded-xl shadow-lg flex flex-col items-center bg-white p-8">
            <MapSettingForm 
                setResetLocation={setResetLocation}
                currentLocation={currentLocation} 
                address={address} 
                showLocationClick={showLocationClick}
                handleInputChange={handleInputChange}
            />
            <ShowMap 
                setCurrentLocation={setCurrentLocation} 
                setAddress={setAddress}  
                resetLocation={resetLocation}
                newLocation={newLocation}
            />
        </div>
        }
        </>
    )
};

export default MapModal;