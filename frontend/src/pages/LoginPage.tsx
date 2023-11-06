// import { defaultInstance } from '../api/api';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import kakaoButton from '../assets/images/kakao_login_button.png';

export interface Login {
  restApiKey: String;
  redirectUri: String;
  link: String;
}

const LoginPage = () => {
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
  // const navigate = useNavigate();

  //   const axiosInstance = defaultInstance();

  //   const redirectUrl =
  // const navigate = useNavigate();
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div>
      <img src={kakaoButton} className="" onClick={loginHandler}></img>
    </div>
  );
};

export default LoginPage;
