import React, { useState } from "react";

import MainInfo from "../components/main/organisms/MainInfo"
 import PickButtonTap from "../components/main/organisms/PickButtonTap";
import RecommendList from "../components/main/organisms/RecommendList";
import MapModal from "../components/main/organisms/MapModal";

// 아토믹 디자인 패턴 확인용

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
        console.log('클릭', locationState)
        setLocationState(!locationState);
    }

    // 지도 끄기
    const closedLocationClick = () => {
        if (locationState === true) {
            setLocationState(false);
        }
    }

    // 지도 다시 불러오기
    const [resetLocation, setResetLocation] = useState<boolean>(false);

 
    // 주소 검색 이벤트 핸들러
    // const [newLocation, setNewLocation] = useState<string>("");

    // const handleInputChange = (newValue: any) => {
    //     setNewLocation(newValue);
    // }

    return (
        <>
            <div className="flex flex-col" onClick={closedLocationClick}>
                <MainInfo currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
                <br />
                {/* 날씨 기반 추천 리스트 */}
                <RecommendList />
                <br />
                {/* 버튼 탭 */}
                <PickButtonTap />
                {/* 지도  */}
                <div className="absolute z-50 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <MapModal 
                        currentLocation={currentLocation} 
                        address={address} 
                        locationState={locationState}
                        setCurrentLocation={setCurrentLocation}
                        setAddress={setAddress}
                        resetLocation={resetLocation}
                        setResetLocation={setResetLocation}
                        showLocationClick={showLocationClick}
                    />
                </div>
            </div>
        </>
    )
}

export default MainPage;
