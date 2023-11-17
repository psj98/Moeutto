import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ScrollReveal from 'scrollreveal';

import { selectCloset } from '../../../redux/features/closet/selectClosetSlice';
import { selectItem } from '../../../redux/features/closet/postCalendar';

interface ItemPropsType {
  imgUrl: string;
  clothesId: string;
  largeCategoryId: string;
}

const SelectedClothesItem: React.FC<ItemPropsType> = ({ imgUrl, clothesId, largeCategoryId }) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  ScrollReveal().reveal('.clothes');

  const [isSelected, setIsSelected] = useState(false);
  // pickpick 페이지에서 사용되는 함수입니다
  const handleClick = e => {
    setIsSelected(!isSelected);
    dispatch(selectCloset({ id: e.target.id, largeCategoryId: e.target.alt }));
  };
  // calendar post 페이지에서 사용되는 함수입니다
  const handlePostCalendar = e => {
    dispatch(selectItem(imgUrl)); // 이미지 url을 redux state array 로 저장합니다
  };

  // 이미지 로딩 확인용
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <img
        src={imgUrl}
        id={clothesId}
        alt={largeCategoryId}
        className={`clothes w-[110px] h-[110px] border border-gray rounded-3xl ${
          isSelected ? 'bg-gray-300 border-pink-hot border-4' : ''
        }`}
        style={{ objectFit: 'cover', minWidth: '110px', minHeight: '110px' }}
        onClick={pathname === '/calendar/post' ? handlePostCalendar : handleClick}
        onLoad={handleImageLoad}
      />
      {imageLoaded ? (
        null
      ) : (
        <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
      )}
    </>
  );
};

export default SelectedClothesItem;
