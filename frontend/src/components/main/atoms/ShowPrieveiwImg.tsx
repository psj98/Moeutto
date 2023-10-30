import React from "react";

interface PrieviewImgPropsType {
    selectedImage: string | null;
}

const ShowPreiveiwImg: React.FC<PrieviewImgPropsType> = ({ selectedImage }) => {
    return (
        <>
           <img src={selectedImage} alt="미리보기 이미지" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </>
    )
}

export default ShowPreiveiwImg;