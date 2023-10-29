import React, { useState, useEffect } from "react";

// 아토믹 디자인 패턴 확인하기
import PickTitle from "../components/pickpick/atoms/PickTitle";
import SelectedCategory from "../components/common/category/molecules/SelectedCategory";

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
        </>
    )
}

export default PickPickPage;