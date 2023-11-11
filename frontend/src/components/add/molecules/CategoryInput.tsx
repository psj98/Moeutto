import React, { ChangeEvent } from 'react';
import Label from '../atoms/Label';
import CategorySelect from '../atoms/CategorySelect';

interface CategoryProps {
  value?: number | string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryInput = ({ value, onChange }: CategoryProps) => {
  return (
    <>
      <Label id="category" value="카테고리" isEssential={true} />
      <CategorySelect id="category" value={value} onChange={onChange} />
    </>
  );
};

export default CategoryInput;
