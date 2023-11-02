import React, { SetStateAction, useState, useEffect } from 'react';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface ThicknessInputProps {
  onChange: (value: SetStateAction<number>) => void;
}

const optionList: Option[] = [
  {
    name: '얇음',
    value: 'thin',
  },
  {
    name: '중간',
    value: 'medium',
  },
  {
    name: '두꺼움',
    value: 'thick',
  },
];

const ThicknessInput = ({ onChange }: ThicknessInputProps) => {
  const [thickness, setThickness] = useState<number | null>();

  useEffect(() => {
    onChange(thickness);
  }, [thickness]);

  return (
    <>
      <Label id="thickness" value="옷의 두께" />
      <div className="flex flex-wrap">
        {optionList.map((option, index) => (
          <CheckInput
            key={index}
            type="radio"
            option={option}
            value="thickness"
            onChange={event => setThickness(event.target.checked ? index + 1 : null)}
          />
        ))}
      </div>
    </>
  );
};

export default ThicknessInput;
