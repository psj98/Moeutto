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
import { ClothInfoType  } from '../../../pages/AddClothPage';

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

    // formData를 생성하여 API를 호출하는 PAGE.TSX로 보낼 것이다.
    /* eslint-disable prefer-const */
    let formData: FormData = new FormData();

    if (clothPic && clothCategory && clothSeason && clothColor && clothThickness) {
      // file은 컨텐츠 타입은 multipart/form-data
      formData.append('file', clothPic as File);
      // clothesRegistRequestDto는 컨텐츠 타입은 application/json
      formData.append('clothesRegistRequestDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      /* 위 코드에서 formData에 파일('file')과 JSON 데이터
    ('clothesRegistRequestDto')를 추가했고, FormData는 자동으로 multipart/
    form-data Content-Type을 갖게 됩니다. 따라서 별도의 Content-Type 설정은 
    필요하지 않습니다. */

      setStateValue(formData);
    } else {
      // 필수 인풋 값이 하나라도 비어있다면

      // eslint-disable-next-line no-alert
      alert('사진, 카테고리, 색상, 계절, 두께 모두 입력해주세요.');
    }
  };

  return (
    <FormContainer>
      <Form>
        <PictureInput setStateValue={setClothPic} />
        <div className="text-WebBody2 text-center mt-[28px]">옷의 정보</div>
        <CategoryInput onChange={handleClothCategory} />
        <SeasonInput onChange={setClothSeason} />
        <ThicknessInput onChange={setClothThickness} />
        <TextilInput onChange={setClothTextile} />
        <ColorInput onChange={setClothColor} />
        <NameInput onChange={handleClothNameChange} value={clothName} />
        <PriceInput onChange={handleClothPriceChange} value={clothPrice} />
        <BrandInput onChange={handleClothBrand} value={clothBrand} />
        <SubmitButton onChange={handleSubmit} />
      </Form>
    </FormContainer>
  );
};

export default AddClothFormOrganism;
