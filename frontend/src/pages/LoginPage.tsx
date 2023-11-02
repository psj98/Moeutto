// import { defaultInstance } from '../api/api';

export interface Login {
  restApiKey: String;
  redirectUri: String;
  link: String;
}

const LoginPage = () => {
  //   const axiosInstance = defaultInstance();

  //   const redirectUrl =
  const redirectUrl = 'http://localhost:3000/login-redirect';

  const code = '';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=bab90d2b24304bb1f5b4c07938ff0fcc&redirect_uri=${redirectUrl}&response_type=code`;

  console.log(code);

  const loginHandler = async () => {
    window.location.href = link;

    // const response = await axiosInstance.get('/members/login');

    // console.log(response);
  };

  return (
    <div>
      <button onClick={loginHandler}>로그인</button>
    </div>
  );
};

export default LoginPage;
