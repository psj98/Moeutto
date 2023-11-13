import { useNavigate } from "react-router-dom";
import { authInstance } from "../../../api/api";

interface Clothes {
    id: number
}

const DeleteBtn = ({ id }: Clothes) => {
    const navigate = useNavigate();

    // 삭제 api 호출
    const deleteClothes = async () => {
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.delete(`/clothes/${id}`);
            
            console.log('옷 삭제 성공', response)
            alert('옷을 삭제했습니다')
            navigate('/mycloset')
        } catch (error) {
            console.log('옷 삭제 실패', error)
        }
    };

    return (
        <>
            <button
                onClick={deleteClothes}
                className="bg-pink-hot text-WebBody2 text-white rounded-2xl border border-pink-hot p-3 tracking-wider"
            >
                삭제
            </button>
        </>
    )
}

export default DeleteBtn;