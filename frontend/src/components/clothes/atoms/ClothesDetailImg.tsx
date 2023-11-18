import React, { useEffect, useState } from "react";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { authInstance } from "../../../api/api";

interface PropsType {
    imgUrl: string;
    id: number;
    isStar: number;
}

// 그냥 여기서 즐겨찾기 api 불러오기
const ClothesDetailImg = ({ imgUrl, id, isStar }: PropsType ) => {
    const [star, setStar] = useState<boolean>();

    useEffect(() => {
        if (isStar === 1) {
            setStar(true)
        } else {
            setStar(false)
        }
    }, [])
    

    const onClickBookMark = async () => {
        setStar((prev) => !prev)
      
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.get(`/clothes/star/${id}`);

            console.log('즐겨찾기 등록/해제 성공', response)
            setStar(response.data.data.star)
        } catch (error) {
            console.log('즐겨찾기 등록/해제 실패', error)
        }
        
    }

    return (
        <>
            <div className="w-full baboParent flex flex-col items-center relative">
                <div className="relative">
                    <img 
                        id="img"
                        src={imgUrl} alt="clothes" 
                        className="w-2/3 min-w-[200px] min-h-[180px] max-w-[300px] max-h-[280px] m-auto border rounded-3xl border" 
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute -top-2 right-4">
                        {!star ? (
                                <RxBookmark size={60} color="FAA0BF" onClick={onClickBookMark} />
                            ) : (
                                <RxBookmarkFilled size={60} color="FAA0BF" onClick={onClickBookMark} />
                            )}
                    </div>

                </div>
                </div>
        </>
    )
}

export default ClothesDetailImg;
