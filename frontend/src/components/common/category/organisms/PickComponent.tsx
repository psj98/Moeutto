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
        </div>
      </div>
    </>
  );
};

export default PickComponent;
