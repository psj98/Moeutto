import React, { Dispatch } from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  gap: 13px;
  font-size: 16px;
  margin-top: 14px;
  color: black;
  margin-left: 10px;
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

const BoldLabel = styled.label<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'pink' : '#131313')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  &:hover {
    color: pink;
  }
`;

interface SortedCategoryProps {
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
}

const SortedCategory: React.FC<SortedCategoryProps> = ({ selectedOption, setSelectedOption }) => {
  const categories: string[] = ['정렬', '등록', '많이 입은', '적게 입은', '색깔'];

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedOption(e.target.id);
  };

  return (
    <>
    {/* <div className="mb-8 mx-5">
      
        <select
          className=""
          value={selectedOption}
          defaultValue="initial"
          onChange={handleOptionChange}
          >
          <option value="initial">정렬</option>
          <option value="regDate">등록순</option>
          <option value="frequency1">많이 입은 순</option>
          <option value="frequency0">적게 입은 순</option>
          <option value="color">색상 순</option>
        </select>
      </div> */}
        
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
    </>
  );
};

export default SortedCategory;
