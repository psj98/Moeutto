import React from "react";

interface UserLocationPropsType {
    currentLocation: any;
    address: string;
}

const UserLocation: React.FC<UserLocationPropsType> = ({ currentLocation, address }) => {
    return (
        <div>
            {currentLocation ? (
                <div>{address}</div>
            ) : (
                <div>위치를 설정하러 가볼까요?</div>
            )}
        </div>
    )
}

export default UserLocation;