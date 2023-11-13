import axios, { AxiosInstance } from 'axios';
// import { useNavigate } from 'react-router-dom';

// const token: string =
//   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhM2FiM2ExNS00M2I0LTQ4OTYtYjFlMi0wM2Q2YWJhNWM2NmMiLCJleHAiOjE2OTg5NzM5NjJ9.vZxmr2SzJHm0nfq6_0qwgu_fsmtgZHxJfDf6CfZBCQmTQejYA9mWDvOc7TRXx7oPbwcHC9zrkF1gAj-aGrIqmw';

// window.sessionStorage.setItem('accessToken', token);
const apiURL = process.env.REACT_APP_API;
// 인증 값이 필요 없는 경우
const axiosApi = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: `${apiURL}/api`,
  });

  return instance;
};

// const naviage = useNavigate();

// 인증 값이 필요한 경우
const axiosWithAuth = ({ ContentType }: { ContentType: string }): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': ContentType,
  };

  console.log('Content-Type', ContentType);
  // 토큰 가져오기
  const accessToken: string = window.sessionStorage.getItem('accessToken');

  if (accessToken) {
    headers.accessToken = `${accessToken}`;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: `${apiURL}/api`, // 여기에 기본 API URL을 넣어주세요.
    headers,
  });

  // 세션이 만료된 경우 로그인 페이지로 이동시키기
  // instance.interceptors.response.use(
  //   (response) => {
  //     // 세션이 만료 된 경우
  //     if (response.data.data.message === "세션이 만료되었습니다") {
  //       naviage('/login')
  //       return response;
  //     } else {
  //       // 정상적인 응답
  //       return response;
  //     }
  //   },
  // )

  return instance;
};

export const defaultInstance = axiosApi;
export const authInstance = axiosWithAuth;
