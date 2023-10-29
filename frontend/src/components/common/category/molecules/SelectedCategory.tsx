import React, { useState } from "react";

import MainCategory from "../atoms/MainCategory";
import MiddleCategory from "../atoms/MiddleCategoryTop";
import SortedCategory from "../atoms/SortedCategory";

const SelectedCategory = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <>
            <MainCategory selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            {selectedOption === '전체' && null}
            {selectedOption === '상의' && <MiddleCategory categories={['반팔', '긴팔', '민소매']} />}
            {selectedOption === '하의' && <MiddleCategory categories={['반바지', '긴바지', '짧은치마', '긴치마']} />}
            {selectedOption === '아우터' && <MiddleCategory categories={['자켓', '코트', '점퍼']} />}       
            {selectedOption === '아이템' && <MiddleCategory categories={['모자', '귀마개', '장갑', '목도리']} />}  
            <SortedCategory />
        </>
    )
}

export default SelectedCategory;