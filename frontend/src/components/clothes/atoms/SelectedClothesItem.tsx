import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';

import { selectCloset } from '../../../redux/features/closet/selectClosetSlice';
import { selectItem } from '../../../redux/features/closet/postCalendar';

interface ItemPropsType {
  imgUrl: string;
  clothesId: string;
}

const SelectedClothesItem: React.FC<ItemPropsType> = ({ imgUrl, clothesId }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  ScrollReveal().reveal('.clothes');

  const [isSelected, setIsSelected] = useState(false);
  // pickpick 페이지에서 사용되는 함수입니다
  const handleClick = e => {
    setIsSelected(!isSelected);
    dispatch(selectCloset(e.target.id));
    console.log(e.target.id);
  };
  // calendar post 페이지에서 사용되는 함수입니다
  const handlePostCalendar = e => {
    dispatch(selectItem(imgUrl)); // 이미지 url을 redux state array 로 저장합니다
  };

  return (
    <>
      <img
        src={imgUrl}
        id={clothesId}
        alt="옷"
        className={`clothes w-[13vw] h-[13vw] border border-gray rounded-3xl ${
          isSelected ? 'bg-gray-300 border-pink-hot' : ''
        }`}
        onClick={pathname === '/pickpick' ? handleClick : handlePostCalendar}
      />
    </>
  );
};

export default SelectedClothesItem;
