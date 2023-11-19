// done
// CategorySelect.tsx < CategoryInput.tsx < AddClothForm.tsx
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { CgSelect } from 'react-icons/cg';
import { Slide } from 'react-awesome-reveal';
import styled from 'styled-components';
import { largeCategory, middleCategory } from '../../common/CategoryType';

interface CategoryProps {
  value?: string; // selected 된 아이템
  id: string; // category 영역이라는 명시용
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // handleClothCategory
  aiLargeCategory: string;
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

  .buttonSection {
    width: 100%;
    display: flex;
    overflow-x: scroll;
  }
  button {
    // 버튼 기본 css
    margin: 12px 6px;
    display: inline-block;
    /* width: 100px; */
    padding: 0 10px;
    height: 36px;
    border: 1px solid black;
    border-radius: 30px;
  }
  button.selected {
    // 클릭되면 검은 버튼 됨
    color: white;
    border: 1px solid black;
    background-color: black;
    box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.2);
  }
`;

const CategorySelect = ({ id, value, onClick, aiLargeCategory }: CategoryProps) => {
  // 카테고리 셀렉트를 위한 중분류 카테고리 array 생성
  const outerArray = middleCategory.filter(item => item.largeCategory.name === '아우터'); // 아우터의 미들 카테고리 array를 생성
  const topArray = middleCategory.filter(item => item.largeCategory.name === '상의');
  const bottomArray = middleCategory.filter(item => item.largeCategory.name === '하의');
  const itemArray = middleCategory.filter(item => item.largeCategory.name === '아이템');

  const [selectedLargeCategory, setSelectedLargeCategory] = useState<string>('0'); // 유저에게 선택된 옷 카테고리
  const [base, setBase] = useState<string>('default');

  const handleLargeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLargeCategory(e.target.value);
    setBase(e.target.value);
  };

  // 유저가 largeCategory를 선택하면 그 밑에 middleCategory가 스르륵 생깁니다
  const returnMiddleSelect = () => {
    switch (selectedLargeCategory) {
      case '002': // 큰 카테고리가 아우터라면
        return outerArray.map(item => (
          <button key={item.id} value={item.id} onClick={onClick} className={item.id === value ? 'selected' : ''}>
            {item.name}
          </button>
        )); // 아우터에 해당하는 중분류 선택지를 줍니다
      case '001': // 큰 카테고리가 상의라면
        return topArray.map(item => (
          <button key={item.id} value={item.id} onClick={onClick} className={item.id === value ? 'selected' : ''}>
            {item.name}
          </button>
        )); // 상의에 해당하는 중분류 선택지를 줍니다
      case '003':
        return bottomArray.map(item => (
          <button key={item.id} value={item.id} onClick={onClick} className={item.id === value ? 'selected' : ''}>
            {item.name}
          </button>
        ));
      case '011':
        return itemArray.map(item => (
          <button key={item.id} value={item.id} onClick={onClick} className={item.id === value ? 'selected' : ''}>
            {item.name}
          </button>
        ));

      default:
        return null;
    }
  };

  useEffect(() => {
    setSelectedLargeCategory(aiLargeCategory);
    setBase(aiLargeCategory);
  }, [aiLargeCategory]);

  useEffect(() => {
    if (value === '') {
      setBase('default');
    } else {
      setBase(value);
    }
  }, [value]);

  return (
    <Select>
      <select id={id} value={base} onChange={handleLargeCategory}>
        <option value="default" disabled hidden>
          카테고리를 선택하세요.
        </option>
        {largeCategory.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {/* <select id="middle" value={value} defaultValue="0" onChange={onChange}> */}
      <div className="buttonSection">
        <Slide delay={1e1} cascade direction="down" damping={0.1} triggerOnce>
          {returnMiddleSelect()}{' '}
        </Slide>
      </div>
      {/* </select> */}
      <CgSelect className="arrow" />
    </Select>
  );
};

export default CategorySelect;
