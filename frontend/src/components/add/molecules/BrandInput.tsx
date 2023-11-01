import React, { ChangeEvent } from 'react';
import Label from '../atoms/Label';
import TextInput from '../atoms/TextInput';

interface BrandInputProps {
  placeholder?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const BrandInput = ({ placeholder, value, onChange }: BrandInputProps) => {
  return (
    <>
      <Label id="clothBrand" value="옷의 브랜드" />
      <TextInput placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
};

export default BrandInput;
