import React, { ChangeEvent } from "react";

interface CheckPhotoImgFilePropsType {
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckPhotoImgFile: React.FC<CheckPhotoImgFilePropsType> = ({ handleImageChange }) => {
    return (
        <>
            <input 
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
            />
        </>
    )
}

export default CheckPhotoImgFile;