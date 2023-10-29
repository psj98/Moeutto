import React, { useState } from 'react';
import styled from 'styled-components';

// 반응형으로 바꿔야됨
const RadioWrapper = styled.div`
  display: flex;
  gap: 40px;
  font-size: 24px;
  margin-top: 58px;
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

const BoldLabel = styled.label<{ selected: boolean }>`
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
  }
`;

const MainCategory = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  // selectedOption 선택된 것 request 담아 전달하기

  return (
    <RadioWrapper>
      <div>
        <HiddenRadioInput
          type="radio"
          id="all"
          name="category"
          checked={selectedOption === 'all'}
          onChange={handleOptionChange}
        />
        <BoldLabel htmlFor="all" selected={selectedOption === 'all'}>
          전체
        </BoldLabel>
      </div>
      <div>
        <HiddenRadioInput
          type="radio"
          id="top"
          name="category"
          checked={selectedOption === 'top'}
          onChange={handleOptionChange}
        />
        <BoldLabel htmlFor="top" selected={selectedOption === 'top'}>
          상의
        </BoldLabel>
      </div>
      <div>
        <HiddenRadioInput
          type="radio"
          id="bottom"
          name="category"
          checked={selectedOption === 'bottom'}
          onChange={handleOptionChange}
        />
        <BoldLabel htmlFor="bottom" selected={selectedOption === 'bottom'}>
          하의
        </BoldLabel>
      </div>
      <div>
        <HiddenRadioInput
          type="radio"
          id="outer"
          name="category"
          checked={selectedOption === 'outer'}
          onChange={handleOptionChange}
        />
        <BoldLabel htmlFor="outer" selected={selectedOption === 'outer'}>
          아우터
        </BoldLabel>
      </div>
    </RadioWrapper>
  );
};

export default MainCategory;
