import React, { useState, useEffect, MouseEvent, ChangeEvent, SetStateAction, Dispatch } from 'react';
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
  handleRemoveBG: (imgWithBG: File) => Promise<any>;
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
    transition: transform 3s;
  }

  button {
    transition: transform 2s;
    cursor: pointer;
  }
`;

const AddClothFormOrganism = ({ setStateValue, handleRemoveBG }: Props) => {
  const [clothPic, setClothPic] = useState<File | null>(null);
  const [clothBase64WithoutBG, setClothBase64WithoutBG] = useState<string>(''); // ai로 배경지운 이미지
  const [clothCategory, setClothCategory] = useState<string>(''); // String
  const [clothSeason, setClothSeason] = useState<string>('0000'); // ex) string: 가을겨울옷이라면 0011
  const [clothThickness, setClothThickness] = useState<number | null>(); // ex) int: 얇음 , 중간 , 두꺼움
  const [clothTextile, setClothTextile] = useState<string | null>(''); // string
  const [clothColor, setClothColor] = useState<string>('');
  const [clothName, setClothName] = useState<string | null>(''); // string
  const [clothPrice, setClothPrice] = useState<number>(0); // int : null 허용
  const [clothBrand, setClothBrand] = useState<string>(''); // string

  // 옷 카테고리 입력 받는 함수
  const handleClothCategory = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.target as HTMLButtonElement) {
      setClothCategory((e.target as HTMLButtonElement).value);
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

  // 배경지우는 함수
  const RemoveBGIconClick = async () => {
    console.log(typeof clothPic, '파일인가요? 모드리치님 ㅜ');
    if (clothPic !== null) {
      handleRemoveBG(clothPic as File).then(res => {
        console.log(res);
        setClothBase64WithoutBG(res.file);
        setClothColor(res.color);
        setClothCategory(res.category);
      });
    }
    return true;
  };

  useEffect(() => {
    // 사용자가 다시찍기를 할 수 있기 때문에 필요한 과정입니다.
    if (clothPic === null) {
      // 사용자가 입력했던 인풋값을 다 초기화합니다
      setClothCategory('');
      setClothSeason('0000');
      setClothThickness(null);
      setClothTextile(null);
      setClothColor('');
      setClothName('');
      setClothPrice(0);
      setClothBrand('');
    }
  }, [clothPic]);

  return (
    <FormContainer>
      <Form>
        <PictureInput
          setStateValue={setClothPic}
          handleIconClick={RemoveBGIconClick}
          clothBase64WithoutBG={clothBase64WithoutBG}
        />
        <div
          style={{
            // 이 스타일들은 차곡차곡 생기는 form 애니메이션을 위해 작성되었습니다. 참고는 카카오페이입니다
            transform: clothPic ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothPic ? 'visible' : 'hidden', // clothPic이 존재하면 이 필드가 활성화됩니다.
            transition: 'transform 0.5s, visibility 0.5s', //  즉 위에서 아래로 내려오는 애니메이션 효과가 생깁니다
          }}>
          <div className="text-WebBody2 text-center mt-[28px]">옷의 정보</div>
          <CategoryInput onClick={handleClothCategory} value={clothCategory} />
        </div>
        <div
          style={{
            transform: clothCategory ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothCategory ? 'visible' : 'hidden',
            transition: 'transform 0.5s, visibility 0.5s',
          }}>
          <SeasonInput onChange={setClothSeason} value={clothSeason} />
        </div>
        <div
          style={{
            transform: clothSeason !== '0000' ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothSeason !== '0000' ? 'visible' : 'hidden',
            transition: 'transform 0.5s, visibility 0.5s',
          }}>
          <ThicknessInput onChange={setClothThickness} value={clothThickness} />
        </div>
        <div
          style={{
            transform: clothThickness !== null ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothThickness !== null ? 'visible' : 'hidden',
            transition: 'transform 0.5s, visibility 0.5s',
          }}>
          <TextilInput onChange={setClothTextile} value={clothTextile} />
        </div>
        <div
          style={{
            transform: clothTextile !== null ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothTextile !== null ? 'visible' : 'hidden',
            transition: 'transform 0.5s, visibility 0.5s',
          }}>
          <ColorInput onChange={setClothColor} value={clothColor} />
        </div>
        <div
          style={{
            transform: clothColor ? 'translateY(0)' : 'translateY(-50px)',
            visibility: clothColor ? 'visible' : 'hidden',
            transition: 'transform 0.5s, visibility 0.5s',
          }}>
          <NameInput onChange={handleClothNameChange} value={clothName} />
          <PriceInput onChange={handleClothPriceChange} value={clothPrice} />
          <BrandInput onChange={handleClothBrand} value={clothBrand} />
          <SubmitButton onChange={handleSubmit} />
        </div>
      </Form>
    </FormContainer>
  );
};

export default AddClothFormOrganism;
