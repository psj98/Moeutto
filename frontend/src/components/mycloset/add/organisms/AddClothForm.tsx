import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import PictureInput from '../molecules/PictureInput';
import CategoryInput from '../molecules/CategoryInput';
import SeasonInput from '../molecules/SeasonInput';
import ThicknessInput from '../molecules/ThicknessInput';
import TextilInput from '../molecules/TextileInput';
import ColorInput from '../molecules/ColorInput';
import NameInput from '../molecules/NameInput';
import PriceInput from '../molecules/PriceInput';
import BrandInput from '../molecules/BrandInput';
import SubmitButton from '../molecules/SubmitButton';
// interface InputProps {
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
// }

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  width: 80%;
  max-width: 500px;
  // background-color: #c434;
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
  // const [clothPic, setClothPic] = useState<File | string | null>(null);
  const [clothCategory, setClothCategory] = useState<number | string>(''); // String
  const [clothSeason, setClothSeason] = useState<string>(''); // ex) string: 가을겨울옷이라면 0011
  const [clothThickness, setClothThickness] = useState<number | null>(); // ex) int: 얇음 , 중간 , 두꺼움
  const [clothTextile, setClothTextile] = useState<string | null>(''); // string
  const [clothColor, setClothColor] = useState<string>('');
  const [clothName, setClothName] = useState<string>(''); // string
  const [clothPrice, setClothPrice] = useState<number | string | null>(); // int : null 허용
  const [clothBrand, setClothBrand] = useState<string>(''); // string
  // 옷 카테고리 입력 받는 함수
  const handleClothCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setClothCategory(e.target.value as any);
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

  const handleSubmit = () => {
    console.log('제출');
  };

  return (
    <FormContainer>
      <Form>
        <PictureInput />
        <div className="text-WebBody2 text-center mt-[28px]">옷의 정보</div>
        <CategoryInput onChange={handleClothCategory} />
        카테고리 {clothCategory}
        <SeasonInput onChange={setClothSeason} />
        시즌 {clothSeason}
        <ThicknessInput onChange={setClothThickness} />
        옷의 두께는 {clothThickness}
        <TextilInput onChange={setClothTextile} />
        옷의 소재는 {clothTextile}
        <ColorInput onChange={setClothColor} />
        옷의 컬러는 {clothColor}
        <NameInput onChange={handleClothNameChange} value={clothName} />
        cloth name: {clothName}
        <PriceInput onChange={handleClothPriceChange} value={clothPrice} />
        cloth price: {clothPrice}
        <BrandInput onChange={handleClothBrand} value={clothBrand} />
        cloth Brand: {clothBrand}
        <SubmitButton onChange={handleSubmit} />
      </Form>
    </FormContainer>
  );
};

export default AddClothForm;
