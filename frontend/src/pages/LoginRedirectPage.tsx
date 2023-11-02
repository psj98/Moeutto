import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../api/api';

const LoginRedirectPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const axiosInstance = defaultInstance();

  const kakaoLogin = async () => {
    try {
      const response = await axiosInstance.post(`members/check?code=${code}`);
      const accessToken = response.headers['access-token'];

      console.log('accessToken', accessToken);
      console.log(response);

      if (response.data !== null) {
        // 성공적으로 로그인되었다면, 메인 페이지로 리다이렉트
        sessionStorage.setItem('accessToken', accessToken);
        navigate('/main');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  useEffect(() => {
    if (code) {
      kakaoLogin();
    }
  }, [code]);

  return (
    <div>
      <h1>로그인중입니다.</h1>
    </div>
  );
};

export default LoginRedirectPage;
