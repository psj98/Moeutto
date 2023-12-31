// done
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
// axios
import { authInstance } from '../api/api';
import PickComponent from '../components/common/category/organisms/PickComponent';
import Scroll from '../components/common/scroll/molecules/Scroll';
import PostEditorTemplate from '../components/postCalendar/templates/PostEditorTemplate';
import Loading from '../components/postCalendar/atoms/LoadingAtom';

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
  // const [file, setFile] = useState<File>();

  // 카테고리 선택 확인
  useEffect(() => {
    // 중분류
    if (selectedOptionMiddle === '패딩') {
      setCategoryId('002012');
    } else if (selectedOptionMiddle === '코트') {
      setCategoryId('002007');
    } else if (selectedOptionMiddle === '자켓') {
      setCategoryId('002004');
    } else if (selectedOptionMiddle === '맨투맨') {
      setCategoryId('001005');
    } else if (selectedOptionMiddle === '후드') {
      setCategoryId('001004');
    } else if (selectedOptionMiddle === '반팔') {
      setCategoryId('001001');
    } else if (selectedOptionMiddle === '청바지') {
      setCategoryId('003002');
    } else if (selectedOptionMiddle === '반바지') {
      setCategoryId('003009');
    } else if (selectedOptionMiddle === '카고팬츠') {
      setCategoryId('003004');
    } else if (selectedOptionMiddle === '귀마개') {
      setCategoryId('011006');
    } else if (selectedOptionMiddle === '장갑') {
      setCategoryId('011011');
    } else if (selectedOptionMiddle === '목도리') {
      setCategoryId('011010');
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
        // Swal.fire({
        //   icon: 'question',
        //   title: "<h5 style='color:red'>'조회 실패'",
        //   html: '옷 목록이 존재하지 않아요',
        //   showCancelButton: false,
        //   confirmButtonText: '확인',
        // });
        setClothesData([]);
      }

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        html: '친구 옷 목록 데이터 조회 실패 토큰을 확인하세요',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#FF78A5',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, sortBy, orderBy]);

  const [cnt, setCnt] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const watchClickSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCnt(cnt + 1);
  };

  const handleSubmit = async (file: File) => {
    try {
      setIsLoading(true);
      // Create a FormData object and append the file to it

      // Configure the axios instance with the correct headers
      const axiosInstance = authInstance({ ContentType: 'multipart/form-data' }); // No need to specify Content-Type here
      const formData = new FormData();

      formData.append('file', file as File); // 이제 파일 크기가 0이 아니어야 함

      // Send the FormData in a POST request
      const response = await axiosInstance.post('/calendars/regist', formData);

      if (response) {
        setIsLoading(false);

        Swal.fire({
          icon: 'success',
          title: "<h5 style='color:blue'>성공",
          html: '캘린더 제출이 완료되었습니다',
          showCancelButton: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF78A5',
        }).then(result => {
          // 확인 버튼이 눌렸을 때 캘린더 페이지로 이동
          if (result.isConfirmed) {
            window.location.href = '/calendar';
          }
        });
      } else {
        // Handle the case when the request is not successful
      }

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        html: '캘린더 제출 실패',
        showCancelButton: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#FF78A5',
      });
    }
    return true;
  };

  return (
    <div className={isLoading ? 'bg-gray-800 bg-opacity-30' : ''}>
      <PostEditorTemplate handleSubmit={handleSubmit} cnt={cnt} setIsLoading={setIsLoading}></PostEditorTemplate>
      {isLoading ? <Loading /> : null}
      <PickComponent
        selectedOptionMain={selectedOptionMain}
        setSelectedOptionMain={setSelectedOptionMain}
        selectedOptionMiddle={selectedOptionMiddle}
        setSelectedOptionMiddle={setSelectedOptionMiddle}
        selectedOptionSort={selectedOptionSort}
        setSelectedOptionSort={setSelectedOptionSort}
        handleSubmit={watchClickSubmit}
        clothesData={clothesData}
      />
      <ScrollSection className="scroll fixed bottom-[150px]">
        <Scroll />
      </ScrollSection>
    </div>
  );
};

export default calendarPostPage;
