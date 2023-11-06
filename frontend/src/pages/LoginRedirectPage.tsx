import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../api/api';
// 로딩 이미지를 프로젝트에 추가하고 아래 경로를 해당 이미지 경로로 변경해주세요.
// import loadingImage from '../assets/loading.gif';

const LoginRedirectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정합니다.
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태를 초기화합니다.

  // URL에서 'code' 쿼리 파라미터를 추출합니다.
  const code = new URL(window.location.href).searchParams.get('code');
  const axiosInstance = defaultInstance();

  useEffect(() => {
    const kakaoLogin = async () => {
      if (!code) {
        setErrorMessage('인증 코드를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        // 인증 코드를 이용하여 백엔드에 로그인 요청을 보냅니다.
        const response = await axiosInstance.post(`members/check?code=${code}`);
        const accessToken = response.headers['access-token'];

        // 응답 데이터나 토큰을 기반으로 필요한 로직을 수행합니다.
        if (accessToken) {
          // 성공적으로 로그인되었다면, 메인 페이지로 리다이렉트합니다.
          sessionStorage.setItem('accessToken', accessToken); // accessToken을 세션 스토리지에 저장합니다.
          // navigate('/main'); // 사용자를 메인 페이지로 리다이렉트합니다.
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        setErrorMessage('로그인에 실패했습니다.'); // 에러 메시지를 설정합니다.
      } finally {
        setLoading(false); // 로딩 상태를 false로 설정하여 로딩 화면을 종료합니다.
      }
    };

    kakaoLogin();
  }, [code, navigate]);

  if (loading) {
    // 로딩 상태인 경우 로딩 이미지 또는 로딩 텍스트를 표시합니다.
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {/* <img src={loadingImage} alt="로딩 중..." /> */}
        {/* 로딩 이미지 대신 텍스트를 표시하고 싶다면 아래 주석을 해제하세요. */}
        {/* <p>로딩 중입니다...</p> */}
        DKFJFJDKFJFJFJDKDKFK
      </div>
    );
  }

  if (errorMessage) {
    // 에러 메시지가 있는 경우 에러 메시지를 표시합니다.
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>로그인 오류</h1>
        <p>{errorMessage}</p>
        <button onClick={() => navigate('/login')}>로그인 페이지로 돌아가기</button>
      </div>
    );
  }

  // 로딩도 완료되고 에러 메시지도 없는 경우 추가적인 렌더링 없이 null을 반환합니다.
  return <div>로그인 완료됨</div>;
};

export default LoginRedirectPage;
