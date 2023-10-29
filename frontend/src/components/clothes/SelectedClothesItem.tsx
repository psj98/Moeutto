import React, { useState } from "react";

interface ItemPropsType {
    imgUrl: string;
    clothesId: string;
}

const SelectedClothesItem: React.FC<ItemPropsType> = ({ imgUrl, clothesId }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e) => {
        setIsSelected(!isSelected);
        console.log(e.target.id);
    };

    return (
        <>
            <img 
                src={imgUrl} 
                id={clothesId}
                alt="옷" 
                className={`w-[13vw] border border-gray rounded-3xl ${isSelected ? 'bg-gray-300' : ''}`}
                onClick={handleClick}
            />
        </>
    );
}

export default SelectedClothesItem;
