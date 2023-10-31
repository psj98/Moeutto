import React from "react";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

interface PropsType {
    imgUrl: any;
    star: any;
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
                        className="w-[38vw] border rounded-3xl " 
                    />
                    <div className="absolute -top-3 left-[30vw] transform:translate(-50%,-50%)">
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