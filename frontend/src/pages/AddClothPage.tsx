import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AddClothFormTemplate from '../components/add/templates/AddClothFormTemplate';
import MyClosetBar from '../components/common/MyClosetBar';

// api
import { authInstance, aiInstance } from '../api/api';

export interface ClothInfoType {
  middleCategoryId: string;
  name: string;
  season: string;
  color: string;
  thickness: number;
  price: number;
  shop: string;
  textile: string;
}

export interface FormType {
  file: File;
  clothesRegistRequestDto: ClothInfoType;
}

function AddClothPage() {
  // post api 정의
  const [payload, setPayload] = useState<FormData | null>(null); // forData를 닮을 state
  const [clothId, setClothId] = useState<number>(0); // 저장 완료된 옷의 id
  // const [imgWithBG, setImgWithBG] = useState<File | null>();
  // const [base64WithoutBG, setBase64WithoutBG] = useState<string>('');
  const navigate = useNavigate();

  const postData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'multipart/form-data' });

      const response = await axiosInstance.post('/clothes/regist', payload);

      if (response.data) {
        setClothId(response.data.data.clothes.id); // 등록된 옷의 id값을 저장한다
        // eslint-disable-next-line no-alert
        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:blue'>'성공'",
          html: '옷장 등록에 성공했어요',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: "<h5 style='color:red'>'실패'",
          html: '옷장 등록에 실패했어요',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      throw new Error('옷 등록 실패');
    }
  };

  const removeBG = async (imgWithBG: File) => {
    try {
      if (imgWithBG !== null) {
        const formdata = new FormData();

        formdata.append('file', imgWithBG as File);

        const response = await aiInstance().post('/predict', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response;
      }
    } catch (error) {
      console.log(error);
      throw new Error('AI로 배경 지우기 실패');
    }
    return true;
  };

  useEffect(() => {
    // 초기 진입시 post api 호출 함수 실행 방지
    if (payload !== null) {
      postData();
    }
  }, [payload]);

  useEffect(() => {
    // db에 저장 성공하면 등록한 옷 detail 페이지로 이동한다
    if (clothId > 0) {
      navigate(`/mycloset/detail/${clothId}`);
      setClothId(0);
      setPayload(null);
    }
  }, [clothId]);

  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <MyClosetBar state={2} />
      <AddClothFormTemplate setStateValue={setPayload} handleRemoveBG={removeBG} />
    </div>
  );
}

export default AddClothPage;
