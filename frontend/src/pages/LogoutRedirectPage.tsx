import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutRedirectPage = () => {
  const navigate = useNavigate();

  sessionStorage.clear();
  localStorage.clear();

  // 성공 ~
  useEffect(() => {
    Swal.fire({
      icon: 'success',
      title: "<h5 style='color:blue'>로그아웃 완료",
      html: `
      다음에 또 이용해주세요!
      `,
      showCancelButton: false,
      confirmButtonText: '안녕!',
    });
    navigate('/login');
  }, []);

  return <div>로그아웃중입니다.</div>;
};

export default LogoutRedirectPage;
