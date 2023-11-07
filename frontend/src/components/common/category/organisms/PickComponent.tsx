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
    <div className='ms-2'>
      <TopComponent
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
        handleSubmit={handleSubmit}
      />
    </div>
      <div className="flex flex-wrap items-center justify-start gap-3.5 mt-4 ms-2">
        {clothesData && clothesData.length > 0 ? (
          clothesData.map((item, index) => (
            <SelectedClothesItem imgUrl={item.imageUrl} clothesId={item.id.toString()} key={index} />
          ))
        ) : (
          <div>아무것도 없어요</div>
        )}
      </div>
    </>
  );
};

export default PickComponent;
