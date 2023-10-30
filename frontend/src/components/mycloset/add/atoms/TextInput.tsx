// TextInput.tsx  < NameInput.tsx, BrandInput.tsx < AddClothForm.tsx
import React, { ChangeEvent } from 'react';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ placeholder, value, onChange }: TextInputProps) => (
  <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
);

export default TextInput;
