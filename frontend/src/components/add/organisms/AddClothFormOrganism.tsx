import React, { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
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
import { ClothInfoType } from '../../../pages/AddClothPage';

interface Props {
  setStateValue: Dispatch<SetStateAction<FormData>>;
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  width: 80%;
  max-width: 500px;
  input,
  select {
    min-height: 50px;
    width: 100%;
    border: 1px solid black;
    padding: 0 30px;
    border-radius: 40px;
  }
`;

const AddClothFormOrganism = ({ setStateValue }: Props) => {
  const [clothPic, setClothPic] = useState<File | null>(null);
  const [clothCategory, setClothCategory] = useState<string>(''); // String
  const [clothSeason, setClothSeason] = useState<string>(''); // ex) string: 가을겨울옷이라면 0011
  const [clothThickness, setClothThickness] = useState<number | null>(); // ex) int: 얇음 , 중간 , 두꺼움
  const [clothTextile, setClothTextile] = useState<string | null>(''); // string
  const [clothColor, setClothColor] = useState<string>('');
  const [clothName, setClothName] = useState<string | null>(''); // string
  const [clothPrice, setClothPrice] = useState<number | null>(0); // int : null 허용
  const [clothBrand, setClothBrand] = useState<string>(''); // string

  // 옷 카테고리 입력 받는 함수
  const handleClothCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setClothCategory(e.target.value);
    }
  };

  // 옷 이름 입력 받는 함수
  const handleClothNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothName(e.target.value);
    } else {
      // 입력 값을 지울 때 맨 앞 한글자가 안 없어지는 에러 해결
      setClothName('');
    }
  };

  // 옷 가격 입력 받는 함수
  const handleClothPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothPrice(Number(e.target.value));
    } else {
      setClothPrice(0);
    }
  };

  // 옷 브랜드 입력 받는 함수
  const handleClothBrand = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setClothBrand(e.target.value);
    } else {
      setClothBrand('');
    }
  };

  /* {"middleCategoryId": "001002",
"name": "검은색 코트",
"season": "0011",
"color": "000000",
"thickness": 3,
"price": 250000,
"shop": "무신사",
"textile": "울"}*/

  const handleSubmit = () => {
    const data: ClothInfoType = {
      middleCategoryId: clothCategory,
      name: clothName,
      season: clothSeason,
      color: clothColor,
      thickness: clothThickness,
      price: clothPrice,
      shop: clothBrand,
      textile: clothTextile,
    };
    // FormData 에 넣기
    /* eslint-disable prefer-const */
    let formData: FormData = new FormData();

    // file은 multipart/form-data
    formData.append('file', clothPic as File);

    // const dataString = JSON.stringify(data); // to append to the FormData object are either of type string or Blob.
    // clothesRegistRequestDto는 application/json
    // formData.append('clothesRegistRequestDto', dataString);

    formData.append('clothesRegistRequestDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    /* 위 코드에서 formData에 파일('file')과 JSON 데이터
    ('clothesRegistRequestDto')를 추가했고, FormData는 자동으로 multipart/
    form-data Content-Type을 갖게 됩니다. 따라서 별도의 Content-Type 설정은 
    필요하지 않습니다. */

    setStateValue(formData);
  };

  return (
    <FormContainer>
      <Form>
        <PictureInput setStateValue={setClothPic} />
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

export default AddClothFormOrganism;
