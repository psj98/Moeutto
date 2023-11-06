import React from "react";

interface UserLocationPropsType {
    currentLocation: any;
    address: string;
    color: string;
}

const UserLocation: React.FC<UserLocationPropsType> = ({ currentLocation, address, color }) => {

    let currentAddress: string | null = window.localStorage.getItem('address');

    if (!currentAddress) {
        currentAddress = address;
    }

    return (
        <div>
            {currentAddress ? (
                <div className={`text-${color} text-AppBody1`}>
                    {currentAddress}
                </div>
            ) : (
                <div className={`text-${color} text-AppBody1`}>위치를 설정하러 가볼까요?</div>
            )}
        </div>
    )
}

export default UserLocation;