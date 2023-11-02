import React, { Dispatch } from "react";

import PickTitle from "../../pickpick/atoms/PickTitle";
import SelectedCategory from "../../common/category/molecules/SelectedCategory";
import SubmitBtn from "../atoms/SubmitBtn";

interface PropsType {
    selectedOptionMain: string;
    setSelectedOptionMain: Dispatch<React.SetStateAction<string>>;
    selectedOptionMiddle: string;
    setSelectedOptionMiddle: Dispatch<React.SetStateAction<string>>;
    selectedOptionSort: string;
    setSelectedOptionSort: Dispatch<React.SetStateAction<string>>;
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  }

const TopComponent: React.FC<PropsType> = ({
    selectedOptionMain,
    setSelectedOptionMain,
    selectedOptionMiddle,
    setSelectedOptionMiddle,
    selectedOptionSort,
    setSelectedOptionSort,
    handleSubmit
}) => {

    return (
        <>
            <PickTitle />
            <div className="flex justify-between">
                <div>
                    <SelectedCategory
                        selectedOptionMain={selectedOptionMain}
                        setSelectedOptionMain={setSelectedOptionMain}
                        selectedOptionMiddle={selectedOptionMiddle}
                        setSelectedOptionMiddle={setSelectedOptionMiddle}
                        selectedOptionSort={selectedOptionSort}
                        setSelectedOptionSort={setSelectedOptionSort}
                    />
                </div>
                <div className="me-[5vw]">
                    <SubmitBtn handleSubmit={handleSubmit} />
                </div>
            </div>

        </>
    )
}

export default TopComponent;