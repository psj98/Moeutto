import React, { Dispatch } from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  gap: 34px;
  font-size: 20px;
  margin-top: 7px;
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

interface MiddleCategoryTopProps {
  categories: string[]; // ['반팔', '긴팔', '민소매']
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
}

const MiddleCategory: React.FC<MiddleCategoryTopProps> = ({ categories, selectedOption, setSelectedOption }) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setSelectedOption(e.target.id)
  };

  return (
    <RadioWrapper>
      {categories.map((category, index) => (
        <div key={index}>
          <HiddenRadioInput
            type="radio"
            id={category.toLowerCase()}
            name="category"
            checked={selectedOption === category.toLowerCase()} // Checking based on the selected category
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

export default MiddleCategory;
