import { useParams } from "react-router-dom";
import { useState } from "react";

// atomic 연습
import ClothesDetailImg from "../components/clothes/atoms/ClothesDetailImg";

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
            "color": String, // 색상
            "thickness": 3, // 두께
            "price": 300000, // 가격
            "shop": "자라", // 구매처 (후순위)
            "textile": "코튼", // 소재 (후순위)
            "frequency": 23, // 빈도
            "star": 1, // 즐겨찾기 여부
            "image": "/images/clothes1.png", // 이미지
            "recentDate": "DateTime" // 최근 입은 날짜
        }

    // 즐겨찾기
    const [star, setStar] = useState<boolean>(clothesDetailData.star);
    
    return (
        <div className="ClothesDetailPage">
            <p>여긴 {params.id}번 옷의 상세 페이지 입니다.</p>
            <ClothesDetailImg imgUrl={clothesDetailData.image} star={star} setStar={setStar} />
        </div>
    )
}

export default ClothesDetailPage;