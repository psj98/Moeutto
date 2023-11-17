import React, { Dispatch } from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  gap: 40px;
  font-size: 16px;
  margin-top: 58px;
  padding: 10px;
  border-radius: 8px;
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

const BoldLabel = styled.label<{ selected: boolean }>`
    text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
    text-decoration-color: pink;
    text-decoration-thickness: 3px;
    text-underline-position : under;
    `;

interface PropsType {
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
}

const MainCategory: React.FC<PropsType> = ({ selectedOption, setSelectedOption }) => {
  const categories = ['전체', '상의', '하의', '아우터', '아이템'];

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

export default MainCategory;
