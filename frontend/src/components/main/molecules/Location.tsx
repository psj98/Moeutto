import React from "react";

import MapIcon from "../atoms/MapIcon";
import UserLocation from "../atoms/UserLocation";
import SetLocationBtn from "../atoms/SetLocationBtn";

const Location = () => {
    return (
        <div>
            <MapIcon />
            <UserLocation />
            <SetLocationBtn />
        </div>
    )
}

export default Location;