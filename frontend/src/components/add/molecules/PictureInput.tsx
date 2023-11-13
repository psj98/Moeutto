// input 컴포넌트와 프리뷰 컴포넌트가 합쳐져 이루어짐
import React, { useState, useEffect, useRef, ChangeEvent, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { TbTrashXFilled } from 'react-icons/tb';
import { PiSelectionBackgroundDuotone } from 'react-icons/pi';
// import { Base64 } from 'js-base64';
import { IconButton } from '@mui/material';
import ImageInput from '../atoms/ImageInput';
import PreviewImage from '../atoms/PreviewPicture';
// import StyledButton from '../atoms/Button';
interface Props {
  setStateValue: Dispatch<SetStateAction<File>>;
  handleIconClick: () => Promise<any>;
  // clothBase64WithoutBG: string; // 배경 제거된 이미지 base64 값
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

  .isNotRemoving {
    display: none;
  }
  .isRemoving {
    z-index: 200;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    color: black;
    text-align: center;
    vertical-align: middle;
    width: calc(70vw * 0.8 * 0.7);
    height: calc(70vw * 0.8 * 0.7);
    max-width: 460px;
    max-height: 460px;
    background: #878787;
    opacity: 0.7;
    border: double 1em transparent;
    border-radius: 35px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    animation: borderRainbow 10s infinite linear;
    -webkit-animation: borderRainbow 10s infinite linear; // for Chrome
  }

  @-webkit-keyframes borderRainbow {
    from {
      background-position: -3000px;
    }
    to {
      background-position: 0px;
    }
  }

  @keyframes borderRainbow {
    from {
      background-position: -3000px;
    }
    to {
      background-position: 0px;
    }
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: '#1a1a1a';

  .mid {
    /* display: inline-block; */
    /* width: calc(70vw * 0.8 * 0.7);
    height: calc(70vw * 0.8 * 0.7); */
    display: inline;
    margin: 0 auto;
  }
  .delete {
    position: absolute;
    bottom: 10%;
    left: 10%;
    z-index: 100;
  }
  .delete:hover::after {
    position: absolute;
    content: '다시찍기';
    /* bottom: ;
    left: 50px; */
    z-index: 100;
    width: 120px;
    font-size: 20px;
    font-weight: 800;
  }

  .removeBG {
    position: absolute;
    bottom: 10%;
    right: 10%;
    z-index: 100;
  }
  .removeBG:hover::after {
    position: absolute;
    content: '배경지우기';
    width: 120px;
    font-size: 20px;
    font-weight: 800;
  }
`;

const PictureInput = ({ setStateValue, handleIconClick }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isRemoving, setIsRemoving] = useState<Boolean>(false); // 배경 제거 표시 애니메이션을 위해 사용
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // 파일 입력 다루는 함수 : 유저가 파일을 업로드하면 받아들이는 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files[0]) {
      const selectedFile = event.target.files[0];

      if (selectedFile && selectedFile.type.substring(0, 5)) {
        // 이미지 파일이면
        setFile(selectedFile); // 받아들입니다
        event.target.value = ''; // 같은 파일 입력받기 위해서 필요합니다
      } else {
        // 이미지 파일 아니면
        setFile(null); // 받아들이지 않습니다.
        event.target.value = ''; // 같은 파일 입력받기 위해서 필요합니다
      }
      // 프리뷰에 파일을 전달함
      // onPreview(selectedFile);
    }
  };
  // 다시 찍기 함수 : '다시찍기' 버튼 클릭 시 input을 초기화하고 클릭합니다.
  const undo = e => {
    if (file) {
      setFile(null); // input을 초기화
    }
    inputRef.current.click(); // input element를 클릭한 것처럼 행동하게 하기
  };
  // 배경 지우기 함수 :

  // base64를 이미지 파일로 변환
  function base64ToImageFile(base64, filename) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // 이미지 유형에 따라 변경

    const imageFile = new File([blob], filename, { type: 'image/png' }); // 이미지 유형에 따라 변경

    return imageFile;
  }

  const removeBG = async () => {
    setIsRemoving(true); // 작업 중 true로 바꾸고
    await handleIconClick().then(res => {
      const base64String = res.data.file; // Base64 문자열을 여기에 넣으세요
      const fileName = 'image.png'; // 이미지 파일 이름을 설정하세요

      const imageFile = base64ToImageFile(base64String, fileName);

      setPreview(base64String);
      setFile(imageFile);
      // // 이미지 파일을 브라우저에서 표시
      const imageUrl = URL.createObjectURL(imageFile);

      setPreview(imageUrl);
      const img = new Image();

      img.src = imageUrl;
      // // ai에 넘겨주고 받아온다
      setIsRemoving(false); // 작업 완료되면 false로 바꾼다  // 사용 예시
    });
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
    console.log('새로 들어왔어요 .그래서 프리뷰 다시 할게요');
  }, [file]);

  useEffect(() => {
    // organism의 form의 상태로 저장하기 위해 실행하는 setState 함수
    setStateValue(file);
    console.log('새로 들어왔어요 .그래서 파일 다시 할게요');
  }, [file]);

  return (
    <>
      <Container>
        <Pic>
          <ImageInput onChange={handleFileChange} inputRef={inputRef} />
          {preview ? (
            <>
              <PreviewImage imageSrc={preview} />
              {/* <span className={`${isRemoving ? 'isRemoving' : ''}`}> */}
              <span className={`${isRemoving ? 'isRemoving' : 'isNotRemoving'}`}>이미지 배경을 제거 중 입니다</span>
            </>
          ) : null}
          {preview ? ( // 이미지를 제출하면 배경 지우기 버튼과 다시 찍기 버튼이 보입니다
            <span className="mid">
              <IconButton onClick={undo} className="inline-block delete" aria-label="delete" size="large">
                <TbTrashXFilled className="w-[60px]" size="60" />
              </IconButton>
              <IconButton onClick={removeBG} className="inline-block removeBG" aria-label="removeBG" size="large">
                <PiSelectionBackgroundDuotone className="w-[60px]" size="60" />
              </IconButton>
            </span>
          ) : null}
        </Pic>
      </Container>
    </>
  );
};

export default PictureInput;
