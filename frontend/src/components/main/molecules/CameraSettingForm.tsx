import React, { ChangeEvent } from "react";
import ShowPreiveiwImg from "../atoms/ShowPrieveiwImg";
import CameraRetryBtn from "../atoms/CameraRetryBtn";

interface CameraSettingFormPropsType {
    selectedImage: string | null;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

const CameraSettingForm: React.FC<CameraSettingFormPropsType> = ({ selectedImage, handleImageChange }) => {
    return (
        <>
            <ShowPreiveiwImg selectedImage={selectedImage} />
            <CameraRetryBtn handleImageChange={handleImageChange} />
        </>
    )
}

export default CameraSettingForm;