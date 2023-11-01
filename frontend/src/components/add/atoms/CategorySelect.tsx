// CategorySelect.tsx < CategoryInput.tsx < AddClothForm.tsx
import React, { ChangeEvent } from 'react';
import { BiSolidDownArrowCircle } from 'react-icons/bi';
import styled from 'styled-components';
import { middleCategory } from '../../common/CategoryType';

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
  // 카테고리 셀렉트를 위한 중분류 카테고리 array 생성
  const outerArray = middleCategory.filter(item => item.largeCategory.name === '아우터');
  const topArray = middleCategory.filter(item => item.largeCategory.name === '상의');
  const bottomArray = middleCategory.filter(item => item.largeCategory.name === '하의');
  const itemArray = middleCategory.filter(item => item.largeCategory.name === '아이템');

  return (
    <Select>
      <select id={id} value={value} defaultValue="0" onChange={onChange}>
        <option value="0" disabled hidden>
          카테고리를 선택하세요.
        </option>
        <optgroup label="아우터">
          {outerArray.map(item => (
            <option value={item.id}>{item.name}</option>
          ))}
        </optgroup>
        <optgroup label="상의">
          {topArray.map(item => (
            <option value={item.id}>{item.name}</option>
          ))}
        </optgroup>
        <optgroup label="하의">
          {bottomArray.map(item => (
            <option value={item.id}>{item.name}</option>
          ))}
        </optgroup>
        <optgroup label="아이템">
          {itemArray.map(item => (
            <option value={item.id}>{item.name}</option>
          ))}
        </optgroup>
      </select>
      <BiSolidDownArrowCircle className="arrow" />
    </Select>
  );
};

export default CategorySelect;
