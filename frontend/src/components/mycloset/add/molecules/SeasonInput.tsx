import React, { ChangeEvent, useState } from 'react';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface SeasonInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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

  return (
    <>
      <Label id="season" value="옷의 계절" />
      {spring},{summer},{fall},{winter}
      <CheckInput type="checkbox" option={optionList[0]} value="season" onChange={setSpring}></CheckInput>
      <CheckInput type="checkbox" option={optionList[1]} value="season" onChange={setSummer}></CheckInput>
      <CheckInput type="checkbox" option={optionList[2]} value="season" onChange={setFall}></CheckInput>
      <CheckInput type="checkbox" option={optionList[3]} value="season" onChange={setWinter}></CheckInput>
      {/* {optionList?.map(option => {
        return (
          <span key={option.name}>
            <CheckInput type="checkbox" option={option} value="season" onChange={set`{option.value}`}></CheckInput>
          </span>
        );
      })} */}
      {/* <CheckInput type="checkbox" optionList={OptionList} value="season" onChange={onChange}></CheckInput> */}
    </>
  );
};

export default SeasonInput;
