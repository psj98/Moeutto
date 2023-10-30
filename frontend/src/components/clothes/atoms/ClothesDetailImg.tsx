import React from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

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
                        className="w-[38vw] border rounded-xl " 
                    />
                    <div className="absolute top-0 left-[30vw]">
                        {star ? (
                            <BsBookmark size={"7vw"} color="FAA0BF" onClick={onClickBookMark} />
                        ) : (
                            <BsBookmarkFill size={"7vw"} color="FAA0BF" onClick={onClickBookMark} />
                        )}
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ClothesDetailImg;