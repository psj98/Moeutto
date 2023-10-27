import React, { ChangeEvent } from "react";
import CameraSettingForm from "../molecules/CameraSettingForm";

interface PhotoCheckModalPropsType {
    selectedImage: string | null;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PhotoCheckModal: React.FC<PhotoCheckModalPropsType> = ({ selectedImage, handleImageChange }) => {
    return (
        <>
            <CameraSettingForm selectedImage={selectedImage} handleImageChange={handleImageChange} />
        </>
    )
}

export default PhotoCheckModal;