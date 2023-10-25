import React from "react";

import TodayDate from "../atoms/TodayDate";
import UserName from "../atoms/UserName";
import Location from "../molecules/Location";

const MainInfo = () => {
    return (
        <div>
            <div>
                <UserName />
                <TodayDate />
            </div>
            <div>
                <Location />
            </div>

        </div>
    )
}

export default MainInfo;