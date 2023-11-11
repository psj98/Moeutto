import React, { SetStateAction, useState, useEffect } from 'react';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface SeasonInputProps {
  onChange: (value: SetStateAction<string>) => void;
}

const optionList: Option[] = [
  {
    name: '봄',
    value: 'Spring',
  },
  {
    name: '여름',
    value: 'Summer',
  },
  {
    name: '가을',
    value: 'Fall',
  },
  {
    name: '겨울',
    value: 'Winter',
  },
];

// 계절을 봄여름가을겨울을 0000 네자리 숫자로 보내야함.
// 예를 를어 봄, 가을 옷이면 1010 데이터를 넘겨야한다.
const SeasonInput = ({ onChange }: SeasonInputProps) => {
  const [spring, setSpring] = useState<string>('0');
  const [summer, setSummer] = useState<string>('0');
  const [fall, setFall] = useState<string>('0');
  const [winter, setWinter] = useState<string>('0');

  useEffect(() => {
    const seasonArray: string[] = [spring, summer, fall, winter];
    const seasonValue = seasonArray.join(''); // 계절값들을 string으로 변환하고

    onChange(seasonValue); // 폼의 계절 상태를 업데이터합니다.
  }, [spring, summer, fall, winter]);

  return (
    <>
      <Label id="season" value="옷의 계절" isEssential={true} />
      <div className="flex flex-wrap">
        <CheckInput
          type="checkbox"
          option={optionList[0]}
          value="season"
          onChange={event => setSpring(event.target.checked ? '1' : '0')}></CheckInput>
        <CheckInput
          type="checkbox"
          option={optionList[1]}
          value="season"
          onChange={event => setSummer(event.target.checked ? '1' : '0')}></CheckInput>
        <CheckInput
          type="checkbox"
          option={optionList[2]}
          value="season"
          onChange={event => setFall(event.target.checked ? '1' : '0')}></CheckInput>
        <CheckInput
          type="checkbox"
          option={optionList[3]}
          value="season"
          onChange={event => setWinter(event.target.checked ? '1' : '0')}></CheckInput>
      </div>
    </>
  );
};

export default SeasonInput;
