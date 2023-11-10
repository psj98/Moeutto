import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// axios
import { authInstance } from '../api/api';
// redux
import { RootState } from '../redux/store';
import PickComponent from '../components/common/category/organisms/PickComponent';
// components
import Scroll from '../components/common/scroll/molecules/Scroll';
import GuestbookTemplate from '../components/guestbook/templates/GuestbookTemplate';

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

export type GuestbookTextType = string;

export interface GuestBookListType {
  nickname: string;
  post: GuestbookTextType;
  regDate: string;
}

const FriendClosetPage = () => {
  const navigate = useNavigate();
  const [guestbookText, setGuestbookTect] = useState<GuestbookTextType>(''); // 방명록 인풋 값
  const [guestbookAll, setGuestbookAll] = useState<GuestBookListType[]>([]); // 방명록 전체 조회

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
    // 중분류
    if (selectedOptionMiddle === '패딩') {
      setCategoryId('001001');
    } else if (selectedOptionMiddle === '코트') {
      setCategoryId('001002');
    } else if (selectedOptionMiddle === '자켓') {
      setCategoryId('001003');
    } else if (selectedOptionMiddle === '맨투맨') {
      setCategoryId('002001');
    } else if (selectedOptionMiddle === '후드') {
      setCategoryId('002002');
    } else if (selectedOptionMiddle === '반팔') {
      setCategoryId('002003');
    } else if (selectedOptionMiddle === '청바지') {
      setCategoryId('003001');
    } else if (selectedOptionMiddle === '반바지') {
      setCategoryId('003002');
    } else if (selectedOptionMiddle === '카고팬츠') {
      setCategoryId('003003');
    } else if (selectedOptionMiddle === '귀마개') {
      setCategoryId('004001');
    } else if (selectedOptionMiddle === '장갑') {
      setCategoryId('004002');
    } else if (selectedOptionMiddle === '목도리') {
      setCategoryId('004003');
    }

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

    // 대분류
    if (selectedOptionMain === '000000') {
      setCategoryId('000000');
      setSortBy('initial');
      setOrderBy(0);
    }
  }, [selectedOptionMain, selectedOptionMiddle, selectedOptionSort]);

  // 선택한 옷 리스트
  const selectedClosetIds = useSelector((state: RootState) => state.closet.selectedClosetIds);

  // 옷 목록 조회
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);

  const pathname = window.location.pathname; // url에서 path 가져와서
  const friend = pathname.split('/')[3]; // path에서 email 가져오기

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다

      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list/friend-all', {
        email: friend, // 친구 email
      });

      if (response.data.data) {
        setClothesData(response.data.data.clothesListResponseDto);
      } else {
        setClothesData([]);
      }
      return response.data;
    } catch (error) {
      throw new Error('친구 옷 목록 데이터 조회 실패 토큰을 확인하세요');
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
      selectedClosetIds,
    };

    if (requestData) {
      localStorage.setItem('selectedClosetIds', JSON.stringify(selectedClosetIds));
      navigate('/analysis');
    } else {
      alert('선택한 옷이 없어요');
    }
  };

  const getGuestbook = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다

      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/guestbooks');

      if (response.data) {
        setGuestbookAll(response.data.data);
      } else {
        setClothesData([]);
      }
    } catch (error) {
      throw new Error('게스트북 전체 조회 실패');
    }
    return true;
  };

  useEffect(() => {
    getGuestbook();
  }, []);

  const handleGuestbookPost = async () => {
    const postData = async () => {
      try {
        // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
        const axiosInstance = authInstance({ ContentType: 'application/json' });
        const response = await axiosInstance.post('/guestbooks', {
          ownerEmail: friend, // 친구 email
          post: guestbookText,
        });

        if (response.data) {
          return response.data.data;
        } else {
          setClothesData([]);
        }
      } catch (error) {
        throw new Error('게스트북 작성 실패');
      }
      return true;
    };

    postData().then(() => {
      getGuestbook();
    });
  };

  return (
    <>
      <GuestbookTemplate
        value={guestbookText}
        posts={guestbookAll}
        setValue={setGuestbookTect}
        onClick={handleGuestbookPost}
      />
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

export default FriendClosetPage;
