import { useState, useEffect } from 'react';
import { authInstance } from '../api/api';

import { ClothesItem } from './PickPickPage';
import SelectedCategory from '../components/common/category/molecules/SelectedCategory';
import ClothesItemComponent from '../components/clothes/atoms/ClothesItem';
import MyClosetBar from '../components/common/MyClosetBar';

const MyClosetPage = () => {
  // 카테고리
  // 대분류
  const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>(null);
  // 중분류
  const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>(null);
  // 정렬순
  const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

  // 카테고리 데이터 가져오기
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
      setSortBy('initail');
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
  // 옷 목록 조회
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/clothes/list', {
        categoryId,
        sortBy,
        orderBy,
      });

      console.log('옷 목록 데이터 조회 성공', response.data);

      if (response.data.data) {
        setClothesData(response.data.data);
      } else {
        // alert('옷 목록이 없어요')
        setClothesData([]);
      }

      return response.data;
    } catch (error) {
      console.log('옷 목록 데이터 조회 실패', error);

      throw new Error('옷 목록 데이터 조회 대 실패');
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <>
      <div className="font-bold text-WebBody1">나의 옷장</div>
      <MyClosetBar state={1} />
      <SelectedCategory
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
      />
      <div className="flex flex-wrap gap-3.5 mt-4">
        {clothesData && clothesData.length > 0 ? (
          clothesData.map((item, index) => (
            <ClothesItemComponent imgUrl={item.imageUrl} clothesId={item.id.toString()} key={index} />
          ))
        ) : (
          <div>아무것도 없어요</div>
        )}
      </div>
    </>
  );
};

export default MyClosetPage;
