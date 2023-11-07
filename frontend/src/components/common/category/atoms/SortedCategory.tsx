import React, { Dispatch } from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  gap: 13px;
  font-size: 16px;
  margin-top: 14px;
  color: #e2e2e2;
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

const BoldLabel = styled.label<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? '#131313' : '')};
  &:hover {
    color: #131313;
  }
  font-size: 12px;
`;

interface SortedCategoryProps {
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
}

const SortedCategory: React.FC<SortedCategoryProps> = ({ selectedOption, setSelectedOption }) => {
  const categories: string[] = ['정렬', '등록', '많이 입은', '적게 입은', '색깔'];

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.id);
  };

  return (
    <RadioWrapper>
      {categories.map((category, index) => (
        <div key={index}>
          <HiddenRadioInput
            type="radio"
            id={category.toLowerCase()}
            name="category"
            checked={selectedOption === category.toLowerCase()}
            onChange={handleOptionChange}
          />
          <BoldLabel htmlFor={category.toLowerCase()} selected={selectedOption === category.toLowerCase()}>
            {category}
          </BoldLabel>
        </div>
      ))}
    </RadioWrapper>
  );
};

export default SortedCategory;
