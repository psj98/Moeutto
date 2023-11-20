import React, { useEffect } from 'react';
import styled from 'styled-components';
import kakaoButton from '../assets/images/kakao_login_button.png';
// import hanger from '../assets/images/hanger.png';
import closetImage from '../assets/images/closet_image.png';

const Container = styled.div`
  width: 100%;
  height: 100vh;

  @keyframes rotateAnimation {
    0% {
      transform: rotate(0deg) scaleY(1.1) scaleX(1.3);
    }
    10% {
      transform: rotate(90deg) scaleX(1.4) scaleY(1.1);
    }
    100% {
      transform: rotate(90deg) scaleX(1.4) scaleY(1.1);
    }
  }

  .rotate-90 {
    display: inline-block;
    animation: rotateAnimation 50s ease-in-out infinite;
    transform-origin: 50% 50%;
  }

  @keyframes disapper {
    0% {
      opacity: 1;
    }
    10% {
      opacity: 0.01;
    }
    100% {
      opacity: 0;
    }
  }

  .make-disapper {
    animation: disapper 50s ease-in-out infinite;
  }

  .waves {
    position: relative;
    width: 100%;
    min-height: 200px;
    max-height: 250px;
  }

  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }

  /*Shrinking for mobile*/
  @media (max-width: 768px) {
    .waves {
      // height: 40px;
      min-height: 40px;
    }
  }
  @keyframes shirtFall {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .falling-shirt {
    animation: shirtFall 2s ease-out;
  }
`;

const LoginPage = () => {
  // 환경변수에서 redirect URI와 Kakao Client ID를 불러옵니다.
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`;

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
    <Container className="login-container">
      <div className="h-full flex flex-col items-center justify-center">
        <div className=" relative text-center text-[#272727] title font-bold 나눔고딕">
          <div className="mb-2">당신의</div>
          <div className="mb-2">옷장을</div>
          <div className="mb-10">스마트하게</div>
          <img className="absolute w-[300px] left-[10px] opacity-50 top-[220px]" alt="옷" src={closetImage} />
          <div className="text-[70px] font-black text-[#0a0a0a] mb-[40px] opacity-0 닉스">
            <span className="rotate-90 ms-8 me-2">머</span>
            <span className="rotate-90 m-2">이</span>
            <span className="rotate-90 m-2">버</span>
            <span className="make-disapper">?</span>
          </div>
        </div>
        <button
          onClick={() =>
            // handleNavigate(
            //   `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`
            // )
            loginHandler()
          }
          className="focus:outline-none mt-[60px] ">
          <img
            src={kakaoButton}
            className="cursor-pointer transform transition duration-200 hover:scale-105"
            alt="카카오 로그인 버튼"
          />
        </button>
      </div>
      <div className="absolute w-full bottom-0">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            <path
              id="shirt"
              d="M14.515 5l2.606-2.607a1 1 0 0 1 1.415 0l4.242 4.243a1 1 0 0 1 0 1.414L19 11.828V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9.172L1.222 8.05a1 1 0 0 1 0-1.414l4.242-4.243a1 1 0 0 1 1.415 0L9.485 5h5.03z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,192,203,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,182,193,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(219,112,147,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.6)" />
          </g>
        </svg>
      </div>
    </Container>
  );
};

export default LoginPage;
