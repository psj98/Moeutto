import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as htmlToImage from 'html-to-image';
import styled from 'styled-components';
// axios
import { authInstance } from '../api/api';
import PickComponent from '../components/common/category/organisms/PickComponent';
import Scroll from '../components/common/scroll/molecules/Scroll';
import PostEditorTemplate from '../components/postCalendar/templates/PostEditorTemplate';
// import { RootState } from '../redux/store';

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

const ScrollSection = styled.div`
  right: calc(50% - 175px); /* 중앙에서 오른쪽으로 175px 떨어진 위치 */
  transform: translate(0, -50%); /* 요소를 수직으로 중앙 정렬 */
`;

const calendarPostPage = () => {
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
  const [file, setFile] = useState<FormData>();

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
  // const selectedClosetIds = useSelector((state: RootState) => state.post.selectedClosetUrls);

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

      if (response.data.data) {
        setClothesData(response.data.data);
      } else {
        // alert('옷 목록이 없어요')
        setClothesData([]);
      }

      return response.data;
    } catch (error) {
      throw new Error('옷 목록 데이터 조회 실패 토큰을 확인하세요');
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, sortBy, orderBy]);

  // 제출하기 버튼 동작 시 -> 리덕스에 선택한 옷 정보 저장 후 분석 페이지로 이동
  // const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = event => {
  //   console.log(file);

  //   const postData = async () => {
  //     try {
  //       // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
  //       const axiosInstance = authInstance({ ContentType: 'multipart/form-data' });
  //       // const response = await axiosInstance.post('/calendars/regist', file);
  //       const response = await axiosInstance.post('/calendars/regist', file, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       if (response) {
  //         alert('캘린더 제출이 완료되었습니다.');
  //       } else {
  //         // alert('옷 목록이 없어요')
  //       }
  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error('캘린더 제출 실패');
  //     }
  //   };

  //   postData();
  // };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async event => {
    try {
      // Create a FormData object and append the file to it

      // Configure the axios instance with the correct headers
      const axiosInstance = authInstance({ ContentType: 'multipart/form-data' }); // No need to specify Content-Type here

      // Send the FormData in a POST request
      const response = await axiosInstance.post('/calendars/regist', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        alert('캘린더 제출이 완료되었습니다.');
      } else {
        // Handle the case when the request is not successful
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('캘린더 제출 실패');
    }
  };

  return (
    <>
      <PostEditorTemplate setFile={setFile}></PostEditorTemplate>
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

      <ScrollSection className="scroll fixed bottom-[150px]">
        <Scroll />
      </ScrollSection>
    </>
  );
};

export default calendarPostPage;
