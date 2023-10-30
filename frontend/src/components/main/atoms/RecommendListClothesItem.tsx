import React from "react";
import { useNavigate } from "react-router-dom";

interface RecommendListClothesItemPropsType {
    imgUrl: string;
    clothesId: number;
    number: number;
}

const RecommendListClothesItem: React.FC<RecommendListClothesItemPropsType> = ({ 
    imgUrl,
    clothesId,
 }) => {

    const navigate = useNavigate();
  
    return (
        <img 
            src={`${imgUrl}`} 
            alt="옷 이미지" 
            className="w-1/3 hover:cursor-pointer hover:scale-105" 
            onClick={() => navigate(`/mycloset/detail/${clothesId}`)}
        />
    )
}

export default RecommendListClothesItem;