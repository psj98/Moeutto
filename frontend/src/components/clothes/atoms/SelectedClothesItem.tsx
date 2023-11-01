import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { selectCloset } from "../../../redux/features/closet/selectClosetSlice";


interface ItemPropsType {
    imgUrl: string;
    clothesId: string;
}

const SelectedClothesItem: React.FC<ItemPropsType> = ({ imgUrl, clothesId }) => {
    const dispatch = useDispatch();

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (e) => {
        setIsSelected(!isSelected);
        dispatch(selectCloset(e.target.id));
        console.log(e.target.id);
    };

    return (
        <>
            <img 
                src={imgUrl} 
                id={clothesId}
                alt="옷" 
                className={`w-[13vw] h-[13vw] border border-gray rounded-3xl ${isSelected ? 'bg-gray-300 border-pink-hot' : ''}`}
                onClick={handleClick}
            />
        </>
    );
}

export default SelectedClothesItem;
