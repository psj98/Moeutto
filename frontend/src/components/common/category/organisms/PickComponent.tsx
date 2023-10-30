import React, { Dispatch } from "react";

import TopComponent from "../../../clothes/molecules/TopComponent";
import SelectedClothesItem from "../../../clothes/atoms/SelectedClothesItem";
import { ClothesItem } from "../../../../pages/PickPickPage";

interface PropsType {
    selectedOptionMain: string;
    setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
    selectedOptionMiddle: string;
    setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
    selectedOptionSort: string;
    setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
    clothesData: ClothesItem[];
  }

const PickComponent: React.FC<PropsType> = ({
    selectedOptionMain,
    setSelectedOptionMain,
    selectedOptionMiddle,
    setSelectedOptionMiddle,
    selectedOptionSort,
    setSelectedOptionSort,
    handleSubmit,
    clothesData
}) => {
    return (
        <>
            <TopComponent
                selectedOptionMain={selectedOptionMain}
                setSelectedOptionMain={setSelectedOptionMain}
                selectedOptionMiddle={selectedOptionMiddle}
                setSelectedOptionMiddle={setSelectedOptionMiddle}
                selectedOptionSort={selectedOptionSort}
                setSelectedOptionSort={setSelectedOptionSort}
                handleSubmit={handleSubmit}
             />
            <div className="flex flex-wrap gap-3.5 mt-4">
                {clothesData.map((item, index) => (
                    <SelectedClothesItem imgUrl={item.image} clothesId={item.id.toString()} />
                ))}
            </div>
        </>
    )
}

export default PickComponent;