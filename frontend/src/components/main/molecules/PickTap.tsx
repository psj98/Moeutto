import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PickCamera from "../atoms/PickCamera";
import PickCloset from "../atoms/PickCloset";
// import CheckPhotoImgFile from "../atoms/CheckPhotoImgFile";

interface PickTapPropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PickTap: React.FC<PickTapPropsType> = ({ handleImageChange }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex">
                <div className="bg-gray-button">
                    <PickCamera handleImageChange={handleImageChange} />
                    {/* <CheckPhotoImgFile handleImageChange={handleImageChange} /> */}
                </div>
                <div className="bg-gray-button" onClick={() => navigate('/pickpick')}>
                    <PickCloset />
                </div>
            </div>
        </>
    )
}

export default PickTap;