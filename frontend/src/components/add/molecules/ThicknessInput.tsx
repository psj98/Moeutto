import React, { SetStateAction, useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface ThicknessInputProps {
  value: number | null;
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

const ThicknessInput = ({ value, onChange }: ThicknessInputProps) => {
  const [thickness, setThickness] = useState<number | null>();

  useEffect(() => {
    onChange(thickness);
  }, [thickness]);

  useEffect(() => {
    // 이미지 재제출 시 초기화위해 추가한 코드
    if (value === null) {
      setThickness(null);
    }
  }, [value]);

  return (
    <>
      <Label id="thickness" value="옷의 두께" isEssential={true} />
      <div className="flex flex-wrap">
        <Fade delay={1e1} cascade direction="down" damping={0.1} triggerOnce>
          {optionList.map((option, index) => (
            <CheckInput
              key={index}
              type="radio"
              option={option}
              value="thickness"
              checked={thickness === index + 1} // 이미지 재제출 시 초기화위해 추가한 코드
              onChange={event => setThickness(event.target.checked ? index + 1 : null)}
            />
          ))}
        </Fade>
      </div>
    </>
  );
};

export default ThicknessInput;
