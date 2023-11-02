import React, { ChangeEvent } from 'react';
import Label from '../atoms/Label';
import NumberInput from '../atoms/NumberInput';

interface AddClothFormProps {
  value?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PriceInput = ({ value, onChange }: AddClothFormProps) => (
  <>
    <Label id="clothPrice" value="옷의 가격" />
    <NumberInput placeholder="" value={value} onChange={onChange} />
  </>
);

export default PriceInput;
