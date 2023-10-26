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

    const address: string = "역삼동";

    // 위치 다시 정하기 위한 클릭 이벤트 상태 값
    const [locationState, setLocationState] = useState<boolean>(false);
    
    // 지도 화면 출력 클릭 이벤트
    const showLocationClick = () => {
        console.log('클릭', locationState)
        setLocationState(!locationState);
    }

    // map 변수를 함수 스코프 밖에서 정의
    // let map: any;

    // 주소 변환 함수
    // let geocoder: any;
    // const [address, setAddress] = useState<string>("");

    // 위도, 경도를 기반으로 현재 법정동 주소를 가져온다.
    // const reverseGeocoding = (lat: number, lng: number) => {
    //     if (geocoder) {
    //         geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
    //             if (status === window.kakao.maps.services.Status.OK) {
    //                 if (result[0]) {
    //                     // 법정동 주소를 출력
    //                     setAddress(result[0].address_name);
    //                 }
    //             }
    //         });
    //     } else {
    //         console.error("주소 바꾸는 것 에러남")
    //     }
    // };

    // resetToCurrentLocation 함수를 컴포넌트 스코프에서 정의
    // const resetToCurrentLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const lat = position.coords.latitude;
    //             const lng = position.coords.longitude;

    //             // 현재 위치 정보 업데이트
    //             setCurrentLocation({ latitude: lat, longitude: lng });
    
    //             // 지도에 현재 위치 표시
    //             const currentLocationMarker = new window.kakao.maps.Marker({
    //                 map,
    //                 position: new window.kakao.maps.LatLng(lat, lng),
    //             });

    //             // 현재 위치에 마커 표시하기
    //             currentLocationMarker.setMap(map);

    //             // map 변수 사용
    //             // 지도 객체가 생성되면 지도 객체를 조작한다
    //             if (map) {
    //                 map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    //             }

    //             reverseGeocoding(lat, lng);
    //         });
    //     }
    // } 
      
    // 주소 검색 이벤트 핸들러
    // const [newLocation, setNewLocation] = useState<string>("");

    // const handleInputChange = (newValue: any) => {
    //     setNewLocation(newValue);
    // }

    
    

    // useEffect(() => {
    //     console.log(mapRef.current);
    //     // if (mapRef.current) {
    //         const container = mapRef.current; // 지도를 담을 영역의 DOM
           
    //         console.log('컨테이너', container)

    //         // const container = document.getElementById('map'); // 지도를 담을 영역의 DOM
    //         const options = {
    //             center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    //             level: 1 // 지도의 확대, 축소 레벨
    //         };
            
    //         map = new window.kakao.maps.Map(container, options);
    //         resetToCurrentLocation();

    //             // map.relayout();
        

    //         // window.kakao.maps.load(() => {
    //         //     // 지도 객체 생성
    //         //     map = new window.kakao.maps.Map(container, options);
    //         //     map.relayout();
    //         //     // 주소 변환 객체 생성
    //         //     geocoder = new window.kakao.maps.services.Geocoder();

    //         //     // 초기 실행시 현재 위치 띄워주기
    //         //     resetToCurrentLocation();
    //         // });
    //     // }

        
    // }, [locationState])
    
    

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
                />
               
            </div>
        </>
    )
}

export default MainPage;
