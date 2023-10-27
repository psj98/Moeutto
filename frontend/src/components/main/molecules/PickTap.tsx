import React from "react";
import { useNavigate } from "react-router-dom";
import PickCloset from "../atoms/PickCloset";


const PickTap = () => {
    const navigate = useNavigate();

    return (
        <div className="flex mt-3 h-[28vh]">
            <div className="bg-gray-button w-1/2 rounded-2xl shadow-md flex justify-center items-center min-w-[300px]" onClick={() => navigate('/pickpick')}>
                <PickCloset />
            </div>
        </div>
     
    )
}

export default PickTap;