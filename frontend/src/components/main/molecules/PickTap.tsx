import React from "react";
import { useNavigate } from "react-router-dom";
import PickCloset from "../atoms/PickCloset";


const PickTap = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex">
                <div className="bg-gray-button" onClick={() => navigate('/pickpick')}>
                    <PickCloset />
                </div>
            </div>
        </>
    )
}

export default PickTap;