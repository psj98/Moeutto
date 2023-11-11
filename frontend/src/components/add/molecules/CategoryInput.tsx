import React, { MouseEvent } from 'react';
import Label from '../atoms/Label';
import CategorySelect from '../atoms/CategorySelect';

interface CategoryProps {
  value?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CategoryInput = ({ value, onClick }: CategoryProps) => {
  return (
    <>
      <Label id="category" value="카테고리" isEssential={true} />
      <CategorySelect id="category" value={value} onClick={onClick} />
    </>
  );
};

export default CategoryInput;
