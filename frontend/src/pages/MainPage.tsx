import React, { useEffect, useState } from "react";

import MainInfo from "../components/main/organisms/MainInfo"
 import PickButtonTap from "../components/main/organisms/PickButtonTap";
import RecommendList from "../components/main/organisms/RecommendList";
import MapModal from "../components/main/organisms/MapModal";


const MainPage = () => {
    // 현재 위치
    const [currentLocation, setCurrentLocation] = useState<{ 
        latitude: number; 
        longitude: number; 
    } | null>(null);
    
    // 법정동 주소
    const [address, setAddress] = useState<string>("");

    // 지도 출력
    const [locationState, setLocationState] = useState<boolean>(false);
    
    // 지도 화면 출력 클릭 이벤트
    const showLocationClick = () => {
        setLocationState(!locationState);
    }

    // 지도 다시 불러오기
    const [resetLocation, setResetLocation] = useState<boolean>(false);

 
    // 주소 검색 이벤트 핸들러
    const [newLocation, setNewLocation] = useState<string>("");

    const handleInputChange = (newValue: any) => {
        setNewLocation(newValue);
    }

    // 옷 추천 리스트 가상 데이터
    const RecommendClothesListData: any = 
    {
        "recommenClothesInfo": [ // 추천 옷 목록
            {
                "clothesInAIOutfit": [ // 날짜별 AI 추천 옷 정보 리스트
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes1.png" // 옷 이미지
                    },
                    {
                        "clothesId": 2, // 옷 id
                        "imageUrl": "/images/clothes2.png" // 옷 이미지
                    },
                    {
                        "clothesId": 3, // 옷 id
                        "imageUrl": "/images/clothes3.png" // 옷 이미지
                    },
                    {
                        "clothesId": 4, // 옷 id
                        "imageUrl": "/images/clothes4.png" // 옷 이미지
                    },
                ], 
            },
            {
                "clothesInAIOutfit": [ // 날짜별 AI 추천 옷 정보 리스트
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes1.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes2.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes3.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes4.png" // 옷 이미지
                    },
                ], 
            },
            {
                "clothesInAIOutfit": [ // 날짜별 AI 추천 옷 정보 리스트
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes1.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes2.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes3.png" // 옷 이미지
                    },
                    {
                        "clothesId": 1, // 옷 id
                        "imageUrl": "/images/clothes4.png" // 옷 이미지
                    },
                ], 
            }
        ],
               
        "recommenWeatherInfo": [ // 추천 날씨 목록
            {
                "minTemperature": 10, // 최저 기온
                "maxTemperature": 20, // 최고 기온
                "weather": 1, // 날씨 정보 (맑음, 구름 조금 등)
            },
            {
                "minTemperature": 15, // 최저 기온
                "maxTemperature": 25, // 최고 기온
                "weather": 1, // 날씨 정보 (맑음, 구름 조금 등)
            },
            {
                "minTemperature": 5, // 최저 기온
                "maxTemperature": 10, // 최고 기온
                "weather": 1, // 날씨 정보 (맑음, 구름 조금 등)
            }
        ],
    }

    // 옷 추천 리스트
    const [clothesListData, setClothesListData] = useState<any>([]);

    // 날씨 기반 리스트
    const [weatherListData, setWeatherListData] = useState<any>([]);

    useEffect(() => {
        setClothesListData(RecommendClothesListData.recommenClothesInfo);
        setWeatherListData(RecommendClothesListData.recommenWeatherInfo);
    }, [])


    return (
        <>
            <div className="flex flex-col p-4">
                <MainInfo currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
                <br />
                {/* 날씨 기반 추천 리스트 */}
                <RecommendList clothesListData={clothesListData} weatherListData={weatherListData} />
                <br />
                {/* 버튼 탭 */}
                <PickButtonTap />
                {/* 지도  */}
                <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[50vw] max-w-[400px] min-w-[300px]">
                    <MapModal 
                        currentLocation={currentLocation} 
                        address={address} 
                        locationState={locationState}
                        setCurrentLocation={setCurrentLocation}
                        setAddress={setAddress}
                        resetLocation={resetLocation}
                        setResetLocation={setResetLocation}
                        showLocationClick={showLocationClick}
                        handleInputChange={handleInputChange}
                        newLocation={newLocation}
                    />
                </div>
            </div>
        </>
    )
}

export default MainPage;
