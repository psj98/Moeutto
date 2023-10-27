import React, { ChangeEvent, useRef } from "react";

interface CameraRetryBtnPropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

const CameraRetryBtn: React.FC<CameraRetryBtnPropsType> = ({ handleImageChange }) => {
    const fileInputRef = useRef(null);

    const handleCameraIconClick = () => {
        fileInputRef.current.click();
      };

    return (
        <>
            <button onClick={handleCameraIconClick}>다시 찍기</button>
            <input 
                type="file"
                id="fileInput"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
            />
        </>
    )
}

export default CameraRetryBtn;