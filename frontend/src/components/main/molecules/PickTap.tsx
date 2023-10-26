import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PickIcon from "../atoms/PickIcon"
import CheckPhotoImgFile from "../atoms/CheckPhotoImgFile";

interface PickTapPropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PickTap: React.FC<PickTapPropsType> = ({ handleImageChange }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex">
                <div className="bg-gray-button">
                    <PickIcon title="camera" content="찍어찍어 당장 너를 찍어" />
                    <CheckPhotoImgFile handleImageChange={handleImageChange} />
                </div>
                <div className="bg-gray-button" onClick={() => navigate('/pickpick')}>
                    <PickIcon title="closet" content="골라골라 옷장에서 골라" />
                </div>
            </div>
        </>
    )
}

export default PickTap;