// Checkbox.tsx < SeasonInput.tsx < AddClothForm.tsx
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Option {
  name: string;
  value: string;
}

interface CheckInputProps {
  option: Option;
  type: string;
  value: string; // 이 값은 <input type="radio" value="계절" 의 value이다. 라디오나 체크박스의 범위를 체크하기위해 필수적이므로 잊지말자
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Check = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 3px;

  input[type='checkbox'],
  input[type='radio'] {
    display: none;
  }

  label {
    display: inline-block;
    /* width: 60px; */
    min-width: 60px;
    padding: 2px 10px;
    /* height: 30px; */
    text-align: center;
    border: 1px solid black;
    border-radius: 30px;
    margin-right: 10px;
  }
  input[type='checkbox']:checked + label,
  input[type='radio']:checked + label {
    background-color: black;
    color: white;
    box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);
  }
`;

const CheckInput = ({ option, type, value, onChange }: CheckInputProps) => {
  return (
    <Check>
      <span>
        <input type={type} id={option.name} name={value} value={option.value} onChange={onChange} />
        <label htmlFor={option.name}>{option.name}</label>
      </span>
    </Check>
  );
};

export default CheckInput;
