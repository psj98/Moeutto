import React, { SetStateAction, useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import Label from '../atoms/Label';
import CheckInput from '../atoms/CheckInput';

interface Option {
  name: string;
  value: string;
}

interface SeasonInputProps {
  value: string;
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
const SeasonInput = ({ value, onChange }: SeasonInputProps) => {
  const [spring, setSpring] = useState<string>('0');
  const [summer, setSummer] = useState<string>('0');
  const [fall, setFall] = useState<string>('0');
  const [winter, setWinter] = useState<string>('0');

  // 이하 1010을 하기 위한 계산입니다
  const seasonArray: string[] = [spring, summer, fall, winter]; // 상태(0,1)들을 array로 모읍니다
  const seasonValue = seasonArray.join(''); // 계절값들을 string으로 변환하고

  useEffect(() => {
    onChange(seasonValue); // 폼의 계절 상태를 업데이터합니다.
  }, [spring, summer, fall, winter]);

  useEffect(() => {
    // 사용자가 이미지를 재제출했을때 초기화해주기 위해 추가하였다
    if (value === '0000') {
      setSpring('0');
      setSummer('0');
      setFall('0');
      setWinter('0');
    }
  }, [value]);

  return (
    <>
      {/* <Fade delay={0} cascade direction="down" damping={0.1} triggerOnce> */}
      <Label id="season" value="옷의 계절" isEssential={true} />
      <div className="flex flex-wrap">
        <Fade delay={1e1} cascade direction="down" damping={0.1} triggerOnce>
          <CheckInput
            type="checkbox"
            option={optionList[0]}
            value="season"
            checked={spring === '1'} // 사용자가 이미지를 재제출했을때 초기화해주기 위해 추가하였다
            onChange={event => setSpring(event.target.checked ? '1' : '0')}></CheckInput>
          <CheckInput
            type="checkbox"
            option={optionList[1]}
            value="season"
            checked={summer === '1'}
            onChange={event => setSummer(event.target.checked ? '1' : '0')}></CheckInput>
          <CheckInput
            type="checkbox"
            option={optionList[2]}
            value="season"
            checked={fall === '1'}
            onChange={event => setFall(event.target.checked ? '1' : '0')}></CheckInput>
          <CheckInput
            type="checkbox"
            option={optionList[3]}
            value="season"
            checked={winter === '1'}
            onChange={event => setWinter(event.target.checked ? '1' : '0')}></CheckInput>
        </Fade>
      </div>
      {/* </Fade> */}
    </>
  );
};

export default SeasonInput;
