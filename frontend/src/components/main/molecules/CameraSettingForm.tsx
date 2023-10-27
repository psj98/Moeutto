import React, { ChangeEvent } from "react";
import ShowPreiveiwImg from "../atoms/ShowPrieveiwImg";
import CameraRetryBtn from "../atoms/CameraRetryBtn";
import SubmitBtn from "../atoms/SubmitBtn";

interface CameraSettingFormPropsType {
    selectedImage: string | null;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setSubmitState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CameraSettingForm: React.FC<CameraSettingFormPropsType> = ({ selectedImage, handleImageChange, setSubmitState }) => {
    return (
        <>
            <ShowPreiveiwImg selectedImage={selectedImage} />
            <CameraRetryBtn handleImageChange={handleImageChange} />
            <SubmitBtn setSubmitState={setSubmitState} />
        </>
    )
}

export default CameraSettingForm;