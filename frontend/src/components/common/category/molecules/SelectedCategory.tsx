import React, { Dispatch } from "react";

import MainCategory from "../atoms/MainCategory";
import MiddleCategory from "../atoms/MiddleCategoryTop";
import SortedCategory from "../atoms/SortedCategory";

interface PropsType {
    selectedOptionMain: string;
    setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
    selectedOptionMiddle: string;
    setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
    selectedOptionSort: string;
    setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
  }

const SelectedCategory: React.FC<PropsType> = ({
    selectedOptionMain,
    setSelectedOptionMain,
    selectedOptionMiddle,
    setSelectedOptionMiddle,
    selectedOptionSort,
    setSelectedOptionSort
}) => {
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