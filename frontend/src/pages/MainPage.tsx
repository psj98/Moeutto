import MainInfo from "../components/main/organisms/MainInfo"
import { useEffect, useState } from "react";

interface KakaoMap extends Window {
    kakao: any; // Kakao Maps 라이브러리의 타입에 따라 조정
  }

declare const window: KakaoMap;

// 일단 지도 띄우기
const MainPage = () => {
    // 현재 위치
    const [currentLocation, setCurrentLocation] = useState<{ 
        latitude: number; 
        longitude: number; 
        address: string | null;
    }>({
        latitude: 0,
        longitude: 0,
        address: null,
    }
    );
    
    // map 변수를 함수 스코프 밖에서 정의
    let map: any;
    let geocoder: undefined | any;
    let marker: any;
    let infowindow: any;

    // resetToCurrentLocation 함수를 컴포넌트 스코프에서 정의
    const resetToCurrentLocation = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Geocoder를 사용하여 위도, 경도를 주소로 변환
            geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(lng, lat, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address_name;
            setCurrentLocation({ latitude: lat, longitude: lng, address: address });

            // marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
            // infowindow = new window.kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

            // 지도에 현재 위치 표시
            const currentLocationMarker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(lat, lng),
            });
            map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        }
        });
        });
    }
};

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대, 축소 레벨
    };
    map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 초기 로딩 시 
  
  }, [])

    
    return (
        <>
            <div>
                <MainInfo />
                <button onClick={resetToCurrentLocation}>현재 위치로 설정하기</button>
                <div id="map" style={{
                    width: '200px',
                    height: '200px'
                }}></div>
                <div>현재 위치 결과</div>
                {currentLocation && (
                <div>
                    현재 위치 정보: {currentLocation.address}
                </div>
                )}
            </div>
        </>
    )
}

export default MainPage;