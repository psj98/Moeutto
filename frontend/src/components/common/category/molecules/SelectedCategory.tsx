import React, { Dispatch } from 'react';

import MainCategory from '../atoms/MainCategory';
import MiddleCategory from '../atoms/MiddleCategoryTop';
import SortedCategory from '../atoms/SortedCategory';

interface PropsType {
  selectedOptionMain: string;
  setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
  selectedOptionMiddle: string;
  setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
  selectedOptionSort: string;
  setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
}

const SelectedCategory: React.FC<PropsType> = ({
  selectedOptionMain,
  setSelectedOptionMain,
  selectedOptionMiddle,
  setSelectedOptionMiddle,
  selectedOptionSort,
  setSelectedOptionSort,
}) => {
  return (
    <>
      <MainCategory selectedOption={selectedOptionMain} setSelectedOption={setSelectedOptionMain} />
      {selectedOptionMain === '전체' && null}
      {selectedOptionMain === '상의' && (
        <MiddleCategory
          categories={['반팔', '맨투맨', '후드']}
          selectedOption={selectedOptionMiddle}
          setSelectedOption={setSelectedOptionMiddle}
        />
      )}
      {selectedOptionMain === '하의' && (
        <MiddleCategory
          categories={['청바지', '반바지', '카고팬츠']}
          selectedOption={selectedOptionMiddle}
          setSelectedOption={setSelectedOptionMiddle}
        />
      )}
      {selectedOptionMain === '아우터' && (
        <MiddleCategory
          categories={['패딩', '자켓', '코트']}
          selectedOption={selectedOptionMiddle}
          setSelectedOption={setSelectedOptionMiddle}
        />
      )}
      {selectedOptionMain === '아이템' && (
        <MiddleCategory
          categories={['귀마개', '장갑', '목도리']}
          selectedOption={selectedOptionMiddle}
          setSelectedOption={setSelectedOptionMiddle}
        />
      )}
      <SortedCategory selectedOption={selectedOptionSort} setSelectedOption={setSelectedOptionSort} />
    </>
  );
};

export default SelectedCategory;
