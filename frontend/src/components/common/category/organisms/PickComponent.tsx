import React, { Dispatch } from 'react';

import TopComponent from '../../../clothes/molecules/TopComponent';
import SelectedClothesItem from '../../../clothes/atoms/SelectedClothesItem';
import { ClothesItem } from '../../../../pages/PickPickPage';

interface PropsType {
  selectedOptionMain: string;
  setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
  selectedOptionMiddle: string;
  setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
  selectedOptionSort: string;
  setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  clothesData: ClothesItem[];
  nickname?: string;
  // 이건 모두 있어야 할 값 같은데 리팩토링 필요
  isImgLoading?: boolean;
}

const PickComponent: React.FC<PropsType> = ({
  selectedOptionMain,
  setSelectedOptionMain,
  selectedOptionMiddle,
  setSelectedOptionMiddle,
  selectedOptionSort,
  setSelectedOptionSort,
  handleSubmit,
  clothesData,
  isImgLoading
}) => {
  return (
    <>
      <TopComponent
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
        handleSubmit={handleSubmit}
      />
      <div className="flex justify-center m-auto">
        <div className="w-[95%] flex flex-wrap gap-3.5 mt-4 justify-start mb-[200px]">
        {!isImgLoading ? (
          <>
            {clothesData && clothesData.length > 0 ? (
              clothesData.map((item, index) => (
                <SelectedClothesItem
                  imgUrl={item.imageUrl}
                  clothesId={item.id.toString()}
                  key={index}
                  largeCategoryId={item.largeCategoryId}
                />
              ))
            ) : (
              <div>아무것도 없어요</div>
            )}
          </>
        ) : (
          <div className='flex gap-4 justify-center'>
            <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
            <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
            <div className="animate-pulse w-[110px] h-[110px] bg-gray-button rounded-3xl"></div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default PickComponent;
