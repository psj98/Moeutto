import { useParams } from "react-router-dom";

const ClothesDetailPage = () => {
    // 옷 id 가져오기
    const params = useParams();

    return (
        <div className="ClothesDetailPage">
            <p>여긴 {params.id}번 옷의 상세 페이지 입니다.</p>
        </div>
    )
}

export default ClothesDetailPage;