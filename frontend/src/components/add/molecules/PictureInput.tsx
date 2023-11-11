// input 컴포넌트와 프리뷰 컴포넌트가 합쳐져 이루어짐
import React, { useState, useEffect, useRef, ChangeEvent, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { TbTrashXFilled } from 'react-icons/tb';
import { PiSelectionBackgroundDuotone } from 'react-icons/pi';
import { IconButton } from '@mui/material';
import ImageInput from '../atoms/ImageInput';
import PreviewImage from '../atoms/PreviewPicture';
// import StyledButton from '../atoms/Button';

interface Props {
  setStateValue: Dispatch<SetStateAction<File>>;
}

const Pic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    width: calc(70vw * 0.8 * 0.7);
    height: calc(70vw * 0.8 * 0.7);
    object-fit: cover;
    max-width: 460px;
    max-height: 460px;
    border: 5px solid black;
    border-radius: 35px;
  }
`;

const Container = styled.div`
  position: relative;
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: column; */
  /* button {
    width: calc(70vw * 0.8 * 0.7);
    max-width: 460px;
    margin: 10px auto;
  } */
  .delete {
    position: absolute;
    bottom: 10px;
    left: 30px;
    z-index: 100;
  }
  .delete:hover::after {
    position: absolute;
    content: '다시찍기';
    bottom: 20px;
    left: 50px;
    z-index: 100;
    width: 120px;
    font-size: 20px;
    font-weight: 800;
  }

  .removeBG {
    position: absolute;
    top: 10px;
    right: 30px;
    z-index: 100;
  }
  .removeBG:hover::after {
    position: absolute;
    content: '배경지우기';
    top: 30px;
    right: 60px;
    width: 120px;
    font-size: 20px;
    font-weight: 800;
  }
`;

const PictureInput = ({ setStateValue }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  // const [originFile, setOriginFile]= useState<File | null>(null); // 배경제거후 애니메이션을 위해 사용
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files[0]) {
      const selectedFile = event.target.files[0];

      if (selectedFile && selectedFile.type.substring(0, 5)) {
        // 이미지 파일이면
        setFile(selectedFile);
      } else {
        // 이미지 파일 아니면
        setFile(null);
      }

      // 프리뷰에 파일을 전달함
      // onPreview(selectedFile);
    }
  };
  const undo = e => {
    // '다시찍기' 버튼 클릭 시 input을 초기화하고 클릭합니다.
    if (file) {
      setFile(null);
    }
    inputRef.current.click();
  };
  const removeBG = () => {
    // api 연결 // Return 받은 이미지 file 에 저장 originFile에 이미지 저장후 애니메이션
    return true;
  };

  useEffect(() => {
    // 파일이 제출되면 미리보기가 생성되어 인풋 칸에 이미지가 뜹니다
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  // 올가니즘에서 상태로 저장하기 위해 실행하는 코드
  useEffect(() => {
    setStateValue(file);
  }, [file]);

  return (
    <>
      <Container>
        <Pic>
          <ImageInput onChange={handleFileChange} inputRef={inputRef} />
          {preview ? <PreviewImage imageSrc={preview} /> : null}
        </Pic>
        {/* <Button color="secondary"> */}
        <IconButton className="inline-block delete" aria-label="delete" size="large">
          <TbTrashXFilled onClick={undo} className="w-[60px]" size="60" />
        </IconButton>
        {/* </Button> */}
        <IconButton className="inline-block removeBG" aria-label="removeBG" size="large">
          <PiSelectionBackgroundDuotone onClick={removeBG} className="w-[60px]" size="60" />
        </IconButton>
        {/* <StyledButton onClick={removeBG} value="배경제거" /> */}
      </Container>
    </>
  );
};

export default PictureInput;
