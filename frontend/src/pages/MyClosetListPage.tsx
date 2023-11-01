import { useState } from "react";

import { ClothesItem } from "./PickPickPage";
import SelectedCategory from "../components/common/category/molecules/SelectedCategory";
import ClothesItemComponent from "../components/clothes/atoms/ClothesItem";

const MyClosetListPage = () => {
    // 카테고리
    // 대분류
    const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>(null);
    // 중분류
    const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>(null);
    // 정렬순
    const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

    // 옷 목록 조회 더미 api
    const clothesData: ClothesItem[] = [
        {
            "id": 1, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "imageUrl": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
        {
            "id": 2, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "imageUrl": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
        {
            "id": 3, // 옷 등록 id
            "middleCategoryId": "String", // 중분류 카테고리 id
            "largeCategoryId": "String", // 대분류 카테고리 id
            "color": "String", // 색상
            "frequency": 0, // 빈도
            "star": 0, // 즐겨찾기 여부
            "imageUrl": "/images/clothes1.png", // 이미지
            "regDate": "DateTime", // 등록 날짜
        },
    ]

    return (
        <>
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
                    <ClothesItemComponent imgUrl={item.imageUrl} clothesId={item.id.toString()} />
                ))}
            </div>
            
        </>
    )
}

export default MyClosetListPage;