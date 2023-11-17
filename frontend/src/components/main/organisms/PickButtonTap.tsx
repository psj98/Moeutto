import { useNavigate } from "react-router-dom";
import PickTap from "../molecules/PickTap";
import MainComment from "../atoms/MainComment";
import TempBarAnimation from "../atoms/TempBarAnimation";

const PickButtonTap = () => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 bg-white p-4 rounded-2xl shadow-md" onClick={() => navigate('/pickpick')}>
            {/* 카드 문구 */}
            <MainComment title={`오늘 입은 옷 \n날씨에 잘 어울릴까요?`} />

            {/* 옷장탭 */}
            <PickTap />

            {/* 점수 그래프 */}
            <div className="flex justify-center pt-8 p-4 relative">
                <img src="/images/bar-chart.png" alt="chart" />
                <img src="/images/thumbup.png" alt="thumb" className="absolute w-10 right-0 top-10" />
            </div>
         
          
            <p className="text-AppBody2 flex justify-center mt-4">날씨에 적합한지 점수를 수치로 알려드려요</p>

            {/* 바 그래프 */}
            <TempBarAnimation />
            <p className="text-AppBody2 flex justify-center">오늘 입은 옷의 특징을 알려드려요</p>
        </div>
    )
}

export default PickButtonTap;