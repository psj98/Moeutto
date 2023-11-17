// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { authInstance } from '../../../api/api';

interface Clothes {
  id: number;
}

const DeleteBtn = ({ id }: Clothes) => {
  // 삭제 버튼 비활성화
  
  // const navigate = useNavigate();

  // 삭제 api 호출
  // const deleteClothes = async () => {
  //   try {
  //     const axiosInstance = authInstance({ ContentType: 'application/json' });
  //     const response = await axiosInstance.delete(`/clothes/${id}`);

  //     console.log('옷 삭제 성공', response);
  //     Swal.fire({
  //       icon: 'success',
  //       title: "<h5 style='color:blue'>삭제완료",
  //       html: '옷을 삭제했습니다',
  //       showCancelButton: false,
  //       confirmButtonText: '확인',
  //     });
  //     navigate('/mycloset');
  //   } catch (error) {
  //     console.log('옷 삭제 실패', error);
  //   }
  // };

  return (
    <>
      <button
        className="bg-pink-hot text-WebBody2 text-white rounded-2xl border border-pink-hot p-3 tracking-wider">
        삭제
      </button>
    </>
  );
};

export default DeleteBtn;
