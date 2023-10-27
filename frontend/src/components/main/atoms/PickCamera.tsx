import React, { ChangeEvent, useRef } from "react";

interface PickCameraPropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PickCamera: React.FC<PickCameraPropsType> = ({ handleImageChange }) => {
    const fileInputRef = useRef(null);

    const handleCameraIconClick = () => {
        fileInputRef.current.click();
      };

    return (
        <div>
            <img src={`/images/camera3d.png`} alt="icon" className="w-32 h-32 hover:scale-105" onClick={handleCameraIconClick} />
            <div>찍어찍어 당장 너를 찍어</div>
            <input 
                type="file"
                id="fileInput"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
            />
        </div>
    )
}

export default PickCamera;