import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import kakaoButton from '../assets/images/kakao_login_button.png';
import closetImage from '../assets/images/closet_image.png';
import loginBottom from '../assets/images/login_bottom.png';

const LoginPage = () => {
  // 환경변수에서 redirect URI와 Kakao Client ID를 불러옵니다.
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`;
  // const navigate = useNavigate();

  // const handleNavigate = link => {
  //   window.open(link, '_blank');
  //   // navigate(link);
  // };

  const loginHandler = () => {
    window.location.href = link;
  };

  // useEffect를 사용하여 컴포넌트가 마운트 될 때 그라데이션 배경을 적용합니다.
  useEffect(() => {
    const body = document.body;

    body.style.background = 'linear-gradient(to bottom, #FEDFEA 0%, #FFFFFF 100%)';

    return () => {
      body.style.background = '';
    };
  }, []);

  return (
    <div className="login-container">
      <div className="flex flex-col items-center justify-center h-[590px] ">
        <div className="mb-4 text-center text-AppBody1 font-black title">
          <div>당신의</div>
          <div>옷장을</div>
          <div>스마트하게</div>
        </div>
        <img src={closetImage}></img>
        <button
          onClick={() =>
            // handleNavigate(
            //   `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`
            // )
            loginHandler()
          }
          className="focus:outline-none">
          <img
            src={kakaoButton}
            className="cursor-pointer transform transition duration-200 hover:scale-105"
            alt="카카오 로그인 버튼"
          />
        </button>
      </div>
      <img src={loginBottom}></img>
    </div>
  );
};

export default LoginPage;
