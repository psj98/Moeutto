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
    setAddress: Dispatch<React.SetStateAction<string>>;
    resetLocation: boolean;
    newLocation: string;
}

const ShowMap: React.FC<ShowMapPropsType> = ({ 
        setCurrentLocation, 
        setAddress, 
        resetLocation ,
        newLocation
    }) => {
    // 지도 객체를 생성할 ref
    const mapRef = useRef<HTMLDivElement>(null);

    // map 변수를 함수 스코프 밖에서 정의
    let map: any;
    let geocoder: any;

    // 위도, 경도를 기반으로 현재 법정동 주소를 가져온다.
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

                reverseGeocoding(lat, lng);
            });
        }
    } 

    // 키워드로 장소 검색하기
    // const placesSearchCB = (data, status, pagination) => {
    //     if (status === window.kakao.maps.services.Status.OK) {
    //         const bounds = new window.kakao.maps.LatLngBounds();

    //         for (let i=0; i<data.length; i++) { 
    //             bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    //         } 

    //         map.setBounds(bounds);
    //     }
    // }

    // if (ps) {
    //     ps.keywordSearch(newLocation, placesSearchCB);
    // }



    useEffect(() => {
        if (mapRef.current) {
            const container = mapRef.current; // 지도를 담을 영역의 DOM
           
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대, 축소 레벨
            };
            
            // 지도 객체 생성
            map = new window.kakao.maps.Map(container, options);
            // 위치 객체 생성
            geocoder = new window.kakao.maps.services.Geocoder();
            // 장소 검색 객체 생성
            // ps = new window.kakao.maps.services.Places(); 
            // 동적 변화 감지
            map.relayout();
            
        }
        // 현재위치 불러오기
        resetToCurrentLocation();

    }, [resetLocation])





    return (
        <>
            <div ref={mapRef} style={{
                width: '250px',
                height: '300px'
                }}
                className="rounded-xl"
            ></div>
        </>
    )
}

export default ShowMap;