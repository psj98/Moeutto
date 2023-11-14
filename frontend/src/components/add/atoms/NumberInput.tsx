// NumberInput.tsx < PriceInput.tsx < AddClothForm.tsx
import React, { ChangeEvent } from 'react';

interface NumberInputProps {
  placeholder?: string;
  value?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({ placeholder, value, onChange }: NumberInputProps) => {
  return <input type="number" placeholder={placeholder} value={value.toString()} onChange={onChange} min="0" />;
};

export default NumberInput;
