import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Color } from '../../common/ColorPalette';

interface ColorInputProps {
  option: Color;
  type: string;
  value: string; // 이 값은 <input type="radio" value="계절" 의 value이다. 라디오나 체크박스의 범위를 체크하기위해 필수적이므로 잊지말자
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Check = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 10px;

  input[type='radio'] {
    display: none;
  }

  label {
    display: inline-block;
    width: 44px;
    height: 44px;
    // padding: 2px;
    border: 1px solid black;
    border-radius: 50%;
  }

  input[type='radio']:checked + label {
    border: 5px solid black;
    background-color: black;
    box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ColorRadioInput = ({ option, type, value, onChange }: ColorInputProps) => {
  return (
    <Check>
      <input type={type} id={option.name} name={value} value={value} onChange={onChange} />
      <label style={{ background: option.background }} htmlFor={option.name}></label>
      <div>{option.kr}</div>
    </Check>
  );
};

export default ColorRadioInput;
