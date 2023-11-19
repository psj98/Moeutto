import React from "react";
import { useNavigate } from "react-router-dom";


interface ItemPropsType {
    imgUrl: string;
    clothesId: string;
}

const ClothesItemComponent: React.FC<ItemPropsType> = ({ imgUrl, clothesId }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/mycloset/detail/${clothesId}`);
    };

    return (
        <>
            <img 
                src={imgUrl} 
                id={clothesId}
                alt="옷" 
                className={`w-[110px] h-[110px] border border-gray rounded-3xl`}
                style={{ objectFit: 'cover', minWidth: '110px', minHeight: '110px' }}
                onClick={handleClick}
            />
        </>
    );
}

export default ClothesItemComponent;
