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
            <div>
                <div className="relative">
                    <img 
                        src={imgUrl} alt="clothes" 
                        className="w-[30vw] h-[30vw] border rounded-3xl " 
                    />
                    <div className="absolute -top-4 left-[22vw] transform:translate(-50%,-50%)">
                        {star ? (
                            <RxBookmark size={"8vw"} color="FAA0BF" onClick={onClickBookMark} />
                        ) : (
                            <RxBookmarkFilled size={"8vw"} color="FAA0BF" onClick={onClickBookMark} />
                        )}
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ClothesDetailImg;