import React from "react";

interface UserLocationPropsType {
    currentLocation: any;
    address: string;
    color: string;
}

const UserLocation: React.FC<UserLocationPropsType> = ({ currentLocation, address, color }) => {
    return (
        <div>
            {currentLocation ? (
                <div className={`text-${color}`}>{address}</div>
            ) : (
                <div className={`text-${color}`}>위치를 설정하러 가볼까요?</div>
            )}
        </div>
    )
}

export default UserLocation;