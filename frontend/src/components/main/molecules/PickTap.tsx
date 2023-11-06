import React from "react";
import { useNavigate } from "react-router-dom";
import PickCloset from "../atoms/PickCloset";


const PickTap = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center mt-3 h-[136px]">
            <div className="bg-gray-button w-full rounded-2xl shadow-md flex justify-center items-center" onClick={() => navigate('/pickpick')}>
                <PickCloset />
            </div>
        </div>
     
    )
}

export default PickTap;