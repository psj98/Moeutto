import React from "react";

const PickCloset = () => {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <img src={`/images/closet3d.png`} alt="icon" className="w-28 h-28 hover:scale-105" />
            <div className="text-WebBody3">골라골라 옷장에서 골라</div>
        </div>
    )
}

export default PickCloset;