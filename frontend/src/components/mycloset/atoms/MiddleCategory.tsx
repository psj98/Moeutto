import React from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
  margin-top: 7px;
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

const BoldLabel = styled.label<{ selected: boolean }>`
  cursor: pointer;
  font-size: 12px;
  background-color: ${({ selected }) => (selected ? 'rgba(163, 163, 163, 0.4)' : '')};
  color: ${({ selected }) => (selected ? 'white' : '')};
  &:hover {
    background-color: rgba(163, 163, 163, 0.4);
    color: white;
  }
`;

interface MiddleCategoryTopProps {
  categories: string[];
  selectedOptionMiddle: string;
  setSelectedOptionMiddle: React.Dispatch<React.SetStateAction<string | null>>
}


const MiddleCategory: React.FC<MiddleCategoryTopProps> = ({ 
    categories, 
    selectedOptionMiddle, 
    setSelectedOptionMiddle 
}: MiddleCategoryTopProps) => {


  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    console.log('지금 내가 선택한 카테고리', e.target.id)
    setSelectedOptionMiddle(e.target.id)
  };

  return (
    <div>
        <RadioWrapper>
        {categories?.map((category, index) => (
            <div key={index}>
            <HiddenRadioInput
                type="radio"
                id={category.toLowerCase()}
                name="category"
                checked={selectedOptionMiddle === category.toLowerCase()}
                onChange={handleOptionChange}
            />
            <BoldLabel 
                htmlFor={category.toLowerCase()} 
                selected={selectedOptionMiddle === category.toLowerCase()}
                className='border p-1 px-1 pt-2 rounded-2xl flex items-center justify-center min-w-[55px]'
            >
                {category}
            </BoldLabel>
            </div> 
        ))}
        </RadioWrapper>
    </div>
  );
};

export default MiddleCategory;
