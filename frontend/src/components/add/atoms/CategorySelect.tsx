// CategorySelect.tsx < CategoryInput.tsx < AddClothForm.tsx
import React, { ChangeEvent } from 'react';
import { BiSolidDownArrowCircle } from 'react-icons/bi';
import styled from 'styled-components';

interface CategoryProps {
  value?: number | string; // selected 된 아이템 식별 위해 필요함
  id: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = styled.div`
  position: relative;
  select {
    -o-appearance: none; // 기본 화살표 없애기위해 디폴트 스타일 제거
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    background-color: transparent; // 아이콘 클릭시에도 select가 클릭되도록 하기 위해 도입
    cursor: pointer;
    z-index: 10; // select가 아이콘 위로 올라온다
  }
  select::-ms-expand {
    /* for IE 11 */
    display: none;
  }

  .arrow {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 30px;
    z-index: 1; // select 밑으로 아이콘이 들어간다
  }
`;

const CategorySelect = ({ id, value, onChange }: CategoryProps) => {
  return (
    <Select>
      <select id={id} value={value} defaultValue="0" onChange={onChange}>
        <option value="0" disabled hidden>
          기본값입니다.
        </option>
        <optgroup label="상의">
          <option value="1">반팔</option>
          <option value="2">긴팔</option>
          <option value="3">민소매</option>
        </optgroup>
        <optgroup label="하의">
          <option className="option" value="4">
            반바지
          </option>
          <option value="5">긴바지</option>
          <option value="6">짧은치마</option>
          <option value="7">긴치마</option>
        </optgroup>
        <optgroup label="아이템">
          <option value="4">반바지</option>
          <option value="5">긴바지</option>
          <option value="6">짧은치마</option>
          <option value="7">긴치마</option>
        </optgroup>
      </select>
      <BiSolidDownArrowCircle className="arrow" />
    </Select>
  );
};

export default CategorySelect;
