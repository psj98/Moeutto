import React from "react";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

interface PropsType {
    imgUrl: string;
    star: boolean;
    setStar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClothesDetailImg = ({ imgUrl, star, setStar }: PropsType ) => {
    const onClickBookMark = () => {
        setStar((prev) => !prev)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center relative">
                <img 
                    src={imgUrl} alt="clothes" 
                    className="w-2/3 h-2/3 min-w-[223px] border rounded-3xl " 
                />
                <div className="absolute -top-3 end-9 sm:right-4">
                    {star ? (
                        <RxBookmark size={90} color="FAA0BF" onClick={onClickBookMark} />
                    ) : (
                        <RxBookmarkFilled size={90} color="FAA0BF" onClick={onClickBookMark} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ClothesDetailImg;

// transform:translate(-50%,-50%)