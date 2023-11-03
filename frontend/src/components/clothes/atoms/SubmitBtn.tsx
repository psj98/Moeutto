import React from "react";

interface PropsType {
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitBtn: React.FC<PropsType> = ({ handleSubmit }) => {
    return (
        <>
        <div className="flex w-full h-full items-center justify-center">
            <button 
                className="bg-pink-hot rounded-xl shadow-xl text-white text-WebBody3 p-4 tracking-wider font-bold"
                onClick={handleSubmit}
            >
                제출하기
            </button>
        </div>
        </>
    )
}

export default SubmitBtn;