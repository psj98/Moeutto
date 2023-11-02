import React from "react";

interface SubmitBtnPropsType {
    setSubmitState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitBtn: React.FC<SubmitBtnPropsType> = ({ setSubmitState }) => {
    return (
        <>
            <button onClick={() => setSubmitState(true)}>제출하기</button>
        </>
    )
}

export default SubmitBtn;