import React, { useEffect, useState } from "react";

import MainCategory from "../atoms/MainCategory";
import MiddleCategory from "../atoms/MiddleCategoryTop";
import SortedCategory from "../atoms/SortedCategory";

const SelectedCategory = () => {
    // 대분류
    const [selectedOptionMain, setSelectedOptionMain] = useState<string | null>(null);
    // 중분류
    const [selectedOptionMiddle, setSelectedOptionMiddle] = useState<string | null>(null);
    // 정렬순
    const [selectedOptionSort, setSelectedOptionSort] = useState<string | null>(null);

    useEffect(() => {
        // 전체를 클릭하면 중분류 초기화
        if (selectedOptionMain === "전체") {
            setSelectedOptionMiddle(null);
        }
        console.log(selectedOptionMain, selectedOptionMiddle, selectedOptionSort);
    }, [selectedOptionMain, selectedOptionMiddle, selectedOptionSort])

    return (
        <>
            <MainCategory selectedOption={selectedOptionMain} setSelectedOption={setSelectedOptionMain} />
            {selectedOptionMain === '전체' && null}
            {selectedOptionMain === '상의' && <MiddleCategory categories={['반팔', '긴팔', '민소매']} selectedOption={selectedOptionMiddle} setSelectedOption={setSelectedOptionMiddle} />}
            {selectedOptionMain === '하의' && <MiddleCategory categories={['반바지', '긴바지', '짧은치마', '긴치마']} selectedOption={selectedOptionMiddle} setSelectedOption={setSelectedOptionMiddle} />}
            {selectedOptionMain === '아우터' && <MiddleCategory categories={['자켓', '코트', '점퍼']} selectedOption={selectedOptionMiddle} setSelectedOption={setSelectedOptionMiddle} />}       
            {selectedOptionMain === '아이템' && <MiddleCategory categories={['모자', '귀마개', '장갑', '목도리']} selectedOption={selectedOptionMiddle} setSelectedOption={setSelectedOptionMiddle} />}  
            <SortedCategory selectedOption={selectedOptionSort} setSelectedOption={setSelectedOptionSort} />
        </>
    )
}

export default SelectedCategory;