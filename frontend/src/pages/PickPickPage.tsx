import React, { useState, useEffect } from "react";

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

    // 옷 목록 조회 api
    const clothesData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
                    <SelectedClothesItem imgUrl={'/images/clothes1.png'} clothesId={"1"} />
                ))}
            </div>
        </>
    )
}

export default PickPickPage;