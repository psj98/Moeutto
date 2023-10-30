import React, { ChangeEvent } from 'react';
import Label from '../atoms/Label';
import TextInput from '../atoms/TextInput';

interface TextInputProps {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NameInput = ({ value, onChange }: TextInputProps) => {
  return (
    <>
      <Label id="clothName" value="옷의 이름" />
      <TextInput placeholder="" value={value} onChange={onChange} />
    </>
  );
};

export default NameInput;
