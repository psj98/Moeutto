import { BsGlobe } from "react-icons/bs";

const CurrentLocationBtn = () => {
    return (
        <div className="flex">
            <BsGlobe />
            <button>현재 위치로 설정</button>
            {/* <button onClick={resetToCurrentLocation}>현재 위치로 설정</button> */}
        </div>
    )
}

export default CurrentLocationBtn;