import React, { ChangeEvent } from "react";
import CameraSettingForm from "../molecules/CameraSettingForm";

interface PhotoCheckModalPropsType {
    selectedImage: string | null;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubmitState: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoCheckModal: React.FC<PhotoCheckModalPropsType> = ({ selectedImage, handleImageChange, setSubmitState }) => {
    return (
        <>
            <CameraSettingForm 
                selectedImage={selectedImage} 
                handleImageChange={handleImageChange} 
                setSubmitState={setSubmitState}
            />
        </>
    )
}

export default PhotoCheckModal;