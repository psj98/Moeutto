import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import CategoryInput from '../molecules/CategoryInput';
import SeasonInput from '../molecules/SeasonInput';
import NameInput from '../molecules/NameInput';
import PriceInput from '../molecules/PriceInput';
import BrandInput from '../molecules/BrandInput';

// interface InputProps {
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
// }

const Form = styled.div`
  width: 80%;
  max-width: 500px;
  background-color: #c43ce6;
  input,
  select {
    min-height: 50px;
    width: 100%;
    border: 1px solid black;
    padding: 0 30px;
    border-radius: 40px;
  }
`;

const AddClothForm = () => {
  const [clothCategory, setClothCategory] = useState<number | string>('');
  const [clothSeason, setClothSeason] = useState<string[]>([]);
  const [clothName, setClothName] = useState<string>('');
  const [clothPrice, setClothPrice] = useState<number | string>('');
  const [clothBrand, setClothBrand] = useState<string>('');
  // 옷 카테고리 입력 받는 함수
  const handleClothCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setClothCategory(e.target.value as any);
    }
  };

  // 옷 계절 입력 받는 함수
  const handleClothSeason = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    if (e.target.value) {
      setClothSeason(e.target.value as any);
    }
  };

  // 옷 이름 입력 받는 함수
  const handleClothNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothName(e.target.value);
    }
  };

  // 옷 가격 입력 받는 함수
  const handleClothPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothPrice(e.target.value);
    }
  };

  // 옷 브랜드 입력 받는 함수
  const handleClothBrand = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothBrand(e.target.value);
    }
  };

  return (
    <Form>
      <CategoryInput onChange={handleClothCategory} />
      카테고리는 {clothCategory}
      <br></br>
      <SeasonInput onChange={handleClothSeason} />
      시즌 {clothSeason}
      <NameInput onChange={handleClothNameChange} value={clothName} />
      cloth name: {clothName}
      <PriceInput onChange={handleClothPriceChange} value={clothPrice} />
      cloth price: {clothPrice}
      <BrandInput onChange={handleClothBrand} value={clothBrand} />
      cloth Brand: {clothBrand}
    </Form>
  );
};

export default AddClothForm;
