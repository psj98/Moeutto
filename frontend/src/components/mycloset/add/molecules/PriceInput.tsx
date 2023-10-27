import React, { ChangeEvent } from 'react';
import Label from '../atoms/Label';
import NumberInput from '../atoms/NumberInput';

interface NumberInputProps {
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PriceInput = ({ value, onChange }: NumberInputProps) => (
  <>
    <Label id="clothPrice" value="옷의 가격" />
    <NumberInput placeholder="" value={value} onChange={onChange} />
  </>
);

export default PriceInput;
