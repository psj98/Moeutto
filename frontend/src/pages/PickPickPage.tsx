// done
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// axios
// import { useQuery } from 'react-query';
import { authInstance } from '../api/api';

import { RootState } from '../redux/store';
import { selectCloset } from '../redux/features/closet/selectClosetSlice';
import PickComponent from '../components/common/category/organisms/PickComponent';
import Scroll from '../components/common/scroll/molecules/Scroll';

export interface ClothesItem {
  id: number; // 옷 등록 id
  middleCategoryId: string; // 중분류 카테고리 id
  largeCategoryId: string; // 대분류 카테고리 id
  color: string; // 색상
  frequency: number; // 빈도
  star: number; // 즐겨찾기 여부
  imageUrl: string; // 이미지
  regDate: string; // 등록 날짜 (DateTime 타입으로 변경 가능)
}

const PickPickPage = () => {
  const navigate = useNavigate();
  // 카테고리
  // 대분류
  const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>('전체');
  // 중분류
  const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>('000000');
  // 정렬순
  const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

  // 데이터 가져오기
  const [categoryId, setCategoryId] = useState<string>('000000');
  const [sortBy, setSortBy] = useState<string>('initial');
  const [orderBy, setOrderBy] = useState<number>(0); // 0: 오름차순, 1: 내림차순

  // 카테고리 선택 확인
  useEffect(() => {
    // 대분류
    if (selectedOptionMain === '전체') {
      setCategoryId('000000');
      setSortBy('initial');
      setOrderBy(0);
      setSelectedOptionMiddle('');
    } else if (selectedOptionMain === '상의') {
      setCategoryId('001000');
      // 중분류
      if (selectedOptionMiddle === '맨투맨') {
        setCategoryId('001005');
      } else if (selectedOptionMiddle === '후드') {
        setCategoryId('001004');
      } else if (selectedOptionMiddle === '반팔') {
        setCategoryId('001001');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '하의') {
      setCategoryId('003000');
      // 중분류
      if (selectedOptionMiddle === '청바지') {
        setCategoryId('003002');
      } else if (selectedOptionMiddle === '반바지') {
        setCategoryId('003009');
      } else if (selectedOptionMiddle === '카고팬츠') {
        setCategoryId('003004');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '아우터') {
      setCategoryId('002000');
      // 중분류
      if (selectedOptionMiddle === '패딩') {
        setCategoryId('002012');
      } else if (selectedOptionMiddle === '코트') {
        setCategoryId('002007');
      } else if (selectedOptionMiddle === '자켓') {
        setCategoryId('002004');
      } else {
        setSelectedOptionMiddle('');
      }
    } else if (selectedOptionMain === '아이템') {
      setCategoryId('011000');
      // 중분류
      if (selectedOptionMiddle === '귀마개') {
        setCategoryId('011006');
      } else if (selectedOptionMiddle === '장갑') {
        setCategoryId('011011');
      } else if (selectedOptionMiddle === '목도리') {
        setCategoryId('011010');
      } else {
        setSelectedOptionMiddle('');
      }
    }

    // 정렬
    if (selectedOptionSort === '정렬') {
      setSortBy('initial');
    } else if (selectedOptionSort === '등록순') {
      setSortBy('regDate');
    } else if (selectedOptionSort === '많이 입은 순') {
      setSortBy('frequency');
      setOrderBy(1);
    } else if (selectedOptionSort === '적게 입은 순') {
      setSortBy('frequency');
    } else {
      setSortBy('color');
    }
  }, [selectedOptionMain, selectedOptionMiddle, selectedOptionSort]);

  // 선택한 옷 리스트
  const selectedClosetIds = useSelector((state: RootState) => state.closet.selectedClosetIds);

  // useEffect(() => {
  //   console.log(selectedClosetIds);
  // }, [selectedClosetIds]);

  // 이 페이지에 처음 들어오면 무조건 전체
  useEffect(() => {
    setCategoryId('000000');
    setSortBy('initial');
    setOrderBy(0);
  }, []);

  // 옷 목록 조회
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // 리덕스 처음 시작할 때 꼭 비워져야합니다.
    dispatch(selectCloset({ id: '0', largeCategoryId: 'init' }));
  }, []);

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list', {
        categoryId,
        sortBy,
        orderBy,
      });

      if (response.data.data) {
        setClothesData(response.data.data);
      } else {
        setClothesData([]);
      }

      return response.data;
    } catch (error) {
      console.log('옷 목록 데이터 조회 실패', error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, sortBy, orderBy]);

  // 제출하기 버튼 동작 시 -> 리덕스에 선택한 옷 정보 저장 후 분석 페이지로 이동
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = event => {
    // 기본 동작 방지
    event.preventDefault();
    // redux에 저장할 데이터
    const requestData = {
      clothesList: selectedClosetIds,
      weatherInfo: {
        sky: 0,
        pty: 0,
        tmn: 0,
        tmx: 0,
        wsd: 0,
      },
    };

    const postData = async () => {
      try {
        // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
        const axiosInstance = authInstance({ ContentType: 'application/json' });
        const response = await axiosInstance.post('/ai-check-outfits/check', requestData);

        return response.data;
      } catch (error) {
        console.log('착장 검사 실패:', error);

        throw new Error('착장 검사 실패');
      }
    };

    if (requestData) {
      postData().then(analysis => {
        localStorage.setItem('analysis', JSON.stringify(analysis));
        navigate('/analysis');
      });
    } else {
      Swal.fire({
        icon: 'question',
        html: '선택한 옷이 없어요',
        showCancelButton: false,
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <>
      <PickComponent
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
        handleSubmit={handleSubmit}
        clothesData={clothesData}
      />

      <div className="fixed bottom-1/3 right-0 me-[5vw]">
        <Scroll />
      </div>
    </>
  );
};

export default PickPickPage;
