import { useParams } from "react-router-dom";
import { useState } from "react";

// atomic 연습
import ClothesDetailImg from "../components/clothes/atoms/ClothesDetailImg";
import ClothesInfo from "../components/clothes/organisms/ClothesInfo";
import ClothesBtn from "../components/clothes/molecules/ClothesBtn";
import Comment from "../components/clothes/atoms/Comment";

const ClothesDetailPage = () => {
    // 옷 id 가져오기
    const params = useParams();
    
    const clothesDetailData: any = 
        {
            "id": 1, // 옷 등록 id
            "middleCategoryId": "자켓", // 중분류 카테고리 id
            "largeCategoryId": "상의", // 대분류 카테고리 id
            "name": "검정색 라이더 자켓", // 이름
            "season": "1010", // 계절
            "color": "검정", // 색상
            "thickness": 3, // 두께
            "price": 300000, // 가격
            "shop": "자라", // 구매처 (후순위)
            "textile": "코튼", // 소재 (후순위)
            "frequency": 23, // 빈도
            "star": 1, // 즐겨찾기 여부
            "image": "/images/clothes1.png", // 이미지
            "recentDate": "20231020" // 최근 입은 날짜
        }

    console.log(params.id);

    // 즐겨찾기
    const [star, setStar] = useState<boolean>(clothesDetailData.star);
    // 두께
    let thickness: string = "";

    if (clothesDetailData.thickness === 1) {
        thickness = "얇음";
    } else if (clothesDetailData.thickness === 2) {
        thickness = "중간";
    } else {
        thickness = "두꺼움";
    }
    
    return (
        <>
            <div className="flex">
                <ClothesDetailImg imgUrl={clothesDetailData.image} star={star} setStar={setStar} />
                <div>
                    <ClothesInfo 
                        category={clothesDetailData.middleCategoryId} 
                        season={clothesDetailData.season} 
                        thickness={thickness} 
                        color={clothesDetailData.color} 
                        textile={clothesDetailData.textile}
                        price={clothesDetailData.price} 
                        shop={clothesDetailData.shop}
                        name={clothesDetailData.name}
                        />    
                </div>
            </div>
            <div className="mt-10">
                <Comment frequency={clothesDetailData.frequency} recentDate={clothesDetailData.recentDate} name={clothesDetailData.name} />
            </div>
            <div className="fixed right-6 bottom-6">
                <ClothesBtn />
            </div>
        </>
    )
}

export default ClothesDetailPage;