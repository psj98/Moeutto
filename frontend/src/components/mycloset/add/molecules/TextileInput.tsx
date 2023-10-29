import React, { SetStateAction, useState, useEffect } from 'react';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface TextileInputProps {
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

const TextilInput = ({ onChange }: TextileInputProps) => {
  const [textile, setTextile] = useState<string | null>('');

  useEffect(() => {
    onChange(textile);
  }, [textile]);

  return (
    <>
      <Label id="textile" value="옷의 소재" />
      <div className="flex flex-wrap">
        {optionList.map((option, index) => {
          return (
            <CheckInput
              key={index}
              type="radio"
              option={option}
              value="두께"
              onChange={event => setTextile(event.target.checked ? option.value : null)}
            />
          );
        })}
      </div>
    </>
  );
};

export default TextilInput;
