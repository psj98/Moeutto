import React, { useEffect, useRef, Dispatch, SetStateAction } from "react"

// 카카오
interface KakaoMap extends Window {
    kakao: any; // Kakao Maps 라이브러리의 타입에 따라 조정
    resetToCurrentLocation: () => void;
    currentLocation: any;
    address: string;
    showLocationClick: () => void;
}

// 지도
declare const window: KakaoMap;

interface ShowMapPropsType {
    setCurrentLocation: Dispatch<SetStateAction<{ latitude: number; longitude: number } | null>>;

}

const ShowMap: React.FC<ShowMapPropsType> = ({ setCurrentLocation }) => {
    // 지도 객체를 생성할 ref
    const mapRef = useRef<HTMLDivElement>(null);

    // map 변수를 함수 스코프 밖에서 정의
    let map: any;

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

                // 현재 위치에 마커 표시하기
                currentLocationMarker.setMap(map);

                // map 변수 사용
                // 지도 객체가 생성되면 지도 객체를 조작한다
                if (map) {
                    map.setCenter(new window.kakao.maps.LatLng(lat, lng));
                }

                // reverseGeocoding(lat, lng);
            });
        }
    } 


    useEffect(() => {
    
        if (mapRef.current) {
            const container = mapRef.current; // 지도를 담을 영역의 DOM
           
            console.log('컨테이너', container)

            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대, 축소 레벨
            };
            
            map = new window.kakao.maps.Map(container, options);
            // resetToCurrentLocation();
            map.relayout();
        

            // window.kakao.maps.load(() => {
            //     // 지도 객체 생성
            //     map = new window.kakao.maps.Map(container, options);
            //     map.relayout();
            //     // 주소 변환 객체 생성
            //     geocoder = new window.kakao.maps.services.Geocoder();

            //     // 초기 실행시 현재 위치 띄워주기
            //     resetToCurrentLocation();
            // });
        }

        // 현재위치 불러오기
        resetToCurrentLocation();
    }, [])

    return (
        <>
            <div ref={mapRef} style={{
                width: '200px',
                height: '300px'
                }}
                className="rounded-xl"
            ></div>
        </>
    )
}

export default ShowMap;