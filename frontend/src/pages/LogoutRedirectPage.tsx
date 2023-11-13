import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutRedirectPage = () => {
  const navigate = useNavigate();

  sessionStorage.clear();
  localStorage.clear();

  // 성공 ~
  useEffect(() => {
    alert('안전하게 로그아웃 되었습니다.');
    navigate('/login');
  }, []);

  return <div>로그아웃중입니다.</div>;
};

export default LogoutRedirectPage;
