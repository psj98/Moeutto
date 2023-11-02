// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { defaultInstance } from '../api/api';

export interface LoginRedirect {
  code: String;
  response: String;
}

const LoginRedirectPage = () => {
  //   const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const axiosInstance = defaultInstance();

  const kakaoLogin = async () => {
    const response = await axiosInstance.post(`members/check?code=${code}`);

    console.log(response);

    // if (response.data !== null) {
    //   navigate('/main');
    // }
  };

  console.log(kakaoLogin());

  console.log(code);

  return (
    <div>
      <h1>로그인중입니다.</h1>
    </div>
  );
};

export default LoginRedirectPage;
