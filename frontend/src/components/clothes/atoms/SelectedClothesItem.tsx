import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { selectCloset } from '../../../redux/features/closet/selectClosetSlice';
import { selectItem } from '../../../redux/features/closet/postCalendar';

interface ItemPropsType {
  imgUrl: string;
  clothesId: string;
  largeCategoryId: string;
  last: Boolean;
  index: number;
}

const SelectedClothesItem: React.FC<ItemPropsType> = ({ imgUrl, clothesId, largeCategoryId, last, index }) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
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

  let onClickHandler;

  if (pathname === '/calendar/post') {
    onClickHandler = handlePostCalendar;
  } else if (pathname === '/pickpick') {
    onClickHandler = handleClick;
  } else {
    onClickHandler = null;
  }

  // 이미지 로딩 확인용
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // 렌더링 이전에 동작하게 하기
  const renderIngPreload = () => {
    const img = new Image();

    // 이미지가 로드 되면 화면에 띄운다
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = imgUrl;
  };

  useLayoutEffect(() => {
    renderIngPreload();
  }, []);

  return (
    <>
      {imageLoaded ? (
        <img
          src={imgUrl}
          id={clothesId}
          alt={largeCategoryId}
          className={`clothes opacity-100 w-[110px] h-[110px] border border-gray rounded-3xl flex-none p-2 mb-4 ${
            isSelected ? 'bg-gray-300 border-pink-hot border-4' : ''
          }`}
          style={{ objectFit: 'cover', minWidth: '110px', minHeight: '110px', opacity: '1' }}
          // 친구추천 기능 추가하면 아래 코드를 살립니다.
          // onClick={pathname === '/calendar/post' ? handlePostCalendar : handleClick}
          // 친구 옷장이 구경기능만 있을때 코드입니다
          onClick={onClickHandler}
        />
      ) : (
        <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
      )}
      {/* {imageLoaded ? (
        null
      ) : (
        <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
      )} */}
      {last && (
        <>
          {Array.from({ length: index % 3 === 1 ? 1 : 2 }).map((_, i) => (
            <div
              key={`fake-img-${i}`}
              className="fake-img w-[110px] h-[110px] border border-gray rounded-3xl invisible flex-none p-2"
            />
          ))}
        </>
      )}
    </>
  );
};

export default SelectedClothesItem;
