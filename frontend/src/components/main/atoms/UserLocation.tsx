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
                <div>현재 위치 정보가 없어요</div>
            )}
        </div>
    )
}

export default UserLocation;