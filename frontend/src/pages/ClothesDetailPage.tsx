import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// atomic 연습 리팩토링 필요
import ClothesDetailImg from "../components/clothes/atoms/ClothesDetailImg";
import ClothesInfo from "../components/clothes/organisms/ClothesInfo";
import ClothesBtn from "../components/clothes/molecules/ClothesBtn";
import Comment from "../components/clothes/atoms/Comment";
import { authInstance } from "../api/api";

interface ClothesDetail {
    id: number; // 옷 등록 id
    middleCategoryId: string; // 중분류 카테고리 id
    largeCategoryId: string; // 대분류 카테고리 id
    name: string; // 이름
    season: string; // 계절
    color: string; // 색상
    thickness: number; // 두께
    price: number; // 가격
    shop: string; // 구매처 (후순위)
    textile: string; // 소재 (후순위)
    frequency: number; // 빈도
    star: number; // 즐겨찾기 여부
    imageUrl: string; // 이미지
    recentDate: string; // 최근 입은 날짜
}

const ClothesDetailPage = () => {
    // 옷 id 가져오기
    const params = useParams();

    // 옷 상세 정보 조회
    const [clothesData, setClothesData] = useState<ClothesDetail | undefined>(undefined);

    const fetchData = async () => {

        try {
            // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.get(`/clothes/${params.id}`);
            
            console.log('옷 상세 데이터 조회 성공', response.data.data);
            setClothesData(response.data.data)

            return response.data;

        } catch (error) {
            console.log('옷 상세 데이터 조회 실패', error);
            return null;
        }
    };

    const [star, setStar] = useState<boolean>();

    // 두께
    const thicknessLevels = ["얇음", "중간", "두꺼움"];
    const thickness = clothesData ? thicknessLevels[clothesData.thickness - 1] : "";

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
        <div className="m-10 mb-[80px]">
            {clothesData && (
                <>
                    <div>
                        <ClothesDetailImg imgUrl={clothesData.imageUrl} star={star} setStar={setStar} />
                        <div className="mt-4">
                            <ClothesInfo 
                                category={clothesData.middleCategoryId} 
                                season={clothesData.season} 
                                thickness={thickness} 
                                color={clothesData.color} 
                                textile={clothesData.textile}
                                price={clothesData.price} 
                                shop={clothesData.shop}
                                name={clothesData.name}
                                />    
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-center">
                        <Comment frequency={clothesData.frequency} recentDate={clothesData.recentDate} name={clothesData.name} />
                    </div>
                </>
            )}
                <div className="mt-10 flex justify-center">
                    <ClothesBtn />
                </div>
        </div>
        </>
    )
}

export default ClothesDetailPage;