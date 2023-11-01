import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// atomic 연습 리팩토링 필요
import ClothesDetailImg from "../components/clothes/atoms/ClothesDetailImg";
import ClothesInfo from "../components/clothes/organisms/ClothesInfo";
import ClothesBtn from "../components/clothes/molecules/ClothesBtn";
import Comment from "../components/clothes/atoms/Comment";
import { authInstance } from "../api/api";

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


    // 옷 목록 조회
    const [clothesData, setClothesData] = useState<any>();

    const fetchData = async () => {

        try {
            // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
            const axiosInstance = authInstance();
            const response = await axiosInstance.get(`/clothes/${params.id}`);
            
            console.log('옷 상세 데이터 조회 성공', response.data.data);

            if (response.data.data) {
                setClothesData(response.data.data);
            } else {
                alert('이 옷 없는데?')
            }

            return response.data;
        } catch (error) {
            console.log('옷 상세 데이터 조회 실패', error);

            throw new Error('옷 상세 데이터 조회 대 실패');
        }
    };

    const [star, setStar] = useState<boolean>();

    useEffect(() => {
        fetchData();
        console.log(clothesData)
        console.log(clothesData.star)

        // // 즐겨찾기
        // if (clothesData.star && clothesData.star === 1) {
        //     setStar(true)
        // } else {
        //     setStar(false)
        // }
    }, [])

    
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