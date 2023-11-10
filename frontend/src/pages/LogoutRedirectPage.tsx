import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutRedirectPage = () => {
  const navigate = useNavigate();

  sessionStorage.clear();
  localStorage.clear();

  // 성공 ~
  useEffect(() => {
    navigate('/login');
  }, []);

  return <div>로그아웃중입니다.</div>;
};

export default LogoutRedirectPage;
