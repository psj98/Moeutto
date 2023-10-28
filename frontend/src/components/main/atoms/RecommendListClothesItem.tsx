import React from "react";

interface RecommendListClothesItemPropsType {
    imgUrl: any;
    clothesId: any;
    number: any;
}

const RecommendListClothesItem: React.FC<RecommendListClothesItemPropsType> = ({ 
    imgUrl,
    clothesId,
    number
 }) => {

    
  
    return (
        <img src={`${imgUrl}`} alt="옷 이미지" className="w-1/3 hover:cursor-pointer hover:scale-105" />
    )
}

export default RecommendListClothesItem;