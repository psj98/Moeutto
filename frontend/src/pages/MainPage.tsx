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

    // 위치 다시 정하기 위한 클릭 이벤트 상태 값
    const [locationState, setLocationState] = useState<boolean>(false);
    
    // 지도 화면 출력 클릭 이벤트
    const showLocationClick = () => {
        console.log('클릭', locationState)
        setLocationState(!locationState);
    }

    // 주소 검색 이벤트 핸들러
    // const [newLocation, setNewLocation] = useState<string>("");

    // const handleInputChange = (newValue: any) => {
    //     setNewLocation(newValue);
    // }

    return (
        <>
            <div>
                <MainInfo currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
                <br />
                {/* 날씨 기반 추천 리스트 */}
                <RecommendList />
                <br />
                {/* 버튼 탭 */}
                <PickButtonTap />
                {/* 지도  */}
                <MapModal 
                    // resetToCurrentLocation={resetToCurrentLocation} 
                    currentLocation={currentLocation} 
                    address={address} 
                    locationState={locationState}
                    setCurrentLocation={setCurrentLocation}
                    setAddress={setAddress}
                />
               
            </div>
        </>
    )
}

export default MainPage;
