import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// axios
// import { useQuery } from 'react-query';
// import axiosWithAuth from "../api/api";
import { RootState } from "../redux/store";


// 아토믹 디자인 패턴 확인하기
import PickTitle from "../components/pickpick/atoms/PickTitle";
import SelectedCategory from "../components/common/category/molecules/SelectedCategory";
import SelectedClothesItem from "../components/clothes/SelectedClothesItem";

const PickPickPage = () => {
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
    
    // 옷 목록 조회 api
    const clothesData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // let clothesData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // const accessToken: string = window.sessionStorage.getItem("accessToken");

    // const fetchData = async () => {
    //     // 데이터 가져오기
    //     const categoryId: string = 'yourCategoryId';
    //     const sortBy: string = 'regDate'; // 또는 'frequency', 'color'
    //     const orderBy: number = 0; // 0: 오름차순, 1: 내림차순

    //     try {
    //         const axiosInstance = axiosWithAuth(accessToken);
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


    useEffect(() => {
        console.log('선택된 옷 리스트', selectedClosetIds);
    }, [selectedClosetIds])

    return (
        <>
            <PickTitle />
            <SelectedCategory
                selectedOptionMain={selectedOptionMain}
                setSelectedOptionMain={setSelectedOptionMain}
                selectedOptionMiddle={selectedOptionMiddle}
                setSelectedOptionMiddle={setSelectedOptionMiddle}
                selectedOptionSort={selectedOptionSort}
                setSelectedOptionSort={setSelectedOptionSort}
            />
            <div className="flex flex-wrap gap-3.5 mt-4">
                {clothesData.map((item, index) => (
                    <SelectedClothesItem imgUrl={'/images/clothes1.png'} clothesId={index.toString()} />
                ))}
            </div>
        </>
    )
}

export default PickPickPage;