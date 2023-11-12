import React, { SetStateAction, useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface TextileInputProps {
  value: string | null;
  onChange: (value: SetStateAction<string | null>) => void;
}

const optionList: Option[] = [
  {
    name: '코튼',
    value: 'cotton',
  },
  {
    name: '데님',
    value: 'denim',
  },
  {
    name: '울',
    value: 'wool',
  },
  {
    name: '가죽',
    value: 'leather',
  },
  {
    name: '실크',
    value: 'silk',
  },
  {
    name: '기타',
    value: 'etc',
  },
];

const TextilInput = ({ value, onChange }: TextileInputProps) => {
  const [textile, setTextile] = useState<string | null>('');

  useEffect(() => {
    onChange(textile);
  }, [textile]);

  useEffect(() => {
    // 사진 재체출시 초기화
    if (value === null) {
      setTextile(null);
    }
  }, [value]);

  return (
    <>
      <Label id="textile" value="옷의 소재" isEssential={true} />
      <div className="flex flex-wrap">
        <Fade delay={0.5} cascade direction="down" damping={0.1}>
          {optionList.map((option, index) => {
            return (
              <CheckInput
                key={index}
                type="radio"
                option={option}
                value="textile"
                checked={textile === option.value}
                onChange={event => setTextile(event.target.checked ? option.value : null)}
              />
            );
          })}
        </Fade>
      </div>
    </>
  );
};

export default TextilInput;
