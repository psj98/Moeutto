import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// axios
// import { useQuery } from 'react-query';
// import axiosWithAuth from "../api/api";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import PickComponent from "../components/common/category/organisms/PickComponent";
import Scroll from "../components/common/scroll/molecules/Scroll";

// 아토믹 디자인 패턴 확인하기

export interface ClothesItem {
    id: number; // 옷 등록 id
    middleCategoryId: string; // 중분류 카테고리 id
    largeCategoryId: string; // 대분류 카테고리 id
    color: string; // 색상
    frequency: number; // 빈도
    star: number; // 즐겨찾기 여부
    image: string; // 이미지
    regDate: string; // 등록 날짜 (DateTime 타입으로 변경 가능)
}

const PickPickPage = () => {
    const navigate = useNavigate();
    // 카테고리
    // 대분류
    const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>(null);
    // 중분류
    const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>(null);
    // 정렬순
    const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

    // 카테고리 선택 확인
    useEffect(() => {
        // 전체를 클릭하면 중분류 초기화
        if (selectedOptionMain === "전체") {
            setSelectedOptionMiddle(null);
        }
        console.log(selectedOptionMain, selectedOptionMiddle, selectedOptionSort);
    }, [selectedOptionMain, selectedOptionMiddle, selectedOptionSort])

    // 선택한 옷 리스트
    const selectedClosetIds = useSelector((state: RootState) => state.closet.selectedClosetIds);
    
    // 옷 목록 조회 더미 api
    const clothesData: ClothesItem[] = [
        {
            "id": 1, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "image": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
        {
            "id": 2, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "image": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
        {
            "id": 3, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "image": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
    ]

    // let clothesData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // const fetchData = async () => {
    //     // 데이터 가져오기
    //     const categoryId: string = 'yourCategoryId';
    //     const sortBy: string = 'regDate'; // 또는 'frequency', 'color'
    //     const orderBy: number = 0; // 0: 오름차순, 1: 내림차순

    //     try {
    //         const axiosInstance = axiosWithAuth();
    //         const response = await axiosInstance.get('/api/clothes/list', {
    //             params: {
    //                 categoryId,
    //                 sortBy,
    //                 orderBy
    //             }
    //         });
            
    //         console.log('옷 목록 데이터 조회 성공', response.data);

    //         return response.data;
    //     } catch (error) {
            
    //         console.log('옷 목록 데이터 조회 실패', error);

    //         throw new Error('Failed to fetch data');
    //     }
    // };

    // const { isLoading, isError, data } = useQuery('selectcloset', fetchData);
    // const { isLoading, isError, data, error } = useQuery('selectcloset', fetchData);

    // if (data) {
    //     clothesData = data as number[];
    // }

    // if (isLoading) {
    //     return <div>로딩중</div>
    // }

    // if (isError) {
    //     return <div>에러가 났어요</div>
    // }


    // 제출하기 api 필요
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        // 기본 동작 방지
        event.preventDefault();
        // request에 담을 데이터
        const requestData = {
            selectedClosetIds
        }

        console.log('제출 함수 실행 성공', requestData);
        if (requestData) {
            navigate('/analysis');
        }
    }


    useEffect(() => {
        console.log('선택된 옷 리스트', selectedClosetIds);
    }, [selectedClosetIds])

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
    )
}

export default PickPickPage;