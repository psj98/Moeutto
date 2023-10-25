import React, { useEffect, useState } from "react";

import MainInfo from "../components/main/organisms/MainInfo"
import CurrentLocationBtn from "../components/main/atoms/CurrentLocationBtn";
import ShowMap from "../components/main/atoms/ShowMap";

interface KakaoMap extends Window {
    kakao: any; // Kakao Maps 라이브러리의 타입에 따라 조정
    resetToCurrentLocation: () => void;
    currentLocation: any;
    address: string;
}

declare const window: KakaoMap;

// 일단 지도 띄우기
const MainPage = () => {
    // 현재 위치
    const [currentLocation, setCurrentLocation] = useState<{ 
        latitude: number; 
        longitude: number; 
    } | null>(null);
    
    // map 변수를 함수 스코프 밖에서 정의
    let map: any;

    // 주소 변환 함수
    let geocoder: any;
    const [address, setAddress] = useState<string>("");


    const reverseGeocoding = (lat: number, lng: number) => {
        if (geocoder) {
            geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    if (result[0]) {
                        // 법정동 주소를 출력
                        setAddress(result[0].address_name);
                    }
                }
            });
        } else {
            console.error("주소 바꾸는 것 에러남")
        }
    };

  

    // resetToCurrentLocation 함수를 컴포넌트 스코프에서 정의
    const resetToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // 현재 위치 정보 업데이트
                setCurrentLocation({ latitude: lat, longitude: lng });
    
                // 지도에 현재 위치 표시
                const currentLocationMarker = new window.kakao.maps.Marker({
                    map,
                    position: new window.kakao.maps.LatLng(lat, lng),
                });

                currentLocationMarker.setMap(map);

                // map 변수 사용
                // 지도 객체가 생성되면 지도 객체를 조작한다
                if (map) {
                    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
                }

                reverseGeocoding(lat, lng);
            });
        }
    }

    useEffect(() => {
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 1 // 지도의 확대, 축소 레벨
        };

        window.kakao.maps.load(() => {
            map = new window.kakao.maps.Map(container, options);
            geocoder = new window.kakao.maps.services.Geocoder();

            // 초기 실행시 현재 위치 띄워주기
            // resetToCurrentLocation();

        });
    }, [])

    

    return (
        <>
            <div>
                <MainInfo currentLocation={currentLocation} address={address} />
                <CurrentLocationBtn resetToCurrentLocation={resetToCurrentLocation}  />
                <ShowMap />
            </div>
        </>
    )
}

export default MainPage;
