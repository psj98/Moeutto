import React, { MouseEvent } from 'react';
import Label from '../atoms/Label';
import CategorySelect from '../atoms/CategorySelect';

interface CategoryProps {
  value?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  aiLargeCategory: string;
}

const CategoryInput = ({ value, onClick, aiLargeCategory }: CategoryProps) => {
  return (
    <>
      <Label id="category" value="카테고리" isEssential={true} />
      <CategorySelect id="category" value={value} onClick={onClick} aiLargeCategory={aiLargeCategory} />
    </>
  );
};

export default CategoryInput;
