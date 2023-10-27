// Checkbox.tsx < SeasonInput.tsx
import React, { SetStateAction } from 'react';
import styled from 'styled-components';

interface Option {
  name: string;
  value: string;
}

interface CheckInputProps {
  option: Option;
  type: string;
  value: string; // 라디오나 체크박스의 범위를 체크하기위해 필수적임
  onChange: (event: SetStateAction<string>) => void;
}

const Check = styled.div`
  display: flex;
  justify-content: start;

  input[type='checkbox'] {
    display: none;
  }
  label {
    display: inline-block;
    width: 60px;
    padding: 2px;
    /* height: 30px; */
    text-align: center;
    border: 1px solid black;
    border-radius: 30px;
    margin-right: 10px;
  }
  input[type='checkbox']:checked + label {
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
