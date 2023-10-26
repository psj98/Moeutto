import React from "react";

interface RecommendListClothesItemPropsType {
    number: number;
}

const RecommendListClothesItem: React.FC<RecommendListClothesItemPropsType> = ({ number }) => {
    return (
        <img src={`/images/clothes${number}.png`} alt="" className="w-16 h-16" />
    )
}

export default RecommendListClothesItem;